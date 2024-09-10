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
exports.getDepartamento = exports.deleteDepartamentos = exports.updateDepartamentos = exports.getDepartamentos = exports.crearDepartamento = void 0;
const departamento_1 = require("../entities/departamento");
const area_1 = require("../entities/area");
const crearDepartamento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, areaId } = req.body;
        // Validar que el areaId exista
        const area = yield area_1.Area.findOne({ where: { id: areaId } });
        if (!area) {
            return res.status(404).json({ message: 'Area no encontrada' });
        }
        const departamento = new departamento_1.Departamento();
        departamento.nombre = nombre;
        departamento.area = area; // Asignar la relación con el área
        yield departamento.save();
        return res.json(departamento);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.crearDepartamento = crearDepartamento;
const getDepartamentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departamentos = yield departamento_1.Departamento.find();
        return res.json(departamentos);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.getDepartamentos = getDepartamentos;
const updateDepartamentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const departamento = yield departamento_1.Departamento.findOneBy({ id: parseInt(req.params.id) });
        if (!departamento)
            return res.status(404).json({ message: "No existe el departamento" });
        yield departamento_1.Departamento.update({ id: parseInt(id) }, req.body);
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.updateDepartamentos = updateDepartamentos;
const deleteDepartamentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield departamento_1.Departamento.delete({ id: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json("El departarmento no existe");
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.deleteDepartamentos = deleteDepartamentos;
const getDepartamento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const departamento = yield departamento_1.Departamento.findOneBy({ id: parseInt(id) });
        return res.json(departamento);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.getDepartamento = getDepartamento;
