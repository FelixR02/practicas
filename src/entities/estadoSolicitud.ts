import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Solicitante } from "./solicitante";

@Entity()
export class EstadoSolicitud extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column({
        default: false
    })
    enviado: boolean
    @Column({
        default: false
    })
    recibido: boolean
    @Column({
        default: false
    })
    procesando: boolean
    @Column({
        default: false
    })
    aprobado: boolean

    @Column({
        default: false
    })
    rechazado: boolean

    @CreateDateColumn()
    creado: Date
    @UpdateDateColumn()
    actualizado: Date

    //Solicitante
    @OneToOne(() => Solicitante, (solicitante) => solicitante.estadoSolicitud)
    solicitante: Solicitante;
}