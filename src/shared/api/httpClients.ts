///Se realiza la creación de la conexión con el Back
//NOTA: La variable de ser creada desde el Env del archivo principal del proeycto
import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
