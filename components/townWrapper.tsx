export const TownWrapper = (props: {
  className?: string;
  z?: number;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`townWrapper absolute right-12 bottom-12 max-h-[45rem] w-[70vw] max-w-[54.72rem] aspect-[2004/1648] ${props.className ?? ""}`}
      style={props.z !== undefined ? { zIndex: props.z } : undefined}
    >
      {props.children}
    </div>
  );
};
