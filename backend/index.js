import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

//express uygulamasının oluşturulması
const app = express();

// Middleware for parsing request body  --->>postman
//istek gövdelerini ayrıştırmak için
app.use(express.json());

// "/" (kök) yoluna yapılan GET isteklerini ele alır
//kullanıcı anasayfasında görünen mesaj
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome To Mern Stack Tutorial");
});

//route for save a new book
//yeni kitap ekleme yolu (post)
app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//router for get all books from database
//get isteğinin işlenmesi
app.get("/books", async (request, response) => {
  try {
    //kitapların getirilmesi
    const books = await Book.find({});
    //cevap oluşturma ve gönderme
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route for get one book from database by id
app.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;

    //kitapların getirilmesi
    const books = await Book.findById(id);

    //cevap oluşturma ve gönderme
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//mongoDB bağlantısı ve express uygulamasının dinlenmesi
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
