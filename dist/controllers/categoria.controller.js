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
exports.getCategoria = exports.deleteCategoria = exports.updateCategorias = exports.getCategorias = exports.crearCategoria = void 0;
const categoria_1 = require("../entities/categoria");
const crearCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { estudiante, docente, noDocente } = req.body;
        const categoria = new categoria_1.Categoria();
        categoria.estudiante = estudiante;
        categoria.docente = docente;
        categoria.noDocente = noDocente;
        yield categoria.save();
        return res.json(categoria);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.crearCategoria = crearCategoria;
const getCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categorias = yield categoria_1.Categoria.find();
        return res.json(categorias);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.getCategorias = getCategorias;
const updateCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const categorias = yield categoria_1.Categoria.findOneBy({ id: parseInt(req.params.id) });
        if (!categorias)
            return res.status(404).json({ message: "No existe la categoria" });
        yield categoria_1.Categoria.update({ id: parseInt(id) }, req.body);
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.updateCategorias = updateCategorias;
const deleteCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield categoria_1.Categoria.delete({ id: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json("La categoria no existe");
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.deleteCategoria = deleteCategoria;
const getCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const categoria = yield categoria_1.Categoria.findOneBy({ id: parseInt(id) });
        return res.json(categoria);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.getCategoria = getCategoria;
