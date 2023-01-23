import React, { useState } from "react";
import Loader from "./Loader";
import { Page, pdfjs } from "react-pdf";
import { Document } from "react-pdf/dist/esm/entry.webpack";

import ControlPanel from "./ControlPanel";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFReader = ({ availablePageFrom, availablePageTo }) => {
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(parseInt(availablePageFrom));
  const [isLoading, setIsLoading] = useState(true);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  return (
    <div>
      <Loader isLoading={isLoading} />
      <section
        id="pdf-section"
        className="d-flex flex-column align-items-center w-100"
      >
        <ControlPanel
          availablePageFrom={availablePageFrom}
          availablePageTo={availablePageTo}
          scale={scale}
          setScale={setScale}
          numPages={numPages}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          file="http://localhost:5000/api/v1/resources/static/assets/uploads/1674235250790.pdf"
        />
        <Document
          file="http://localhost:5000/api/v1/resources/static/assets/uploads/1674235250790.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
      </section>
    </div>
  );
};

export default PDFReader;
