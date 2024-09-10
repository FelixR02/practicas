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
exports.getResponsable = exports.deleteResponsable = exports.updateResponsable = exports.getResponsables = exports.crearResponsable = void 0;
const responsable_1 = require("../entities/responsable");
const departamento_1 = require("../entities/departamento");
const area_1 = require("../entities/area");
const crearResponsable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, apellidos, nombreUsuario, email, areaId, departamentoId } = req.body;
        // Validar que el areaId exista
        const area = yield area_1.Area.findOne({ where: { id: areaId } });
        if (!area) {
            return res.status(404).json({ message: 'Area no encontrada' });
        }
        // Validar que el departamentoId exista
        const departamento = yield departamento_1.Departamento.findOne({ where: { id: departamentoId } });
        if (!departamento) {
            return res.status(404).json({ message: 'Departamento no encontrado' });
        }
        const responsable = new responsable_1.Responsable();
        responsable.nombre = nombre;
        responsable.apellidos = apellidos;
        responsable.nombreUsuario = nombreUsuario;
        responsable.email = email;
        responsable.area = area; // Asignar la relación con el área
        responsable.areaId = areaId; // Asignar el ID del área
        responsable.departamento = departamento; // Asignar la relación con el departamento
        responsable.departamentoId = departamentoId; // Asignar el ID del departamento
        yield responsable.save();
        return res.json(responsable);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.crearResponsable = crearResponsable;
const getResponsables = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responsable = yield responsable_1.Responsable.find();
        return res.json(responsable);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.getResponsables = getResponsables;
const updateResponsable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const responsable = yield responsable_1.Responsable.findOneBy({ id: parseInt(req.params.id) });
        if (!responsable)
            return res.status(404).json({ message: "No existe el responsable" });
        yield responsable_1.Responsable.update({ id: parseInt(id) }, req.body);
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.updateResponsable = updateResponsable;
const deleteResponsable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield responsable_1.Responsable.delete({ id: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json("El responsable no existe");
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.deleteResponsable = deleteResponsable;
const getResponsable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const responsable = yield responsable_1.Responsable.findOneBy({ id: parseInt(id) });
        return res.json(responsable);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.getResponsable = getResponsable;
