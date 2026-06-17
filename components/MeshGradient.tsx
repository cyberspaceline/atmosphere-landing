"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

/* ────────────────────────────────────────────────────────────────────────
   Mesh gradient — domain-warped fBm field, posterized into bands, with the
   band edges dissolving into dither (a per-pixel threshold jitter applied
   before posterizing, so the edges break apart rather than getting grain on
   top).

   Adjust in the implementation:  colors, speed   (props)
   Adjust in code if you want:     the CONFIG object below
   ──────────────────────────────────────────────────────────────────────── */

const CONFIG = {
  warp: 5.8, // domain-warp strength
  posterize: 0.51, // 0 = smooth gradient, 1 = hard bands
  bands: 4, // number of posterized steps
  scale: 3.15, // feature size of the field
  contrast: 1.29, // pushes colors apart from mid-gray
  edgeSpread: 0.11, // how far the band edges dissolve into dither (0 = clean)

  // performance
  fpsCap: 30, // background doesn't need 60
  maxDPR: 1.5, // cap device pixel ratio
  maxDPRCoarse: 1.0, // tighter cap on touch / mobile
};

export type MeshColors = {
  base: string; // dominant low color of the field
  field: string; // color the field rises into
  accent1: string; // layered into the warped regions
  accent2: string; // layered into the warped regions
};

export type MeshGradientProps = {
  colors?: Partial<MeshColors>;
  speed?: number; // 0 = frozen, 1 = default, up to ~3
  className?: string;
  style?: CSSProperties;
};

/* Quick-start palettes — pass straight into the `colors` prop:
     <MeshGradient colors={PALETTES.dusk} />                                 */
export const PALETTES: Record<string, MeshColors> = {
  sky: {
    base: "#cfe8f5",
    field: "#faf2de",
    accent1: "#fad1b8",
    accent2: "#a8c7e8",
  },
  meadow: {
    base: "#d6f0db",
    field: "#faf2c7",
    accent1: "#c9e6f2",
    accent2: "#addbbf",
  },
  dusk: {
    base: "#e3dbf2",
    field: "#f7d6e3",
    accent1: "#ccd6f2",
    accent2: "#bdd4ed",
  },
  citrus: {
    base: "#fcf2d9",
    field: "#fcd9b8",
    accent1: "#f5c2b8",
    accent2: "#d4ebd9",
  },
};

const DEFAULTS: { colors: MeshColors; speed: number } = {
  colors: {
    base: "#cee8f5",
    field: "#ffffff",
    accent1: "#fbe7cc",
    accent2: "#a8c6e8",
  },
  speed: 0.7,
};

