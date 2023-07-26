import express from 'express';
import { getShelves, createShelf, getShelfById, updateShelf, deleteShelf } from '../controllers/shelves.js';

const router = express.Router();

// Get
router.get('/', getShelves);

// Post
router.post('/', createShelf);

router.get('/:id', getShelfById);

router.put('/:id', updateShelf);

router.delete('/:id', deleteShelf);


export default router;