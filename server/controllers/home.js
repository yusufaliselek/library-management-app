import Shelf from "../models/shelves.js";
import Part from "../models/parts.js";

export const getHome = async (req, res) => {
    try {
        const returnData = {};
        const shelves = await Shelf.find();
        returnData.labels = shelves.map((shelf) => shelf.name);
        returnData.datasets = [];

        const data = [];
        for (const shelf of shelves) {
            const shelfParts = await Part.find({ shelfId: shelf._id });
            let totalQuantity = 0;
            for (const part of shelfParts) {
                // Assuming the quantity field is a numeric value (integer or float)
                totalQuantity += parseInt(part.quantity, 10);
            }
            data.push(totalQuantity);
        }

        // Büyükten küçüğe sıralama ve aynı sıralamayı labels array'ine uygulama
        const sortedDataWithLabels = data.map((value, index) => ({ value, label: returnData.labels[index] }));
        sortedDataWithLabels.sort((a, b) => b.value - a.value);

        const top10DataWithLabels = sortedDataWithLabels.slice(0, 10);

        // Düzenlenmiş verileri ayrıştırma
        const top10Labels = top10DataWithLabels.map((item) => item.label);
        const top10Data = top10DataWithLabels.map((item) => item.value);

        returnData.labels = top10Labels;
        returnData.datasets.push({
            label: "Raf Parça Sayısı",
            data: top10Data,
            backgroundColor: "rgba(54, 162, 235, 0.2)"
        });

        res.status(200).json(returnData);

    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}