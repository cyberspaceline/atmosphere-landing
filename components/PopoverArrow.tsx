export const PopoverArrow = (props: { fill: string; stroke: string }) => {
  return (
    <svg
      width="26"
      height="16"
      viewBox="0 0 26 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.24396 0L13.4889 14.4903L24.7911 0H1.24396Z"
        fill={props.fill}
      />
      <path
        d="M13.4889 14.4903L1.24396 0H0L13.5196 16L26 0H24.7911L13.4889 14.4903Z"
        fill={props.stroke}
      />
    </svg>
  );
};
