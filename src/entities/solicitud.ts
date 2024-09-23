// src/entities/solicitud.ts
import { BaseEntity, Column, CreateDateColumn, ManyToOne, JoinColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Responsable } from "./responsable";
import { Solicitante } from "./solicitante";

@Entity()
export class Solicitud extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fundamentacion: string;

    @CreateDateColumn()
    creado: Date;

    @UpdateDateColumn()
    actualizado: Date;

    // Responsable
    @ManyToOne(() => Responsable, responsable => responsable.solicitudes)
    @JoinColumn({ name: "responsableId" })
    responsable: Responsable;

    @Column()
    responsableId: number;

    // Solicitante
    @ManyToMany(() => Solicitante, (solicitante) => solicitante.solicitudes)
    @JoinTable({
        name: "solicitud_solicitantes_solicitante",
        joinColumn: {
            name: "solicitudId",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "solicitanteId",
            referencedColumnName: "id"
        }
    })
    solicitantes: Solicitante[];
}