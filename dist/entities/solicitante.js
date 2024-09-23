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
exports.Solicitante = void 0;
// src/entities/solicitante.ts
const typeorm_1 = require("typeorm");
const solicitud_1 = require("./solicitud");
const categoria_1 = require("./categoria");
const estadoSolicitud_1 = require("./estadoSolicitud");
let Solicitante = class Solicitante extends typeorm_1.BaseEntity {
};
exports.Solicitante = Solicitante;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Solicitante.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Solicitante.prototype, "nombre_1", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Solicitante.prototype, "nombre_2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Solicitante.prototype, "apellido_1", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Solicitante.prototype, "apellido_2", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => solicitud_1.Solicitud, (solicitud) => solicitud.solicitantes),
    __metadata("design:type", Array)
], Solicitante.prototype, "solicitudes", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => categoria_1.Categoria, (categoria) => categoria.solicitante),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", categoria_1.Categoria)
], Solicitante.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => estadoSolicitud_1.EstadoSolicitud, (estadoSolicitud) => estadoSolicitud.solicitante),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", estadoSolicitud_1.EstadoSolicitud)
], Solicitante.prototype, "estadoSolicitud", void 0);
exports.Solicitante = Solicitante = __decorate([
    (0, typeorm_1.Entity)()
], Solicitante);
