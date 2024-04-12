import React from "react";
import "./BlobComposition.css";

function BlobComposition({ blobsData }) {
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
