"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCarrera = exports.deleteCarrera = exports.updateCarreras = exports.getCarreras = exports.crearCarrera = void 0;
const carrera_1 = require("../entities/carrera");
const crearCarrera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, cantidadAnho, modalidad, departamentoId } = req.body;
        const carrera = new carrera_1.Carrera();
        carrera.nombre = nombre;
        carrera.cantidadAnho = cantidadAnho;
        carrera.modalidad = modalidad;
        carrera.departamentoId = departamentoId;
        yield carrera.save();
        return res.json(carrera);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.crearCarrera = crearCarrera;
const getCarreras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carreras = yield carrera_1.Carrera.find();
        return res.json(carreras);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.getCarreras = getCarreras;
const updateCarreras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const carreras = yield carrera_1.Carrera.findOneBy({ id: parseInt(req.params.id) });
        if (!carreras)
            return res.status(404).json({ message: "No existe la carrera" });
        yield carrera_1.Carrera.update({ id: parseInt(id) }, req.body);
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.updateCarreras = updateCarreras;
const deleteCarrera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield carrera_1.Carrera.delete({ id: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json("La carrera no existe");
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.deleteCarrera = deleteCarrera;
const getCarrera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const carrera = yield carrera_1.Carrera.findOneBy({ id: parseInt(id) });
        return res.json(carrera);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.getCarrera = getCarrera;
