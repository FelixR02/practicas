import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Solicitud } from "./solicitud";

@Entity()
export class Categoria extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
   


    //Solicitante
    @OneToMany(() => Solicitud, (solicitud) => solicitud.categoria)
    solicitud:Solicitud;
}