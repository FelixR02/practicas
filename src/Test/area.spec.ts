import { Area } from "../entities/area";

describe("Area Entity", () => {
    it("Deberia crear una instancia de Area", () => {
        const area = new Area();
        area.nombre = "Recursos Humanos";
        area.departamentos = [];
        area.responsable = [];

        expect(area).toBeInstanceOf(Area);
        expect(area.nombre).toBe("Recursos Humanos");
        expect(area.departamentos).toEqual([]);
        expect(area.responsable).toEqual([]);
    });
});