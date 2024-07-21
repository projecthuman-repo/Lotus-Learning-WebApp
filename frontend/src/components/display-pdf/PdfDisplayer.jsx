import React, { useEffect, useState } from "react";
import formatText from "../../helpers/transform-api-text/transformApiText";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "./styles.css";
const PdfDisplayer = ({ text }) => {
  const [page, setPage] = useState(1);


  useEffect(() => {
    setPage(1);
  },[text])


  const sanitizeHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handlePageChange = (type) => {
    let currentPage = parseInt(page);
    if(!page){
        setPage(0)
    }
    if (type === "next" && currentPage < transformedText.length - 1) {
      setPage(currentPage + 1);
    } else if (type === "prev" && currentPage > 1) {
      setPage(currentPage - 1);
    }
  };
  const handlePageChangeForm = (e) => {
    e.preventDefault();
    console.log("aa");
  };
  const handlePageChangeInput = (e) => {
    // Obtener el valor del input y eliminar espacios en blanco al inicio y al final
    let value = e.target.value.trim();
  
    // Convertir el valor a un número entero
    let pageNumber = parseInt(value);
  
    // Verificar si el número es NaN o el valor es nulo
    if (isNaN(pageNumber) || value === '') {
      setPage(1); // Establecer la página a 1 si el valor no es válido
      return;
    }
  
    // Actualizar la página con el número entero válido
    setPage(pageNumber);
  };
  const divideTextIntoPages = (text, wordsPerPage = 300) => {
    const formatedText = sanitizeHtml(formatText(text));
    const words = formatedText.split(/\s+/); // Dividir por cualquier secuencia de espacios en blanco
    const pages = [''];
    let currentPage = "";
    words.forEach((word, index) => {
      currentPage += word + " ";
      if ((index + 1) % wordsPerPage === 0 || index === words.length - 1) {
        pages.push(currentPage.trim());
        currentPage = "";
      }
    });
    return pages;
  };
  const transformedText = divideTextIntoPages(text);

  const checkWidthBar = (current, full) => {
    return  (current * 100)/full
  }

  return (
    <div>
      <div className="w-full h-[0.15rem] bg-stone-200">
        <div style={{width: checkWidthBar(page, transformedText.length-1)+'%' }} className={`h-full linearGradient_ver1 transform-all`}></div>
      </div>

      <div className="flex items-center justify-center space-x-2 w-full px-3 my-2">
        <button
          className="p-2 bg-stone-100 rounded-lg hover:scale-[1.05] transform-all"
          onClick={() => handlePageChange("prev")}
        >
          <MdKeyboardArrowLeft />
        </button>
        <form onSubmit={handlePageChangeForm}>
          <input
            onChange={(e) => handlePageChangeInput(e)}
            type="text"
            placeholder="0"
            value={page}
            className="w-[40px] text-center focus:outline-none cursor-pointer font-semibold text-sm"
          />
        </form>
        <button
          className="p-2 bg-stone-100 rounded-lg hover:scale-[1.05] transform-all"
          onClick={() => handlePageChange("next")}
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
      <div className="h-[600px]   pt-2 overflow-y-auto flex items-center justify-center">

        <div className="w-[70%] h-full">
          <p className="text-justify  " id="output">
            {transformedText[page]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PdfDisplayer;
