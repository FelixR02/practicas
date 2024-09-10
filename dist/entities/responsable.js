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
exports.Responsable = void 0;
const typeorm_1 = require("typeorm");
const area_1 = require("./area");
const solicitud_1 = require("./solicitud");
const departamento_1 = require("./departamento");
let Responsable = class Responsable extends typeorm_1.BaseEntity {
};
exports.Responsable = Responsable;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Responsable.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Responsable.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Responsable.prototype, "apellidos", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Responsable.prototype, "nombreUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Responsable.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Responsable.prototype, "creado", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Responsable.prototype, "actualizado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => area_1.Area, area => area.responsable),
    (0, typeorm_1.JoinColumn)({ name: "areaId" }) // Especifica la columna de la clave foránea
    ,
    __metadata("design:type", area_1.Area)
], Responsable.prototype, "area", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Responsable.prototype, "areaId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => solicitud_1.Solicitud, solicitud => solicitud.responsable),
    __metadata("design:type", Array)
], Responsable.prototype, "solicitudes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => departamento_1.Departamento, (departamento) => departamento.responsables),
    (0, typeorm_1.JoinColumn)({ name: "departamentoId" }) // Especifica la columna de la clave foránea
    ,
    __metadata("design:type", departamento_1.Departamento)
], Responsable.prototype, "departamento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Responsable.prototype, "departamentoId", void 0);
exports.Responsable = Responsable = __decorate([
    (0, typeorm_1.Entity)()
], Responsable);
