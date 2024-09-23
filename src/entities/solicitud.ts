// src/entities/solicitante.ts
import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "./categoria";
import { Responsable } from "./responsable";


@Entity()
export class Solicitud extends BaseEntity {
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

    @Column()
    fundamentacion: string;

    // Categoria
    @ManyToOne(() => Categoria, (categoria) => categoria.solicitud)
    @JoinColumn({ name: "categoriaId" })  // Especifica la columna de la clave foránea
    categoria: Categoria;
    
    @ManyToOne(() => Responsable, (responsable) => responsable.solicitudes)
    @JoinColumn({ name: "responsableId" })  // Especifica la columna de la clave foránea
    responsable: Responsable;
}