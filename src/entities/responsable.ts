import { BaseEntity, Column, CreateDateColumn, OneToMany, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Area } from "./area";
import { Solicitud } from "./solicitud";
import { Departamento } from "./departamento";

@Entity()
export class Responsable extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellidos: string;

    @Column()
    nombreUsuario: string;

    @Column()
    email: string;

    @CreateDateColumn()
    creado: Date;

    @UpdateDateColumn()
    actualizado: Date;

    // Area
    @ManyToOne(() => Area, area => area.responsable)
    @JoinColumn({ name: "areaId" })  // Especifica la columna de la clave foránea
    area: Area;

    @Column()
    areaId: number;  // Columna explícita para la clave foránea

    // Solicitud
    @OneToMany(() => Solicitud, solicitud => solicitud.responsable)
    solicitudes: Solicitud[];

    // Departamento
    @ManyToOne(() => Departamento, (departamento) => departamento.responsables)
    @JoinColumn({ name: "departamentoId" })  // Especifica la columna de la clave foránea
    departamento: Departamento;

    @Column()
    departamentoId: number;  // Columna explícita para la clave foránea
}