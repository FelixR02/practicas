import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { Solicitante } from "./solicitante";

@Entity()
export class Categoria extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column({
        default: false
    })
    estudiante: boolean
    @Column({
        default: false
    })
    docente: boolean
    @Column({
        default: false
    })
    noDocente: boolean
    


    //Solicitante
    @OneToOne(() => Solicitante, (solicitante) => solicitante.categoria)
    solicitante:Solicitante;
}