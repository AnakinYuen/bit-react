import React from "react";
import throttle from "lodash.throttle";

type Dimension = Pick<
  React.AllHTMLAttributes<HTMLDivElement>,
  "width" | "height"
>;

export interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  designWidth: number;
  designHeight: number;
}

const millisecondForOneFrameIn60fps = 1000 / 60;

function getRatio(width: number, height: number) {
  return width / height;
}

function calculate(
  designWidth: number,
  designHeight: number
): { scaleFactor: number; dimension: Dimension } {
  const windowRatio = getRatio(window.innerWidth, window.innerHeight);
  const targetRatio = getRatio(designWidth, designHeight);
  const isMaximizeWidth = targetRatio > windowRatio;
  if (isMaximizeWidth) {
    return {
      scaleFactor: window.innerWidth / designWidth,
      dimension: {
        width: window.innerWidth,
        height: window.innerWidth * getRatio(designHeight, designWidth),
      },
    };
  }
  return {
    scaleFactor: window.innerHeight / designHeight,
    dimension: {
      width: window.innerHeight * getRatio(designWidth, designHeight),
      height: window.innerHeight,
    },
  };
}

function ContainFixedDimension(props: Props) {
  const { style, designWidth, designHeight, ...otherProps } = props;

  const [dimension, setDimension] = React.useState<Dimension>(
    () => calculate(designWidth, designHeight).dimension
  );
  const [scaleFactor, setScaleFactor] = React.useState(
    () => calculate(designWidth, designHeight).scaleFactor
  );
  React.useEffect(() => {
    const handleResize = throttle(() => {
      const result = calculate(designWidth, designHeight);
      setScaleFactor(result.scaleFactor);
      setDimension(result.dimension);
    }, millisecondForOneFrameIn60fps);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div
      style={{
        ...dimension,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          ...style,
          width: designWidth,
          height: designHeight,
          transform: `scale(${scaleFactor})`,
          transformOrigin: "left top",
        }}
        {...otherProps}
      >
        {props.children}
      </div>
    </div>
  );
}

export default ContainFixedDimension;
