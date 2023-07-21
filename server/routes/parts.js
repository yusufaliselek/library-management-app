import express from 'express';
import { getParts, createPart, getPartById, updatePart } from '../controllers/parts.js';

const router = express.Router();

// Get
router.get('/', getParts);

// Post
router.post('/', createPart);

router.get('/:id', getPartById);

router.put('/:id', updatePart);


export default router;
