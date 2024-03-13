import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

//? express uygulamasının oluşturulması
const app = express();

// Middleware for parsing request body  --->>postman
//? istek gövdelerini ayrıştırmak için
app.use(express.json());

// Middleware for handling cors policy
//option 1
app.use(cors());
//option 2
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// "/" (kök) yoluna yapılan GET isteklerini ele alır
//? kullanıcı anasayfasında görünen mesaj
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome To Mern Stack Tutorial");
});

//!
app.use("/books", booksRoute);

//! mongoDB bağlantısı ve express uygulamasının dinlenmesi
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database ");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
