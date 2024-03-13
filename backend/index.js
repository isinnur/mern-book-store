import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";

//? express uygulamasının oluşturulması
const app = express();

// Middleware for parsing request body  --->>postman
//? istek gövdelerini ayrıştırmak için
app.use(express.json());

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
