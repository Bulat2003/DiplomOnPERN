const {Cargo} = require("../models/models");

class CargoController{
    async create(req,res){
        const { Description, Weight, CargoTypeId } = req.body;
        const cargo = await Cargo.create({ Description,Weight, CargoTypeId });
        return res.json(cargo);
    }

    async getAll(req, res){
        try {
            const cargos = await Cargo.findAll();
            return res.json(cargos);
        } catch (error) {
            console.error("Ошибка при получении списка грузов:", error);
            return res.status(500).json({ error: "Ошибка при получении списка грузов" });
        }
    }
    async delete(req, res){
        try {
            const { id } = req.params;
            const deletedCount = await Cargo.destroy({ where: { id } });
            if (deletedCount === 0) {
                return res.status(404).json({ error: "Груз не найден" });
            }
            return res.json({ message: "Груз успешно удален" });
        } catch (error) {
            console.error("Ошибка при удалении груза:", error);
            return res.status(500).json({ error: "Ошибка при удалении груза" });
        }
    }
    async getOne(req,res){
        try {
            const { id } = req.params;
            const cargo = await Cargo.findByPk(id);
            if (!cargo) {
                return res.status(404).json({ error: "Груз не найден" });
            }
            return res.json(cargo);
        } catch (error) {
            console.error("Ошибка при получении информации о грузе:", error);
            return res.status(500).json({ error: "Ошибка при получении информации о грузе" });
        }
    }
    async change(req,res){
        try {
            const { id } = req.params;
            const { Description, Weight, CargoTypeId } = req.body;
            const [updatedCount, updatedCargo] = await Cargo.update(
                { Description, Weight, CargoTypeId },
                { where: { id }, returning: true }
            );
            if (updatedCount === 0) {
                return res.status(404).json({ error: "Груз не найден" });
            }
            return res.json(updatedCargo[0]);
        } catch (error) {
            console.error("Ошибка при обновлении информации о грузе:", error);
            return res.status(500).json({ error: "Ошибка при обновлении информации о грузе" });
        }
    }
}

module.exports = new CargoController()