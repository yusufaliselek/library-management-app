import Shelf from "../models/shelves.js";
import Part from "../models/parts.js";


export const getShelves = async (req, res) => {
    try {
        const result = [];
        const shelves = await Shelf.find();
        for (let i = 0; i < shelves.length; i++) {
            const parts = await Part.find({ shelfId: shelves[i]._id });
            let totalQuantity = 0;
            for (let j = 0; j < parts.length; j++) {
                totalQuantity += Number(parts[j].quantity);
            }
            result.push({
                id: shelves[i]._id,
                name: shelves[i].name,
                description: shelves[i].description,
                code: shelves[i].code,
                parts: totalQuantity
            })
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

export const getShelfById = async (req, res) => {
    try {
        const shelf = await Shelf.findById(req.params.id);
        const parts = await Part.find({ shelfId: shelf._id });
        const result = {
            id: shelf._id,
            name: shelf.name,
            description: shelf.description,
            code: shelf.code,
            parts: parts
        };

        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

export const createShelf = async (req, res) => {
    const newShelf = new Shelf(req.body);
    try {
        await newShelf.save();
        res.status(201).json(newShelf);
    }
    catch (error) {
        res.status(404).json({
            message: error.message
        });

    }
}

export const updateShelf = async (req, res) => {
    const { id } = req.params;
    const updatedShelfData = req.body;

    try {
        // İlk olarak güncellenmek istenen parçanın mevcut verisini alıyoruz
        const existingShelf = await Shelf.findById(id);

        if (!existingShelf) {
            return res.status(404).json({ message: 'Raf bulunamadı' });
        }

        // Güncellenmek istenen alanları güncel veri ile değiştiriyoruz
        existingShelf.name = updatedShelfData.name;
        existingShelf.description = updatedShelfData.description;
        existingShelf.code = updatedShelfData.code;

        // Güncellenmek istenen parçanın güncellenmiş halini kaydediyoruz
        await existingShelf.save();

        res.status(200).json(existingShelf);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}


export const deleteShelf = async (req, res) => {
    const { id } = req.params;

    try {
        // İlk olarak silinmek istenen rafın mevcut verisini alıyoruz
        const existingShelf = await Shelf.findById(id);

        if (!existingShelf) {
            return res.status(404).json({ message: 'Raf bulunamadı' });
        }

        // Silinmek istenen rafı siliyoruz
        await existingShelf.deleteOne();

        res.status(200).json({ message: 'Raf silindi' });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}