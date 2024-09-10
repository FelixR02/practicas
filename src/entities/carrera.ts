import { BaseEntity, Column, CreateDateColumn, ManyToOne, JoinColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Departamento } from "./departamento";

@Entity()
export class Carrera extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cantidadAnho: number;

    @Column()
    nombre: string;

    @Column()
    modalidad: string;

    @CreateDateColumn()
    creado: Date;

    @UpdateDateColumn()
    actualizado: Date;

    // Departamento
    @ManyToOne(() => Departamento, departamento => departamento.carreras)
    @JoinColumn({ name: "departamentoId" })  // Especifica la columna de la clave foránea
    departamento: Departamento;

    @Column()
    departamentoId: number;  // Columna explícita para la clave foránea
}