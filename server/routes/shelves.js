import express from 'express';
import { getShelves, createShelf, getShelfById, updateShelf } from '../controllers/shelves.js';

const router = express.Router();

// Get
router.get('/', getShelves);

// Post
router.post('/', createShelf);

router.get('/:id', getShelfById);

router.put('/:id', updateShelf);


export default router;