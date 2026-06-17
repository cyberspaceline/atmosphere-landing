"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

/* ────────────────────────────────────────────────────────────────────────
   Cloud background — boid flock blurred into drifting wisps.

   Adjust in the implementation:  boidColor, backgroundColor, speed  (props)
   Adjust in code if you want:     the CONFIG object below
   ──────────────────────────────────────────────────────────────────────── */

const CONFIG = {
  count: 720, // number of boids
  size: 18, // boid radius (css px)
  elongation: 0.55, // 0 = round, higher = streaked along heading
  edgeSoftness: 0.0, // 0 = crisp disc, 1 = soft blob
  freedom: 0.11, // 0 = coherent currents, 1 = free scatter
  bottomLeftPull: 50, // strength of the drift toward bottom-left
  blur: 8, // post blur radius
  grain: 0.3, // film grain amount
  spawnMargin: 0.12, // boids never spawn within this fraction of the bottom/left edge

  // performance
  fpsCap: 30, // background doesn't need 60
  blurScale: 0.5, // blur runs at this fraction of resolution
  maxDPR: 1.5, // cap device pixel ratio
  maxDPRCoarse: 1.0, // tighter cap on touch / mobile
};

export type CloudBackgroundProps = {
  boidColor?: string; // hex, e.g. '#5A6BD8'
  backgroundColor?: string; // hex, e.g. '#F1ECDD'
  speed?: number; // 0 = frozen, 1 = default, up to ~3
  className?: string;
  style?: CSSProperties;
};

const DEFAULTS = {
  boidColor: "#96C332",
  backgroundColor: "#FFF6B8",
  speed: 0.3,
};

