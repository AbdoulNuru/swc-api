import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import routes from "./routes/index";

dotenv.config();

const app = express();
const port = process.env.PORT;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());
// app.use(express.static("views/"));
// routes
app.use(routes);

app.listen(port, () => {
  console.log(`Strong Women Corner api is up ${port}`);
});

export default app;
