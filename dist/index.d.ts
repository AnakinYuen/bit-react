import React from "react";
export interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    designWidth: number;
    designHeight: number;
}
declare function ContainFixedDimension(props: Props): JSX.Element;
export default ContainFixedDimension;
