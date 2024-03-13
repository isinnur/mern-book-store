import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//! route for save a new book
//? yeni kitap ekleme yolu (post)
router.post("/", async (request, response) => {
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

//! route for get all books from database
//? get isteğinin işlenmesi
router.get("/", async (request, response) => {
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

//!route for get one book from database by id
//? id ile bir kitap seçme
router.get("/:id", async (request, response) => {
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

//! route for update a book
//? bir kitabı güncelleme
router.put("/:id", async (request, response) => {
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
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//! route for delete a book
//? bir kitanı silme
//* we need a id and button
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      //error message
      return response.status(404).json({ message: "Book not found" });
    }
    //success message
    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
