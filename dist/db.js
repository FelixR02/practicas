"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const area_1 = require("./entities/area");
const carrera_1 = require("./entities/carrera");
const categoria_1 = require("./entities/categoria");
const departamento_1 = require("./entities/departamento");
const responsable_1 = require("./entities/responsable");
const solicitud_1 = require("./entities/solicitud");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    username: "root",
    password: "",
    port: 3306,
    database: "proyect",
    entities: [area_1.Area, carrera_1.Carrera, categoria_1.Categoria,
        departamento_1.Departamento, responsable_1.Responsable, solicitud_1.Solicitud],
    logging: false,
    synchronize: true
});
