import Shelf from "../models/shelves.js";
import Part from "../models/parts.js";


export const getShelves = async (req, res) => {
    try {
        const result = [];
        const shelves = await Shelf.find();
        for (let i = 0; i < shelves.length; i++) {
            const parts = await Part.find({ shelfId: shelves[i]._id });
            result.push({
                id: shelves[i]._id,
                name: shelves[i].name,
                description: shelves[i].description,
                code: shelves[i].code,
                parts: parts.length
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

        res.status(200).json(shelf);
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