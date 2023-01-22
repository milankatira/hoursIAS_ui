import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import ResponsiveAppBar from "./Header";
import { Button } from "@mui/material";
import styles from "./dropzone.module.scss";
import { addPdf } from "../service/pdf.service";
import TextField from "@mui/material/TextField";

import { Formik, Form, FieldArray, Field } from "formik";
import { initialValues } from "../constant/initialValue";
import { validationSchema } from "../constant/ValidationSchema";

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

  const HandleSubmit = async (data) => {
    console.log(data.bookMark,"BOOKMARK");
    const formdata = new FormData();

    formdata.append("pdf", files[0]);

    for (let i = 0; i < data.bookMark.length; i += 1) {
      formdata.append(`bookMark[${i}]`, data.bookMark[i].availablePageFrom);
      formdata.append(`bookMark[${i}]`, data.bookMark[i].availablePageTo);
      formdata.append(`bookMark[${i}]`, data.bookMark[i].name);
    }

    try {
      await addPdf(formdata);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ResponsiveAppBar />

      <Formik
        initialValues={initialValues.pdf}
        onSubmit={HandleSubmit}
        validationSchema={validationSchema.pdf}
      >
        {({ values, errors, touched }) => {
          return (
            <Form
              noValidate
              autoComplete="off"
              className={styles.main__container}
            >
              <section>
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
              </section>
              <FieldArray
                name="bookMark"
                render={(arrayHelpers) => (
                  <div>
                    {values?.bookMark?.map((singleValue, index) => (
                      <div className={styles.main__field__container}>
                        <Field
                          as={TextField}
                          name={`bookMark[${index}].name`}
                          type="text"
                          id="outlined-basic"
                          label="name"
                          variant="outlined"
                          error={
                            touched &&
                            touched.bookMark &&
                            touched?.bookMark[index]?.name &&
                            errors &&
                            errors.bookMark &&
                            errors.bookMark[index]?.name
                          }
                          helperText={
                            touched &&
                            touched.bookMark &&
                            touched?.bookMark[index]?.name &&
                            errors &&
                            errors.bookMark &&
                            errors.bookMark[index]?.name
                          }
                        />
                        <br />
                        <Field
                          as={TextField}
                          name={`bookMark[${index}].availablePageFrom`}
                          type="text"
                          id="outlined-basic"
                          label="availablePageFrom"
                          variant="outlined"
                          error={
                            touched &&
                            touched.bookMark &&
                            touched?.bookMark[index]?.availablePageFrom &&
                            errors &&
                            errors.bookMark &&
                            errors.bookMark[index]?.availablePageFrom
                          }
                          helperText={
                            touched &&
                            touched.bookMark &&
                            touched?.bookMark[index]?.availablePageFrom &&
                            errors &&
                            errors.bookMark &&
                            errors.bookMark[index]?.availablePageFrom
                          }
                        />
                        <br />
                        <Field
                          as={TextField}
                          name={`bookMark[${index}].availablePageTo`}
                          type="text"
                          id="outlined-basic"
                          label="availablePageTo"
                          variant="outlined"
                          error={
                            touched &&
                            touched.bookMark &&
                            touched?.bookMark[index]?.availablePageTo &&
                            errors &&
                            errors.bookMark &&
                            errors.bookMark[index]?.availablePageTo
                          }
                          helperText={
                            touched &&
                            touched.bookMark &&
                            touched?.bookMark[index]?.availablePageTo &&
                            errors &&
                            errors.bookMark &&
                            errors.bookMark[index]?.availablePageTo
                          }
                        />
                        <br />
                        <br />
                      </div>
                    ))}

                    <Button
                      onClick={() =>
                        arrayHelpers.push({
                          availablePageFrom: "",
                          availablePageTo: "",
                          name: "",
                        })
                      }
                    >
                      Add a Address
                    </Button>
                  </div>
                )}
              />

              <Button
                className={styles.main__buttonContainer}
                color="primary"
                variant="contained"
                type="submit"
              >
                submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default DropzoneComponent;
