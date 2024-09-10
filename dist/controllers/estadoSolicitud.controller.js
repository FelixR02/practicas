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
exports.getCategoria = exports.deleteEstado = exports.updateEstado = exports.getEstado = exports.crearEstadoSolicitud = void 0;
const estadoSolicitud_1 = require("../entities/estadoSolicitud");
const crearEstadoSolicitud = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { enviado, recibido, procesado, aprobado, rechazado } = req.body;
        const estadoSolicitud = new estadoSolicitud_1.EstadoSolicitud();
        estadoSolicitud.enviado = enviado;
        estadoSolicitud.recibido = recibido;
        estadoSolicitud.procesando = procesado;
        estadoSolicitud.aprobado = aprobado;
        estadoSolicitud.rechazado = rechazado;
        yield estadoSolicitud.save();
        return res.json(estadoSolicitud);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.crearEstadoSolicitud = crearEstadoSolicitud;
const getEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estadoSolicitud = yield estadoSolicitud_1.EstadoSolicitud.find();
        return res.json(estadoSolicitud);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.getEstado = getEstado;
const updateEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const estadoSolicitud = yield estadoSolicitud_1.EstadoSolicitud.findOneBy({ id: parseInt(req.params.id) });
        if (!estadoSolicitud)
            return res.status(404).json({ message: "No existe la categoria" });
        yield estadoSolicitud_1.EstadoSolicitud.update({ id: parseInt(id) }, req.body);
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.updateEstado = updateEstado;
const deleteEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield estadoSolicitud_1.EstadoSolicitud.delete({ id: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json("La categoria no existe");
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.deleteEstado = deleteEstado;
const getCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const estadoSolicitud = yield estadoSolicitud_1.EstadoSolicitud.findOneBy({ id: parseInt(id) });
        return res.json(estadoSolicitud);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.getCategoria = getCategoria;
