import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft, MdZoomIn, MdZoomOut } from "react-icons/md";
import SpinnerLoader from "../loaders/SpinnerLoader";
import url from "./pdf.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const PdfInterpreter = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    pdfjs.getDocument(url).promise.then(({ numPages }) => {
      setNumPages(numPages);
      setLoading(false);
    }).catch(error => {
      console.error("Error loading PDF:", error);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        handlePrevPage();
      } else if (event.key === 'ArrowRight') {
        handleNextPage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [pageNumber]); // Only add/remove event listener when pageNumber changes

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      scrollToTop();
    }
  };

  const handleNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
      scrollToTop();
    }
  };

  const handleZoomIn = () => {
    setScale(scale + 0.1);
  };

  const handleZoomOut = () => {
    setScale(scale - 0.1);
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= numPages) {
      setPageNumber(value);
    }
  };

  const handleInputBlur = () => {
    // Ensure the input value is within the valid range
    if (pageNumber < 1) {
      setPageNumber(1);
    } else if (pageNumber > numPages) {
      setPageNumber(numPages);
    }
  };

  const scrollToTop = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="pdf-container">
      <div className="pdf-controls">
        <button className="control-button" onClick={handlePrevPage} disabled={pageNumber <= 1}>
          <MdOutlineKeyboardArrowLeft size={24} />
        </button>
        <span>
          <input
            type="number"
            min="1"
            max={numPages}
            value={pageNumber}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            ref={inputRef}
            className="page-number-input"
          /> / {numPages}
        </span>
        <button className="control-button" onClick={handleNextPage} disabled={pageNumber >= numPages}>
          <MdOutlineKeyboardArrowRight size={24} />
        </button>
        <button className="control-button" onClick={handleZoomIn} style={{ fontSize: '24px' }}>
          <MdZoomIn size={32} />
        </button>
        <button className="control-button" onClick={handleZoomOut} style={{ fontSize: '24px' }}>
          <MdZoomOut size={32} />
        </button>
      </div>
      <div className="pdf-viewer" ref={containerRef} style={{ overflow: 'auto', maxHeight: '500px' }}>
        <Document file={url}>
          <Page pageNumber={pageNumber} width={containerRef.current?.clientWidth} scale={scale} />
        </Document>
      </div>
      {loading && (
        <div className="pdf-loading">
          <SpinnerLoader />
        </div>
      )}
    </div>
  );
};

export default PdfInterpreter;
