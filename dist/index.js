var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import throttle from "lodash.throttle";
const millisecondForOneFrameIn60fps = 1000 / 60;
function getRatio(width, height) {
    return width / height;
}
function calculate(designWidth, designHeight) {
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
function ContainFixedDimension(props) {
    const { style, designWidth, designHeight } = props, otherProps = __rest(props, ["style", "designWidth", "designHeight"]);
    const [dimension, setDimension] = React.useState(() => calculate(designWidth, designHeight).dimension);
    const [scaleFactor, setScaleFactor] = React.useState(() => calculate(designWidth, designHeight).scaleFactor);
    React.useEffect(() => {
        const handleResize = throttle(() => {
            const result = calculate(designWidth, designHeight);
            setScaleFactor(result.scaleFactor);
            setDimension(result.dimension);
        }, millisecondForOneFrameIn60fps);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    });
    return (React.createElement("div", { style: Object.assign(Object.assign({}, dimension), { overflow: "hidden" }) },
        React.createElement("div", Object.assign({ style: Object.assign(Object.assign({}, style), { width: designWidth, height: designHeight, transform: `scale(${scaleFactor})`, transformOrigin: "left top" }) }, otherProps), props.children)));
}
export default ContainFixedDimension;
