import * as yup from "yup";

export const validationSchema = {
  pdf: yup.object().shape({
    bookMark: yup
      .array()
      .of(
        yup.object().shape({
          availablePageFrom: yup
            .string()
            .required("available page from is required"),
          availablePageTo: yup
            .string()
            .required("available page to is required"),
          name: yup.string().required("name is required"),
        })
      )
      .required(),
  }),
};
