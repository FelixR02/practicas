"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const area_1 = require("../entities/area");
describe("Area Entity", () => {
    it("Deberia crear una instancia de Area", () => {
        const area = new area_1.Area();
        area.nombre = "Recursos Humanos";
        area.departamentos = [];
        area.responsable = [];
        expect(area).toBeInstanceOf(area_1.Area);
        expect(area.nombre).toBe("Recursos Humanos");
        expect(area.departamentos).toEqual([]);
        expect(area.responsable).toEqual([]);
    });
});
