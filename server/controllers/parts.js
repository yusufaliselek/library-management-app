import Part from "../models/parts.js";
import PartImage from "../models/partImages.js";
import Shelf from "../models/shelves.js";

export const getParts = async (req, res) => {
    try {
        const parts = await Part.find();
        const result = await Promise.all(parts.map(async (part) => {
            let shelf = await Shelf.findById(part.shelfId);
            if (!shelf) {
                shelf = {
                    name: 'Raf bulunamadı',
                    _id: 'Raf silinmiş olabilir'
                };
            }
            return {
                id: part._id,
                name: part.name,
                description: part.description,
                code: part.code,
                price: part.price,
                quantity: part.quantity,
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
        const { _id, name, description, code, price, quantity, shelfId } = part;
        const partImage = await PartImage.find({ partId: _id });
        if (!partImage[0]) {
            partImage[0] = new PartImage({
                partId: _id,
                image: ''
            });
        }
        let shelf = await Shelf.findById(shelfId);
        if (!shelf) {
            shelf = {
                name: 'Raf bulunamadı',
                _id: '-1'
            };
        }

        const result = {
            id: _id,
            name,
            description,
            code,
            price,
            quantity,
            shelfId,
            image: partImage[0].image,
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
    const newPartImage = new PartImage({
        partId: newPart._id,
        image: req.body.image
    });
    try {
        await newPart.save();
        await newPartImage.save();
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
        let existingPartImage = await PartImage.find({ partId: id })[0];

        if (!existingPart) {
            return res.status(404).json({ message: 'Parça bulunamadı' });
        }

        if (!existingPartImage) {
            existingPartImage = new PartImage({
                partId: id,
                image: updatedPartData.image || ''
            });
            await existingPartImage.save();
        }

        // Eğer güncelleme isteğinde resim değişmişse, resmi güncelliyoruz
        if (updatedPartData.image !== existingPartImage.image) {
            existingPartImage.image = updatedPartData.image;
            await existingPartImage.save();
        }

        // Güncellenmek istenen alanları güncel veri ile değiştiriyoruz
        existingPart.name = updatedPartData.name;
        existingPart.description = updatedPartData.description;
        existingPart.code = updatedPartData.code;
        existingPart.price = updatedPartData.price;
        existingPart.quantity = updatedPartData.quantity;
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

export const changePartQuantity = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
        const part = await Part.findById(id);
        if (!part) return res.status(404).json({ message: 'Parça bulunamadı' });
        if (quantity == null || quantity < 0) return res.status(400).json({ message: 'Miktar negatif olamaz' });
        part.quantity = quantity;
        await part.save();
        res.status(200).json(part.quantity);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

}


export const deletePart = async (req, res) => {
    try {
        const part = await Part.findByIdAndDelete(req.params.id);
        const partImage = await PartImage.find({ partId: req.params.id });
        if (!part) {
            return res.status(404).json({
                message: 'Parça bulunamadı'
            });
        }
        if (partImage[0]) {
            await partImage[0].deleteOne();
        }
        res.status(200).json({
            message: 'Parça silindi'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}