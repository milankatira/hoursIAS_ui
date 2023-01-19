import React, {useMemo} from "react";
import ReactDropzone from "react-dropzone";

const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  transition: "border .3s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const Dropzone = () => {
  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    const formData = new FormData();
    formData.append("pdf", file);

    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        // handle server response
      })
      .catch((error) => {
        // handle error
      });
  };

  //   const style = useMemo(
  //   () => ({
  //     ...baseStyle,
  //     ...(isDragActive ? activeStyle : {}),
  //     ...(isDragAccept ? acceptStyle : {}),
  //     ...(isDragReject ? rejectStyle : {}),
  //   }),
  //   [isDragActive, isDragReject, isDragAccept]
  // );

  return (
    <>
      <ReactDropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop a PDF file here, or click to select a file</p>
          </div>
        )}
      </ReactDropzone>
    </>
  );
};

export default Dropzone;
