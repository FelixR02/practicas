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
// src/entities/solicitud.ts
const typeorm_1 = require("typeorm");
const responsable_1 = require("./responsable");
const solicitante_1 = require("./solicitante");
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
], Solicitud.prototype, "fundamentacion", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Solicitud.prototype, "creado", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Solicitud.prototype, "actualizado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => responsable_1.Responsable, responsable => responsable.solicitudes),
    (0, typeorm_1.JoinColumn)({ name: "responsableId" }),
    __metadata("design:type", responsable_1.Responsable)
], Solicitud.prototype, "responsable", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Solicitud.prototype, "responsableId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => solicitante_1.Solicitante, (solicitante) => solicitante.solicitudes),
    (0, typeorm_1.JoinTable)({
        name: "solicitud_solicitantes_solicitante",
        joinColumn: {
            name: "solicitudId",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "solicitanteId",
            referencedColumnName: "id"
        }
    }),
    __metadata("design:type", Array)
], Solicitud.prototype, "solicitantes", void 0);
exports.Solicitud = Solicitud = __decorate([
    (0, typeorm_1.Entity)()
], Solicitud);
