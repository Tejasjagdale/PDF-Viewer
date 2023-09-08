import React from "react";

const CSSMapper = (row: any) => {
  let bounds = JSON.parse(row.Bounds);

  const inlineStyle = {
    // position: "absolute",
    // left: `${bounds ? bounds[0] / 10 : 0}%`,
    // bottom: `${bounds ? bounds[1] / 10 : 0}%`,
    paddingLeft: `${row.heading_level_dept ? row.heading_level_dept * 5 : 0}px`,
    fontSize: `${row.TextSize}px`,
    fontFamily: row["Font.family_name"],
    fontWeight: row["Font.weight"],
    fontStyle: row["Font.italic"] ? "italic" : "normal",
    lineHeight: `${row["attributes.LineHeight"]}px` || "normal",
    textAlign: `${row["attributes.TextAlign"]}px` || "left",
    marginBottom: `${row["attributes.SpaceAfter"]}px`,
    // border:"1px dotted red",
    zIndex:"40",
    cursor:"pointer"
  };

  return inlineStyle;
};

export default CSSMapper;
