import axios from "axios";
import { pdfUrl } from "../constant/apiUrl";
export const addPdf = async (payload) => {
  return await axios.post(pdfUrl, payload);
};


export const getPdfService = async () => {
  return await axios.get(pdfUrl);
};
