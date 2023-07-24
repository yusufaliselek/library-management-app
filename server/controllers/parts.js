import Part from "../models/parts.js";
import Shelf from "../models/shelves.js";

export const getParts = async (req, res) => {
    try {
        const parts = await Part.find();
        const result = await Promise.all(parts.map(async (part) => {
            const shelf = await Shelf.findById(part.shelfId);
            return {
                id: part._id,
                name: part.name,
                description: part.description,
                code: part.code,
                price: part.price,
                quantity: part.quantity,
                image: part.image,
                shelfName: shelf.name,
                shelfId: shelf._id
            };
        }));
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}


export const getPartById = async (req, res) => {
    try {
        const part = await Part.findById(req.params.id);
        const { _id, name, description, code, price, quantity, image, shelfId } = part;
        const shelf = await Shelf.findById(shelfId);
        const result = {
            id: _id,
            name,
            description,
            code,
            price,
            quantity,
            image,
            shelfId,
            shelfName: shelf.name
        };
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}


export const createPart = async (req, res) => {
    const newPart = new Part(req.body);
    try {
        await newPart.save();
        res.status(201).json(newPart);
    }
    catch (error) {
        res.status(404).json({
            message: error.message
        });

    }
};

export const updatePart = async (req, res) => {
    const { id } = req.params;
    const updatedPartData = req.body;

    try {
        // İlk olarak güncellenmek istenen parçanın mevcut verisini alıyoruz
        const existingPart = await Part.findById(id);

        if (!existingPart) {
            return res.status(404).json({ message: 'Parça bulunamadı' });
        }

        // Güncellenmek istenen alanları güncel veri ile değiştiriyoruz
        existingPart.name = updatedPartData.name;
        existingPart.description = updatedPartData.description;
        existingPart.code = updatedPartData.code;
        existingPart.price = updatedPartData.price;
        existingPart.quantity = updatedPartData.quantity;
        existingPart.image = updatedPartData.image;
        existingPart.shelfId = updatedPartData.shelfId;

        // Veritabanında güncelleme işlemini gerçekleştiriyoruz
        const updatedPart = await existingPart.save();

        res.status(200).json(updatedPart);
    } catch (error) {
        res.status(500).json({
            message: 'Parça güncellenirken bir hata oluştu',
            error: error.message
        });
    }
};
