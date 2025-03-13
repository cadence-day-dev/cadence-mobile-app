import { Svg, Line, Rect } from "react-native-svg";

const NoteIcon = () => {
  return (
    <Svg
      width="14"
      height="17"
      viewBox="0 0 14 17"
      fill="none"
      style={{
        position: "absolute",
        bottom: 10,
      }}
    >
      <Rect x="0.5" y="0.5" width="13.0076" height="16" stroke="black" />
      <Line
        x1="2.35742"
        y1="4.39453"
        x2="11.7883"
        y2="4.39453"
        stroke="black"
      />
      <Line
        x1="2.35742"
        y1="8.77344"
        x2="11.7883"
        y2="8.77344"
        stroke="black"
      />
      <Line
        x1="2.35742"
        y1="12.8945"
        x2="11.7883"
        y2="12.8945"
        stroke="black"
      />
    </Svg>
  );
};

export default NoteIcon;