export default function MeshGradient(props: MeshGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fieldRef = useRef<ReturnType<typeof createMeshGradient> | null>(null);

  const colors: MeshColors = { ...DEFAULTS.colors, ...props.colors };

  // create once
  useEffect(() => {
    if (!canvasRef.current) return;
    const field = createMeshGradient(canvasRef.current, {
      ...CONFIG,
      colors,
      speed: props.speed ?? DEFAULTS.speed,
    });
    fieldRef.current = field;
    return () => field?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // live updates for colors
  useEffect(() => {
    fieldRef.current?.setColors(colors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors.base, colors.field, colors.accent1, colors.accent2]);

  // live updates for speed
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
  colors: MeshColors;
  speed: number;
};

function createMeshGradient(canvas: HTMLCanvasElement, opts: FieldOptions) {
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
  if (!gl) return null;

  // ---- live, prop-driven values ----
  const live = {
    c1: hex2rgb(opts.colors.base),
    c2: hex2rgb(opts.colors.field),
    c3: hex2rgb(opts.colors.accent1),
    c4: hex2rgb(opts.colors.accent2),
    speed: opts.speed,
  };

  // ---- shaders ----
  const vs = `
    attribute vec2 a_p;
    void main(){ gl_Position = vec4(a_p, 0.0, 1.0); }`;

  const fs = `
    precision highp float;
    uniform vec2 u_res; uniform float u_time;
    uniform float u_warp, u_post, u_bands, u_scale, u_contrast, u_spread;
    uniform vec3 u_c1, u_c2, u_c3, u_c4;
    float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
    float noise(vec2 p){
      vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
                 mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
    }
    float fbm(vec2 p){
      float v = 0.0, a = 0.5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
      for (int i = 0; i < 5; i++){ v += a * noise(p); p = m * p; a *= 0.5; } return v;
    }
    float post(float v){ float b = floor(v * u_bands + 0.5) / u_bands; return mix(v, b, u_post); }
    float nhash(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
    void main(){
      vec2 uv = gl_FragCoord.xy / u_res.xy;
      vec2 p = uv; p.x *= u_res.x / u_res.y; p *= u_scale;
      float t = u_time;
      vec2 q = vec2(fbm(p + vec2(0.0, 0.0) + 0.10 * t), fbm(p + vec2(5.2, 1.3) - 0.08 * t));
      vec2 r = vec2(fbm(p + u_warp * q + vec2(1.7, 9.2) + 0.06 * t), fbm(p + u_warp * q + vec2(8.3, 2.8) - 0.05 * t));
      float f = fbm(p + u_warp * r);
      // EDGE DISSOLVE: jitter the field before posterizing so band edges break into dither
      float d = (nhash(gl_FragCoord.xy) - 0.5) * u_spread;
      f = post(f + d);
      float qm = post(clamp(length(q) * 0.5, 0.0, 1.0) + d);
      float rb = post(clamp(r.y * 0.6 + 0.25, 0.0, 1.0) + d);
      vec3 col = mix(u_c1, u_c2, clamp(f * 1.3, 0.0, 1.0));
      col = mix(col, u_c3, clamp(qm, 0.0, 1.0));
      col = mix(col, u_c4, clamp(rb, 0.0, 1.0));
      col = (col - 0.5) * u_contrast + 0.5;
      col = mix(col, vec3(1.0), 0.03);
      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }`;

  function compile(type: number, src: string) {
    const s = gl!.createShader(type)!;
    gl!.shaderSource(s, src);
    gl!.compileShader(s);
    if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS))
      console.error(gl!.getShaderInfoLog(s), src);
    return s;
  }
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS))
    console.error(gl.getProgramInfoLog(prog));

  const aLoc = gl.getAttribLocation(prog, "a_p");
  const U: Record<string, WebGLUniformLocation | null> = {};
  [
    "u_res",
    "u_time",
    "u_warp",
    "u_post",
    "u_bands",
    "u_scale",
    "u_contrast",
    "u_spread",
    "u_c1",
    "u_c2",
    "u_c3",
    "u_c4",
  ].forEach((n) => (U[n] = gl!.getUniformLocation(prog, n)));

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );

  // ---- sizing ----
  const coarse =
    typeof window !== "undefined" &&
    window.matchMedia?.("(pointer: coarse)").matches;
  const maxDpr = coarse ? opts.maxDPRCoarse : opts.maxDPR;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    const w = Math.floor(window.innerWidth * dpr);
    const h = Math.floor(window.innerHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  }
  resize();

  // ---- draw ----
  function render() {
    gl!.viewport(0, 0, canvas.width, canvas.height);
    gl!.useProgram(prog);
    gl!.bindBuffer(gl!.ARRAY_BUFFER, buf);
    gl!.enableVertexAttribArray(aLoc);
    gl!.vertexAttribPointer(aLoc, 2, gl!.FLOAT, false, 0, 0);
    gl!.uniform2f(U.u_res, canvas.width, canvas.height);
    gl!.uniform1f(U.u_time, phase * 0.4);
    gl!.uniform1f(U.u_warp, opts.warp);
    gl!.uniform1f(U.u_post, opts.posterize);
    gl!.uniform1f(U.u_bands, opts.bands);
    gl!.uniform1f(U.u_scale, opts.scale);
    gl!.uniform1f(U.u_contrast, opts.contrast);
    gl!.uniform1f(U.u_spread, opts.edgeSpread);
    gl!.uniform3fv(U.u_c1, live.c1);
    gl!.uniform3fv(U.u_c2, live.c2);
    gl!.uniform3fv(U.u_c3, live.c3);
    gl!.uniform3fv(U.u_c4, live.c4);
    gl!.drawArrays(gl!.TRIANGLES, 0, 3);
  }

  // ---- loop ----
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const FRAME_MS = 1000 / opts.fpsCap;
  let phase = 0,
    raf = 0,
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
    phase += dt * live.speed;
    render();
  }

  if (reduce) {
    phase = 8; // a settled, static composition
    render();
  } else {
    raf = requestAnimationFrame(loop);
  }

  const onResize = () => {
    resize();
    if (reduce) render();
  };
  window.addEventListener("resize", onResize);

  return {
    setColors(colors: MeshColors) {
      live.c1 = hex2rgb(colors.base);
      live.c2 = hex2rgb(colors.field);
      live.c3 = hex2rgb(colors.accent1);
      live.c4 = hex2rgb(colors.accent2);
      if (reduce) render();
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
    parseInt(s.substring(0, 2), 16) / 255,
    parseInt(s.substring(2, 4), 16) / 255,
    parseInt(s.substring(4, 6), 16) / 255,
  ];
}
