import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { CiImageOn } from "react-icons/ci";
import { TfiDownload } from "react-icons/tfi";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiText } from "react-icons/ri";
import { RiDownloadLine } from "react-icons/ri";

import pdf from "./testPdf.pdf"

import "./course-media.css"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();

const TextFileMedia = () => {
  // State variables to manage PDF display settings
  const [displayMode, setDisplayMode] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  // Callback function for successful loading of the PDF document
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  // Function to go to the next page
  const nextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  // Function to go to the previous page
  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div className=" w-full relative border-b ">
      {/* Navigation and display mode toggle */}
      <div className="mx-auto h-[40px]  flex justify-left space-x-3 pl-4 pb-1 border-b">
        <div className="flex items-center justify-center rounded-md border  w-[75px]">
          <p className="font-medium text-xs flex items-center justify-center">
            {pageNumber}
            <span className="mx-2">/</span>
            {numPages}
          </p>
        </div>
        <div className="flex items-center justify-between px-1 w-full text-2xl">
          {/* Display mode toggle button */}
          <UtilityButton
            icon={
              displayMode ? <CiImageOn sx={{ fontSize: 32 }} /> : <RiText  sx={{ fontSize: 30 }} />
            }
            execute={() => setDisplayMode(!displayMode)}
            utility={displayMode ? "as Image" : "as Text"}
          />
          <div className="mr-5 text-lg">
            {/* Download button */}
            <UtilityButton
              icon={<RiDownloadLine />}
              execute={() => () => {console.log("Downloading")}}
              utility={"download"}
            />
          </div>
        </div>
      </div>

      {/* PDF viewer */}
      <div className="">
        <Document
          className={loading ? 'opacity-0' : 'opacity-1'} file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            loading={<div className="h-[500px] w-full"></div>}
            className={`page_display ${
              displayMode ? "display_image" : "display_text"
            } px-2  maxHeight`}
            pageNumber={pageNumber}
            renderTextLayer={true}
            noData={<></>}
          />
        </Document>
      </div>

      {/* Navigation arrows */}
      <div
        className={`absolute flex justify-between items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[90%] h-[60px] `}
      >
        <div
          onClick={() => prevPage()}
          className="text-stone-600 hover:bg-stone-100 cursor-pointer relative hoverClass rounded-full">
          <MdKeyboardArrowLeft  className="text-xl" />
        </div>
        <div
          onClick={() => nextPage()}
          className="text-stone-600 hover:bg-stone-100 cursor-pointer relative hoverClass rounded-full">
          <MdKeyboardArrowRight  className="text-xl" />
        </div>
      </div>
    </div>
  );
};

// Utility button component
const UtilityButton = ({ icon, execute, utility }) => {
  return (
    <button
      onClick={execute}
      className="relative hoverClass flex items-center justify-center text-stone-500  w-[35px] h-[35px] rounded-md  ">
      {icon}
      <div className="absolute transform -translate-x-1/2 left-1/2 top-[105%] z-20 min-w-[70px] p-1 bg-stone-700 displayOnHover rounded-sm ">
        <p className=" text-xs m-auto  text-white text-center ">{utility}</p>
      </div>
    </button>
  );
};
export default TextFileMedia