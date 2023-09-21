import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import pdf from "../lib/assets/pdfs/test2.pdf";
import { Navigate } from "react-router-dom";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ReactPdf = (props) => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
      <div style={{ overflowY: "scroll", height: "100%" }}>
        <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <div id={`page_${index + 1}`}>
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderAnnotationLayer={false}
              />
            </div>
          ))}
          {/* <Page pageNumber={props.pageNumber} renderMode="single"/> */}
        </Document>
      </div>
  );
};

export default ReactPdf;
