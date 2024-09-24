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
exports.getSolicitante = exports.deleteSolicitante = exports.updateSolicitante = exports.getSolicitantes = exports.crearSolicitante = void 0;
const solicitud_1 = require("../entities/solicitud");
const categoria_1 = require("../entities/categoria");
const responsable_1 = require("../entities/responsable");
const crearSolicitante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre_1, nombre_2, apellido_1, apellido_2, fundamentacion, categoriaId, responsableId } = req.body;
        // Busca la categoría por ID
        const categoria = yield categoria_1.Categoria.findOneBy({ id: categoriaId });
        if (!categoria) {
            return res.status(404).json({ message: "Categoria no encontrada" });
        }
        const responsable = yield responsable_1.Responsable.findOneBy({ id: responsableId });
        if (!responsable) {
            return res.status(404).json({ message: "Responsbale no encontrado" });
        }
        const solicitud = new solicitud_1.Solicitud();
        solicitud.nombre_1 = nombre_1;
        solicitud.nombre_2 = nombre_2;
        solicitud.apellido_1 = apellido_1;
        solicitud.apellido_2 = apellido_2;
        solicitud.categoria = categoria; // Asigna la categoría al solicitante
        solicitud.responsable = responsable;
        solicitud.fundamentacion = fundamentacion;
        yield solicitud.save();
        return res.json(solicitud);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.crearSolicitante = crearSolicitante;
const getSolicitantes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const solicitante = yield solicitud_1.Solicitud.find();
        return res.json(solicitante);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.getSolicitantes = getSolicitantes;
const updateSolicitante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nombre_1, nombre_2, apellido_1, apellido_2, fundamentacion, categoriaId } = req.body;
        const solicitante = yield solicitud_1.Solicitud.findOneBy({ id: parseInt(id) });
        if (!solicitante) {
            return res.status(404).json({ message: "No existe el solicitante" });
        }
        if (nombre_1)
            solicitante.nombre_1 = nombre_1;
        if (nombre_2)
            solicitante.nombre_2 = nombre_2;
        if (apellido_1)
            solicitante.apellido_1 = apellido_1;
        if (fundamentacion)
            solicitante.fundamentacion = fundamentacion;
        if (apellido_2)
            solicitante.apellido_2 = apellido_2;
        if (categoriaId) {
            const categoria = yield categoria_1.Categoria.findOneBy({ id: categoriaId });
            if (categoria) {
                solicitante.categoria = categoria;
            }
            else {
                return res.status(404).json({ message: "No existe la categoria" });
            }
        }
        yield solicitante.save();
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateSolicitante = updateSolicitante;
const deleteSolicitante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield solicitud_1.Solicitud.delete({ id: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json("El responsable no existe");
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.deleteSolicitante = deleteSolicitante;
const getSolicitante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const solicitante = yield solicitud_1.Solicitud.findOneBy({ id: parseInt(id) });
        return res.json(solicitante);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.getSolicitante = getSolicitante;
