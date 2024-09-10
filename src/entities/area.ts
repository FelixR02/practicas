import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Departamento } from "./departamento";
import { Responsable } from "./responsable";

@Entity()
export class Area extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @CreateDateColumn()
    creado: Date;

    @UpdateDateColumn()
    actualizado: Date;

   //Departamento
    @OneToMany(() => Departamento, departamento => departamento.area)
    departamentos: Departamento[];

    //Responsable
    @OneToMany(() => Responsable, responsable => responsable.area)
    responsable: Responsable[];
}