export default function CloudBackground(props: CloudBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fieldRef = useRef<ReturnType<typeof createCloudField> | null>(null);

  // create once
  useEffect(() => {
    if (!canvasRef.current) return;
    const field = createCloudField(canvasRef.current, {
      boidColor: props.boidColor ?? DEFAULTS.boidColor,
      backgroundColor: props.backgroundColor ?? DEFAULTS.backgroundColor,
      speed: props.speed ?? DEFAULTS.speed,
      ...CONFIG,
    });
    fieldRef.current = field;
    return () => field?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // live updates for the two easy knobs
  useEffect(() => {
    fieldRef.current?.setColors(
      props.boidColor ?? DEFAULTS.boidColor,
      props.backgroundColor ?? DEFAULTS.backgroundColor,
    );
  }, [props.boidColor, props.backgroundColor]);

  useEffect(() => {
    fieldRef.current?.setSpeed(props.speed ?? DEFAULTS.speed);
  }, [props.speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={props.className}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        zIndex: -1,
        pointerEvents: "none",
        ...props.style,
      }}
    />
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Engine — framework-agnostic. Returns { setColors, setSpeed, destroy }.
   ──────────────────────────────────────────────────────────────────────── */

type FieldOptions = typeof CONFIG & {
  boidColor: string;
  backgroundColor: string;
  speed: number;
};

function createCloudField(canvas: HTMLCanvasElement, opts: FieldOptions) {
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
  if (!gl) return null;

  // ---- live, prop-driven values ----
  const live = {
    boid: hex2rgb(opts.boidColor),
    bg: hex2rgb(opts.backgroundColor),
    speed: opts.speed,
  };

  // ---- shaders ----
  const boidVS = `
    attribute vec2 a_pos; attribute vec2 a_uv; varying vec2 v_uv;
    void main(){ v_uv = a_uv; gl_Position = vec4(a_pos, 0.0, 1.0); }`;
  const boidFS = `
    precision highp float; varying vec2 v_uv;
    uniform vec3 u_color; uniform float u_soft;
    void main(){
      float d = length(v_uv);
      float inner = 0.95 * (1.0 - u_soft);
      float a = smoothstep(1.0, inner, d) * 0.6;
      gl_FragColor = vec4(u_color, a);
    }`;
  const fsVS = `
    attribute vec2 a_p; varying vec2 v_uv;
    void main(){ v_uv = a_p * 0.5 + 0.5; gl_Position = vec4(a_p, 0.0, 1.0); }`;
  const blurFS = `
    precision highp float; varying vec2 v_uv;
    uniform sampler2D u_tex; uniform vec2 u_texel; uniform vec2 u_dir;
    uniform float u_blur; uniform float u_grain;
    float hash(vec2 p){ vec3 p3 = fract(vec3(p.xyx)*0.1031); p3 += dot(p3, p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }
    void main(){
      vec2 s = u_dir * u_texel * u_blur;
      vec3 c = texture2D(u_tex, v_uv).rgb * 0.227027;
      c += texture2D(u_tex, v_uv + s*1.0).rgb * 0.1945946;
      c += texture2D(u_tex, v_uv - s*1.0).rgb * 0.1945946;
      c += texture2D(u_tex, v_uv + s*2.0).rgb * 0.1216216;
      c += texture2D(u_tex, v_uv - s*2.0).rgb * 0.1216216;
      c += texture2D(u_tex, v_uv + s*3.0).rgb * 0.0540540;
      c += texture2D(u_tex, v_uv - s*3.0).rgb * 0.0540540;
      c += texture2D(u_tex, v_uv + s*4.0).rgb * 0.0162162;
      c += texture2D(u_tex, v_uv - s*4.0).rgb * 0.0162162;
      c += (hash(gl_FragCoord.xy) - 0.5) * u_grain * 0.18;
      gl_FragColor = vec4(c, 1.0);
    }`;

  function compile(type: number, src: string) {
    const s = gl!.createShader(type)!;
    gl!.shaderSource(s, src);
    gl!.compileShader(s);
    if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS))
      console.error(gl!.getShaderInfoLog(s));
    return s;
  }
  function program(vs: string, fs: string) {
    const p = gl!.createProgram()!;
    gl!.attachShader(p, compile(gl!.VERTEX_SHADER, vs));
    gl!.attachShader(p, compile(gl!.FRAGMENT_SHADER, fs));
    gl!.linkProgram(p);
    return p;
  }

  const boidProg = program(boidVS, boidFS);
  const blurProg = program(fsVS, blurFS);

  const A = {
    bpos: gl.getAttribLocation(boidProg, "a_pos"),
    buv: gl.getAttribLocation(boidProg, "a_uv"),
    fp: gl.getAttribLocation(blurProg, "a_p"),
  };
  const Ub = {
    color: gl.getUniformLocation(boidProg, "u_color"),
    soft: gl.getUniformLocation(boidProg, "u_soft"),
  };
  const Uf = {
    tex: gl.getUniformLocation(blurProg, "u_tex"),
    texel: gl.getUniformLocation(blurProg, "u_texel"),
    dir: gl.getUniformLocation(blurProg, "u_dir"),
    blur: gl.getUniformLocation(blurProg, "u_blur"),
    grain: gl.getUniformLocation(blurProg, "u_grain"),
  };

  // ---- buffers ----
  const boidBuf = gl.createBuffer()!;
  const quadBuf = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );

  // ---- render targets (created at blur resolution) ----
  function makeTarget(w: number, h: number) {
    const tex = gl!.createTexture()!;
    gl!.bindTexture(gl!.TEXTURE_2D, tex);
    gl!.texImage2D(
      gl!.TEXTURE_2D,
      0,
      gl!.RGBA,
      w,
      h,
      0,
      gl!.RGBA,
      gl!.UNSIGNED_BYTE,
      null,
    );
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
    const fbo = gl!.createFramebuffer()!;
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
    gl!.framebufferTexture2D(
      gl!.FRAMEBUFFER,
      gl!.COLOR_ATTACHMENT0,
      gl!.TEXTURE_2D,
      tex,
      0,
    );
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
    return { tex, fbo };
  }

  let targetA: ReturnType<typeof makeTarget>;
  let targetB: ReturnType<typeof makeTarget>;
  let W = 0,
    H = 0,
    blurW = 0,
    blurH = 0,
    DPR = 1;

  const coarse =
    typeof window !== "undefined" &&
    window.matchMedia?.("(pointer: coarse)").matches;
  const maxDpr = coarse ? opts.maxDPRCoarse : opts.maxDPR;

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, maxDpr);
    W = canvas.clientWidth || window.innerWidth;
    H = canvas.clientHeight || window.innerHeight;
    canvas.width = Math.max(1, Math.floor(W * DPR));
    canvas.height = Math.max(1, Math.floor(H * DPR));
    blurW = Math.max(2, Math.floor(canvas.width * opts.blurScale));
    blurH = Math.max(2, Math.floor(canvas.height * opts.blurScale));
    if (targetA) {
      gl!.deleteTexture(targetA.tex);
      gl!.deleteFramebuffer(targetA.fbo);
    }
    if (targetB) {
      gl!.deleteTexture(targetB.tex);
      gl!.deleteFramebuffer(targetB.fbo);
    }
    targetA = makeTarget(blurW, blurH);
    targetB = makeTarget(blurW, blurH);
  }

  // ---- boid simulation ----
  const NEIGHBOR = 95,
    SEP = 26,
    MAXSPEED = 95,
    MAXFORCE = 170;
  const dir = (() => {
    const dx = -1,
      dy = 1,
      l = Math.hypot(dx, dy);
    return [dx / l, dy / l];
  })();

  function h2(x: number, y: number) {
    const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return n - Math.floor(n);
  }
  function vnoise(x: number, y: number) {
    const xi = Math.floor(x),
      yi = Math.floor(y),
      xf = x - xi,
      yf = y - yi;
    const u = xf * xf * (3 - 2 * xf),
      v = yf * yf * (3 - 2 * yf);
    const a = h2(xi, yi),
      b = h2(xi + 1, yi),
      c = h2(xi, yi + 1),
      d = h2(xi + 1, yi + 1);
    return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
  }

  type Boid = { x: number; y: number; vx: number; vy: number; w: number };
  let boids: Boid[] = [];
  function setCount(n: number) {
    const lm = W * opts.spawnMargin,
      bm = H * opts.spawnMargin;
    while (boids.length < n) {
      boids.push({
        x: lm + Math.random() * (W - lm),
        y: Math.random() * (H - bm),
        vx: (Math.random() - 0.5) * 40,
        vy: (Math.random() - 0.5) * 40,
        w: Math.random() * 6.2831,
      });
    }
    if (boids.length > n) boids.length = n;
  }

  let flowT = 0;
  function step(dt: number) {
    const dt2 = dt * live.speed;
    flowT += dt2;
    const fr = opts.freedom;
    const FLOW = 70 - 40 * fr,
      WANDER = 15 + 90 * fr,
      WTURN = 3 + 9 * fr;
    const COH = 0.2 * (1.0 - fr),
      SEPW = 45 + 45 * fr,
      BIAS = opts.bottomLeftPull;

    const cs = NEIGHBOR,
      nb2 = NEIGHBOR * NEIGHBOR,
      sep2 = SEP * SEP;
    const grid = new Map<string, number[]>();
    const key = (cx: number, cy: number) => cx + "," + cy;
    for (let i = 0; i < boids.length; i++) {
      const b = boids[i];
      const k = key(Math.floor(b.x / cs), Math.floor(b.y / cs));
      let arr = grid.get(k);
      if (!arr) {
        arr = [];
        grid.set(k, arr);
      }
      arr.push(i);
    }
    for (let i = 0; i < boids.length; i++) {
      const b = boids[i];
      const gcx = Math.floor(b.x / cs),
        gcy = Math.floor(b.y / cs);
      let cx = 0,
        cy = 0,
        sx = 0,
        sy = 0,
        n = 0,
        ns = 0;
      for (let oy = -1; oy <= 1; oy++)
        for (let ox = -1; ox <= 1; ox++) {
          const arr = grid.get(key(gcx + ox, gcy + oy));
          if (!arr) continue;
          for (let t = 0; t < arr.length; t++) {
            const j = arr[t];
            if (j === i) continue;
            const o = boids[j];
            const dx = o.x - b.x,
              dy = o.y - b.y,
              d2 = dx * dx + dy * dy;
            if (d2 < nb2) {
              cx += o.x;
              cy += o.y;
              n++;
              if (d2 < sep2 && d2 > 0.0001) {
                const d = Math.sqrt(d2);
                sx -= dx / d;
                sy -= dy / d;
                ns++;
              }
            }
          }
        }
      let fx = 0,
        fy = 0;
      if (n > 0) {
        cx /= n;
        cy /= n;
        fx += (cx - b.x) * COH;
        fy += (cy - b.y) * COH;
      }
      if (ns > 0) {
        fx += sx * SEPW;
        fy += sy * SEPW;
      }
      const fa =
        (vnoise(b.x * 0.0032 + flowT * 0.05, b.y * 0.0032 - flowT * 0.03) *
          2.0 -
          1.0) *
        Math.PI *
        2.0;
      fx += Math.cos(fa) * FLOW;
      fy += Math.sin(fa) * FLOW;
      b.w += (Math.random() - 0.5) * WTURN * dt2;
      fx += Math.cos(b.w) * WANDER;
      fy += Math.sin(b.w) * WANDER;
      fx += dir[0] * BIAS;
      fy += dir[1] * BIAS;

      const fl = Math.hypot(fx, fy);
      if (fl > MAXFORCE) {
        fx = (fx / fl) * MAXFORCE;
        fy = (fy / fl) * MAXFORCE;
      }
      b.vx += fx * dt2;
      b.vy += fy * dt2;
      const sp = Math.hypot(b.vx, b.vy);
      if (sp > MAXSPEED) {
        b.vx = (b.vx / sp) * MAXSPEED;
        b.vy = (b.vy / sp) * MAXSPEED;
      }
      b.x += b.vx * dt2;
      b.y += b.vy * dt2;
      const m = 40,
        lm = W * opts.spawnMargin,
        bm = H * opts.spawnMargin;
      const exitR = b.x > W + m,
        exitT = b.y < -m;
      if (exitR || exitT) {
        // against-drift exit -> back to source
        if (Math.random() < 0.5) {
          b.x = W + m;
          b.y = Math.random() * (H - bm);
        } // enter from right
        else {
          b.x = lm + Math.random() * (W - lm);
          b.y = -m;
        } // enter from top
        b.vx = (Math.random() - 0.5) * 30;
        b.vy = (Math.random() - 0.5) * 30;
        b.w = Math.random() * 6.2831;
      } else {
        if (b.x < -m) b.x += W + 2 * m; // exit left   -> re-enter right
        if (b.y > H + m) b.y -= H + 2 * m; // exit bottom -> re-enter top
      }
    }
  }

  // ---- geometry ----
  const CORN = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, -1],
    [1, 1],
    [-1, 1],
  ];
  let geo = new Float32Array(0);
  function buildGeo() {
    const N = boids.length;
    if (geo.length !== N * 6 * 4) geo = new Float32Array(N * 6 * 4);
    const size = opts.size,
      elong = opts.elongation;
    let p = 0;
    for (let i = 0; i < N; i++) {
      const b = boids[i];
      const ang = Math.atan2(b.vy, b.vx);
      const ca = Math.cos(ang),
        sa = Math.sin(ang);
      const aL = size * (1.0 + elong),
        pL = size;
      const alx = ca * aL,
        aly = sa * aL,
        prx = -sa * pL,
        pry = ca * pL;
      for (let k = 0; k < 6; k++) {
        const u = CORN[k][0],
          v = CORN[k][1];
        const wx = b.x + u * alx + v * prx;
        const wy = b.y + u * aly + v * pry;
        geo[p++] = (wx / W) * 2.0 - 1.0;
        geo[p++] = 1.0 - (wy / H) * 2.0;
        geo[p++] = u;
        geo[p++] = v;
      }
    }
    gl!.bindBuffer(gl!.ARRAY_BUFFER, boidBuf);
    gl!.bufferData(gl!.ARRAY_BUFFER, geo, gl!.DYNAMIC_DRAW);
  }

  function drawFullscreen() {
    gl!.bindBuffer(gl!.ARRAY_BUFFER, quadBuf);
    gl!.enableVertexAttribArray(A.fp);
    gl!.vertexAttribPointer(A.fp, 2, gl!.FLOAT, false, 0, 0);
    gl!.drawArrays(gl!.TRIANGLES, 0, 3);
  }

  function render(dt: number) {
    step(dt);
    buildGeo();

    // pass 1: boids -> targetA (blur resolution)
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, targetA.fbo);
    gl!.viewport(0, 0, blurW, blurH);
    gl!.clearColor(live.bg[0], live.bg[1], live.bg[2], 1.0);
    gl!.clear(gl!.COLOR_BUFFER_BIT);
    gl!.enable(gl!.BLEND);
    gl!.blendFunc(gl!.SRC_ALPHA, gl!.ONE_MINUS_SRC_ALPHA);
    gl!.useProgram(boidProg);
    gl!.uniform3fv(Ub.color, live.boid);
    gl!.uniform1f(Ub.soft, opts.edgeSoftness);
    gl!.bindBuffer(gl!.ARRAY_BUFFER, boidBuf);
    gl!.enableVertexAttribArray(A.bpos);
    gl!.vertexAttribPointer(A.bpos, 2, gl!.FLOAT, false, 16, 0);
    gl!.enableVertexAttribArray(A.buv);
    gl!.vertexAttribPointer(A.buv, 2, gl!.FLOAT, false, 16, 8);
    gl!.drawArrays(gl!.TRIANGLES, 0, boids.length * 6);
    gl!.disable(gl!.BLEND);

    gl!.useProgram(blurProg);
    gl!.uniform1i(Uf.tex, 0);
    gl!.uniform2f(Uf.texel, 1 / blurW, 1 / blurH);
    gl!.uniform1f(Uf.blur, opts.blur);

    // pass 2: horizontal blur -> targetB
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, targetB.fbo);
    gl!.viewport(0, 0, blurW, blurH);
    gl!.activeTexture(gl!.TEXTURE0);
    gl!.bindTexture(gl!.TEXTURE_2D, targetA.tex);
    gl!.uniform2f(Uf.dir, 1.0, 0.0);
    gl!.uniform1f(Uf.grain, 0.0);
    drawFullscreen();

    // pass 3: vertical blur + grain -> screen (upscales)
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
    gl!.viewport(0, 0, canvas.width, canvas.height);
    gl!.bindTexture(gl!.TEXTURE_2D, targetB.tex);
    gl!.uniform2f(Uf.dir, 0.0, 1.0);
    gl!.uniform1f(Uf.grain, opts.grain);
    drawFullscreen();
  }

  // ---- run loop (fps-capped, visibility-aware, reduced-motion-aware) ----
  resize();
  setCount(opts.count);

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const FRAME_MS = 1000 / opts.fpsCap;
  let raf = 0,
    last = performance.now(),
    lastDraw = 0,
    stopped = false;

  function loop(now: number) {
    if (stopped) return;
    raf = requestAnimationFrame(loop);
    if (document.hidden) {
      last = now;
      return;
    }
    if (now - lastDraw < FRAME_MS - 1) return;
    let dt = (now - last) / 1000;
    last = now;
    lastDraw = now;
    if (dt > 0.05) dt = 0.05;
    render(dt);
  }

  if (reduce) {
    for (let i = 0; i < 400; i++) step(1 / 30); // settle into clusters
    render(0);
  } else {
    raf = requestAnimationFrame(loop);
  }

  const onResize = () => {
    resize();
    if (reduce) render(0);
  };
  window.addEventListener("resize", onResize);

  return {
    setColors(boidColor: string, backgroundColor: string) {
      live.boid = hex2rgb(boidColor);
      live.bg = hex2rgb(backgroundColor);
      if (reduce) render(0);
    },
    setSpeed(s: number) {
      live.speed = s;
    },
    destroy() {
      stopped = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      gl!.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}

function hex2rgb(h: string): [number, number, number] {
  const s = h.replace("#", "");
  return [
    parseInt(s.substr(0, 2), 16) / 255,
    parseInt(s.substr(2, 2), 16) / 255,
    parseInt(s.substr(4, 2), 16) / 255,
  ];
}
