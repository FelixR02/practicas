import { Request, Response } from "express"
import { Carrera } from "../entities/carrera"


export const crearCarrera = async (req: Request, res: Response) => {
    try {
        const { nombre,cantidadAnho, modalidad, departamentoId } = req.body
        const carrera = new Carrera()

        carrera.nombre = nombre
        carrera.cantidadAnho = cantidadAnho;
        carrera.modalidad = modalidad;
        carrera.departamentoId = departamentoId;

        await carrera.save()
        return res.json(carrera)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }
}

export const getCarreras = async (req: Request, res: Response) => {
    try {
        const carreras = await  Carrera.find()
        return res.json(carreras)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }

}
export const updateCarreras = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const  carreras = await Carrera.findOneBy({ id: parseInt(req.params.id) })
        if (!carreras)
            return res.status(404).json({ message: "No existe la carrera" })

        await  Carrera.update({ id: parseInt(id) }, req.body)

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }
}
export const deleteCarrera = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const result = await Carrera.delete({ id: parseInt(id) })
        if (result.affected === 0)
            return res.status(404).json("La carrera no existe")

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }

}

export const getCarrera = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const carrera = await Carrera.findOneBy({ id: parseInt(id) })
        return res.json(carrera)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }
}