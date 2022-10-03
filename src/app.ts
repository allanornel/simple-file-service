import express, { json, urlencoded } from "express";
import "express-async-errors";
import fileUpload from "express-fileupload";
import cors from "cors";
import router from "./routers/router.js";
import handleErrorsMiddleware from "./middlewares/handleErrorsMiddleware.js";

const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(fileUpload());
app.use(router);
app.use(handleErrorsMiddleware);

export default app;
