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
exports.EstadoSolicitud = void 0;
const typeorm_1 = require("typeorm");
const solicitante_1 = require("./solicitante");
let EstadoSolicitud = class EstadoSolicitud extends typeorm_1.BaseEntity {
};
exports.EstadoSolicitud = EstadoSolicitud;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EstadoSolicitud.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false
    }),
    __metadata("design:type", Boolean)
], EstadoSolicitud.prototype, "enviado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false
    }),
    __metadata("design:type", Boolean)
], EstadoSolicitud.prototype, "recibido", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false
    }),
    __metadata("design:type", Boolean)
], EstadoSolicitud.prototype, "procesando", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false
    }),
    __metadata("design:type", Boolean)
], EstadoSolicitud.prototype, "aprobado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false
    }),
    __metadata("design:type", Boolean)
], EstadoSolicitud.prototype, "rechazado", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], EstadoSolicitud.prototype, "creado", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date
    //Solicitante
    )
], EstadoSolicitud.prototype, "actualizado", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => solicitante_1.Solicitante, (solicitante) => solicitante.estadoSolicitud),
    __metadata("design:type", solicitante_1.Solicitante)
], EstadoSolicitud.prototype, "solicitante", void 0);
exports.EstadoSolicitud = EstadoSolicitud = __decorate([
    (0, typeorm_1.Entity)()
], EstadoSolicitud);
