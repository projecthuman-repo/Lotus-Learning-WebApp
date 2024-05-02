import React from "react";
import "./BlobComposition.css";

function BlobComposition({ blobsData = [
  { top: "10%", left: "-20%", size: "700px" },
  { top: "-30%", left: "70%", size: "400px" },
  { top: "40%", left: "50%", size: "300px" },
] }) {
  return (
    <div className="blob-container">
        {blobsData.map((blob, index) => {
          return (
            <div
              key={index}
              className={`blob magicpattern blob-${index + 1}`}
              style={{
                top: blob.top,
                left: blob.left,
                width: blob.size,
                height: blob.size,
              }}
            ></div>
          );
        })}
    </div>
  );
}

export default BlobComposition;
