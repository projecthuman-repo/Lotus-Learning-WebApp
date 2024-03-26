import React, { useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { CiImageOn } from "react-icons/ci";
import { TfiDownload } from "react-icons/tfi";
import { MdKeyboardArrowLeft, MdKeyboardReturn } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiText } from "react-icons/ri";
import { RiDownloadLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiPlay } from "react-icons/hi2";
import { HiPause } from "react-icons/hi2";

import "../learning-components/course-media-components/course-media.css";
import url from "./pdf.pdf";
import SpinnerLoader from "../loaders/SpinnerLoader";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const PdfInterpreter = ({ media }) => {
  // const url = media
  const [page, setPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [reading, setReading] = useState(false);
  const [paused, setPaused] = useState(true);
  const [textByPage, setTextByPage] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Set up pdf.js worker
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.js",
      import.meta.url
    ).toString();

    // Function to extract text from a specific page
    async function getTextFromPage(pdf, pageNumber) {
      const page = await pdf.getPage(pageNumber);
      const textContent = await page.getTextContent();
      const textItems = textContent.items.map((item) => item.str);
      return textItems.join(" ");
    }

    // Main function to load the PDF and extract text from all pages
    async function extractTextFromPDF() {
      try {
        const pdf = await pdfjs.getDocument(url).promise;
        const totalPages = pdf.numPages;
        const extractedTextByPage = [];

        // Iterate over all pages of the PDF and extract text
        for (let i = 1; i <= totalPages; i++) {
          const text = await getTextFromPage(pdf, i);
          if (text.length >= 800) {
            // Check if text has at least 200 characters
            extractedTextByPage.push({ page: i, text });
          }
        }

        setTextByPage(extractedTextByPage);
        setLoaded(true);
      } catch (error) {
        console.error("Error extracting text from PDF:", error);
      }
    }
    console.log(textByPage.length);
    // Call the function to extract text when the component mounts
    extractTextFromPDF();
  }, [url]);

  const nextPage = () => {
    if (page + 1 > textByPage.length) {
      return;
    }
    setPage(page + 1);
  };
  const prevPage = () => {
    if (page - 1 < 1) {
      return;
    }
    setPage(page - 1);
  };
  const scrollToTop = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <div className="h-[600px] w-full relative border-b p-2">
      <div className="h-full w-full">
        <div className="flex items-center justify-between px-2">
          <div className="">
            <p className="text-sm">
              {loaded && (
                <>
                  <span className="font-semibold mx-1 text-stone-400">
                    {page}
                  </span>
                  <span className="font-semibold mx-1 text-stone-400">/</span>
                  <span className="font-semibold text_linearGradient_ver1">
                    {textByPage.length}
                  </span>
                </>
              )}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div
              onClick={() => prevPage()}
              className="cursor-pointer text-stone-400 rounded-full  border"
            >
              <MdOutlineKeyboardArrowLeft className="text-2xl" />
            </div>
            <div
              onClick={() => nextPage()}
              className="cursor-pointer text-stone-400 rounded-full  border"
            >
              <MdOutlineKeyboardArrowRight className="text-2xl" />
            </div>
          </div>
        </div>
        {!loaded && (
          <div className="h-full flex items-center justify-center">
            <SpinnerLoader />
          </div>
        )}
        <div ref={containerRef} className="h-[95%] w-full flex items-center justify-start overflow-auto mt-1 flex-col  ">
          <p className="p-2  w-[90%] sm:w-[85%] md:w-[70%] text-sm text-justify leading-7  ">
            {loaded && <p className="">{textByPage[page - 1].text}</p>}
            <span>
              <br />
              {page < textByPage.length && (
                <div className="w-full flex  justify-between mt-5">
                  <button onClick={() =>{
                     scrollToTop()
                     prevPage()
                     }} className="flex items-center justify-center hover:underline">
                    <span className="text-lg mx-1">
                      <MdOutlineKeyboardArrowLeft />
                    </span>
                    <span>Prev Page</span>
                  </button>
                  <button  onClick={() => {
                    scrollToTop()
                    nextPage()
                    }} className="flex items-center justify-center hover:underline">
                    <span>Next Page</span>
                    <span className="text-lg mx-1">
                      <MdOutlineKeyboardArrowRight />
                    </span>
                  </button>
                </div>
              )}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PdfInterpreter;
