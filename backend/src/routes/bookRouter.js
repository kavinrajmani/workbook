import express from 'express';
import { uploadImage } from '../lib/cloudinary.js';

const bookRouter = express.Router();
import Book from '../models/book.js';
import { isAuth } from '../middleware/authMiddleware.js';
import { deleteImage } from "../lib/cloudinary.js";

// Create a new book
bookRouter.post('/', isAuth, async (req, res) => {
    const { title, caption, image, rating } = req.body;
    const { _id } = req.user;

    try {
        if (!title || !caption || !image || !rating) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        uploadImage(image)
            .then(async (imageUrl) => {
                // If image upload is successful, save the book with the image URL
                const newBook = new Book({
                    title,
                    caption,
                    image: imageUrl, // Use the secure URL from Cloudinary
                    rating,
                    user: _id
                });
                await newBook.save();
                res.status(201).json({ message: 'Book created successfully', book: newBook });
            })
            .catch((error) => {
                res.status(500).json({ message: 'Image upload failed', error });
            });
        res.status(201).json({ message: 'Book created successfully', book: newBook });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all books
bookRouter.get('/', isAuth, async (req, res) => {
    const page = req.params.page || 1;
    const limit = req.params.limit || 5;
    const skip = (page - 1) * limit;
    try {
        const books = await Book.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('user', 'name profilePicture');
        if (!books || books.length === 0) {
            return res.status(404).json({ message: 'No books found' });
        }
        res.status(200).json({
            books,
            currentPage: page,
            totalBooks: await Book.countDocuments(),
            totalPages: Math.ceil(await Book.countDocuments() / limit),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a single book by ID
bookRouter.get('/:id', isAuth, async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id).populate('user', 'name profilePicture').sort({ createdAt: -1 });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// delete a book
bookRouter.delete('/:id', isAuth, async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Check if the user is the owner of the book
        if (book.user._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to view this book' });
        }

        //delete couldinary image
        if (book.image && book.image.includes('cloudinary')) {
            const publicId = book.image.split('/').pop().split('.')[0];
            await deleteImage(publicId);
        }

        // Delete the book
        await book.deleteOne();

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default bookRouter;