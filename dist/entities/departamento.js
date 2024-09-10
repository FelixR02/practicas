"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Departamento = void 0;
const typeorm_1 = require("typeorm");
const area_1 = require("./area");
const carrera_1 = require("./carrera");
const responsable_1 = require("./responsable");
let Departamento = class Departamento extends typeorm_1.BaseEntity {
};
exports.Departamento = Departamento;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Departamento.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Departamento.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Departamento.prototype, "creado", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Departamento.prototype, "actualizado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => area_1.Area, area => area.departamentos),
    (0, typeorm_1.JoinColumn)() // Especifica la columna de la clave foránea
    ,
    __metadata("design:type", area_1.Area)
], Departamento.prototype, "area", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => carrera_1.Carrera, carrera => carrera.departamento),
    __metadata("design:type", Array)
], Departamento.prototype, "carreras", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => responsable_1.Responsable, responsable => responsable.departamento),
    __metadata("design:type", Array)
], Departamento.prototype, "responsables", void 0);
exports.Departamento = Departamento = __decorate([
    (0, typeorm_1.Entity)()
], Departamento);
