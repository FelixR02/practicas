import { DataSource } from "typeorm";
import {Area} from "./entities/area"
import { Carrera } from "./entities/carrera";
import { Categoria } from "./entities/categoria";
import { Departamento } from "./entities/departamento";
import { Responsable } from "./entities/responsable";
import { Solicitud } from "./entities/solicitud";


export const AppDataSource = new DataSource({
type: "mysql",
host: "localhost",
username: "root",
password: "",
port: 3306,
database:"proyect",
entities: [Area, Carrera,Categoria,
    Departamento,Responsable,Solicitud],
logging: false,
synchronize: true

})