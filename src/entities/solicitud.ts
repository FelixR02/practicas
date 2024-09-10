import { BaseEntity, Column, CreateDateColumn, ManyToOne, JoinColumn,  Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, JoinTable} from "typeorm";
import { Responsable } from "./responsable";
import { Solicitante } from "./solicitante";

@Entity()
export class Solicitud extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    fundamentacion: string
    @CreateDateColumn()
    creado: Date
    @UpdateDateColumn()
    actualizado: Date

    //Responsable
    @ManyToOne(() => Responsable, responsable => responsable.solicitudes)
    @JoinColumn({ name: "responsableId" })  // Especifica la columna de la clave foránea
    responsable: Responsable;

    @Column()
    responsableId: number;  // Columna explícita para la clave foránea

    //Solicitante
    @ManyToMany(() => Solicitante, (solicitante) => solicitante.solicitudes)
    @JoinTable()
    solicitantes: Solicitante[];
}