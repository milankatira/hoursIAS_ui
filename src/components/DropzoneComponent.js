import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import ResponsiveAppBar from "./Header";
import { Button } from "@mui/material";
import styles from "./dropzone.module.scss";
import { addPdf } from "../service/pdf.service";
import TextField from "@mui/material/TextField";
// import "./dropzone.css"

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
  marginTop: "10px",
  // position: "absolute",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
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

function DropzoneComponent(props) {
  const [files, setFiles] = useState([]);
  const [fileUrl, setFileUrl] = useState("");
  const [pageFrom, setpageFrom] = useState(0);
  const [pageTo, setpageTo] = useState(0);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    const fileUrl = URL.createObjectURL(acceptedFiles[0]);
    setFileUrl(fileUrl);
  }, []);
  // console.log(files[0]?.name,"files")
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "application/pdf",
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const HandleSubmit = async () => {
    const formdata = new FormData();
    formdata.append("pdf", files[0]);
    formdata.append("availablePageFrom", pageFrom);
    formdata.append("availablePageTo", pageTo);
    try {
      await addPdf(formdata);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ResponsiveAppBar />
      <section className={styles.main__container}>
        <div className="dropzone" {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <div>Drag and drop your PDF here.</div>
        </div>
        <div>
          <a href={fileUrl} target="_blank">
            {files && files[0]?.name}
          </a>
        </div>
        <br />
        <TextField
          type="number"
          id="outlined-basic"
          label="page from"
          variant="outlined"
          value={pageFrom}
          onChange={(e) => setpageFrom(e.target.value)}
        />
        <br />

        <TextField
          type="number"
          id="outlined-basic"
          label="page to"
          variant="outlined"
          value={pageTo}
          onChange={(e) => setpageTo(e.target.value)}
        />

        <Button
          className={styles.main__buttonContainer}
          color="primary"
          variant="contained"
          disabled={!files}
          onClick={HandleSubmit}
        >
          submit
        </Button>
      </section>
    </>
  );
}

export default DropzoneComponent;
