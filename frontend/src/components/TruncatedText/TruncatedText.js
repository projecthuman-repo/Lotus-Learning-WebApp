import React from "react";

const TruncatedText = ({ text, maxWidth = "150px" }) => {
    const style = {
      width: maxWidth,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    };
  
    return <p style={style}>{text}</p>;
  };

export default TruncatedText;