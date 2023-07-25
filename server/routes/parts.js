import express from 'express';
import { getParts, createPart, getPartById, updatePart, changePartQuantity } from '../controllers/parts.js';

const router = express.Router();

// Get
router.get('/', getParts);

// Post
router.post('/', createPart);

router.get('/:id', getPartById);

router.put('/:id', updatePart);

router.put('/quantity/:id', changePartQuantity);


export default router;
