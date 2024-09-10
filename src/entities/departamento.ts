import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Area } from "./area";
import { Carrera } from "./carrera";
import { Responsable } from "./responsable";

@Entity()
export class Departamento extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @CreateDateColumn()
    creado: Date;

    @UpdateDateColumn()
    actualizado: Date;

    // Area
    @ManyToOne(() => Area, area => area.departamentos)
    @JoinColumn()  // Especifica la columna de la clave foránea
    area: Area;

    // Carrera
    @OneToMany(() => Carrera, carrera => carrera.departamento)
    carreras: Carrera[];

    // Responsable
    @OneToMany(() => Responsable, responsable => responsable.departamento)
    responsables: Responsable[];
}