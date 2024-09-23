// src/entities/solicitante.ts
import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Solicitud } from "./solicitud";
import { Categoria } from "./categoria";
import { EstadoSolicitud } from "./estadoSolicitud";

@Entity()
export class Solicitante extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre_1: string;

    @Column()
    nombre_2: string;

    @Column()
    apellido_1: string;

    @Column()
    apellido_2: string;

    // Solicitud
    @ManyToMany(() => Solicitud, (solicitud) => solicitud.solicitantes)
    solicitudes: Solicitud[];

    // Categoria
    @OneToOne(() => Categoria, (categoria) => categoria.solicitante)
    @JoinColumn()
    categoria: Categoria;

    // Estado_solicitud
    @OneToOne(() => EstadoSolicitud, (estadoSolicitud) => estadoSolicitud.solicitante)
    @JoinColumn()
    estadoSolicitud: EstadoSolicitud;
}