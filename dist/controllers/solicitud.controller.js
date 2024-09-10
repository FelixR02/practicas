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
exports.getSolicitud = exports.deleteSolicitud = exports.updateSolicitud = exports.getSolicitudes = exports.crearSolicitud = void 0;
const solicitud_1 = require("../entities/solicitud");
const crearSolicitud = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fundamentacion, responsableId, solicitantes } = req.body;
        const solicitud = new solicitud_1.Solicitud();
        solicitud.fundamentacion = fundamentacion;
        solicitud.responsableId = responsableId;
        solicitud.solicitantes = solicitantes;
        yield solicitud.save();
        return res.json(solicitud);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.crearSolicitud = crearSolicitud;
const getSolicitudes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const s = yield solicitud_1.Solicitud.find();
        return res.json(s);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.getSolicitudes = getSolicitudes;
const updateSolicitud = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const solicitud = yield solicitud_1.Solicitud.findOneBy({ id: parseInt(req.params.id) });
        if (!solicitud)
            return res.status(404).json({ message: "No existe el área" });
        yield solicitud_1.Solicitud.update({ id: parseInt(id) }, req.body);
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.updateSolicitud = updateSolicitud;
const deleteSolicitud = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield solicitud_1.Solicitud.delete({ id: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json("La solicitud no existe");
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.deleteSolicitud = deleteSolicitud;
const getSolicitud = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const s = yield solicitud_1.Solicitud.findOneBy({ id: parseInt(id) });
        return res.json(s);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.getSolicitud = getSolicitud;
