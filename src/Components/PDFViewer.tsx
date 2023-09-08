import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const PDFViewer = () => {
  const docs = [
    // { uri: "https://url-to-my-pdf.pdf" }, // Remote file
    { uri: require("../lib/assets/pdfs/test2.pdf") }, // Local File
  ];

  return (
    <DocViewer
      documents={docs}
      pluginRenderers={DocViewerRenderers}
      config={{
        header: {
          disableHeader: true,
          disableFileName: true,
          retainURLParams: true,
        },
        csvDelimiter: ",", // "," as default,
        // pdfZoom: {
        //   defaultZoom: 1.1, // 1 as default,
        //   zoomJump: 0.2, // 0.1 as default,
        // },
        pdfVerticalScrollByDefault: true, // false as default
      }}
    />
  );
};

export default PDFViewer;

// import React, { useState } from "react";
// import { Document, Page } from "react-pdf";
// import { pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// function App() {
//   const [numPages, setNumPages] = useState<number>();
//   const [pageNumber, setPageNumber] = useState<number>(1);

//   function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
//     setNumPages(numPages);
//   }

//   return (
//     <div>
//       <Document file="../lib/assets/pdfs/sample.pdf" onLoadSuccess={onDocumentLoadSuccess}>
//         <Page pageNumber={pageNumber} />
//       </Document>
//       <p>
//         Page {pageNumber} of {numPages}
//       </p>
//     </div>
//   );
// }

// export default App;
