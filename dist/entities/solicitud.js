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
exports.Solicitud = void 0;
// src/entities/solicitante.ts
const typeorm_1 = require("typeorm");
const categoria_1 = require("./categoria");
const responsable_1 = require("./responsable");
let Solicitud = class Solicitud extends typeorm_1.BaseEntity {
};
exports.Solicitud = Solicitud;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Solicitud.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Solicitud.prototype, "nombre_1", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Solicitud.prototype, "nombre_2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Solicitud.prototype, "apellido_1", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Solicitud.prototype, "apellido_2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Solicitud.prototype, "fundamentacion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categoria_1.Categoria, (categoria) => categoria.solicitud),
    (0, typeorm_1.JoinColumn)({ name: "categoriaId" }) // Especifica la columna de la clave foránea
    ,
    __metadata("design:type", categoria_1.Categoria)
], Solicitud.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => responsable_1.Responsable, (responsable) => responsable.solicitudes),
    (0, typeorm_1.JoinColumn)({ name: "responsableId" }) // Especifica la columna de la clave foránea
    ,
    __metadata("design:type", responsable_1.Responsable)
], Solicitud.prototype, "responsable", void 0);
exports.Solicitud = Solicitud = __decorate([
    (0, typeorm_1.Entity)()
], Solicitud);
