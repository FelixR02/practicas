import { Request, Response } from "express"
import { EstadoSolicitud } from "../entities/estadoSolicitud"


export const crearEstadoSolicitud = async (req: Request, res: Response) => {
    try {
        const { enviado, recibido, procesado, aprobado, rechazado } = req.body
        const estadoSolicitud = new EstadoSolicitud()

        estadoSolicitud.enviado = enviado
        estadoSolicitud.recibido = recibido
        estadoSolicitud.procesando = procesado
        estadoSolicitud.aprobado = aprobado
        estadoSolicitud.rechazado = rechazado
        
        await estadoSolicitud.save()
        return res.json(estadoSolicitud)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }
}

export const getEstado = async (req: Request, res: Response) => {
    try {
        const estadoSolicitud = await  EstadoSolicitud.find()
        return res.json(estadoSolicitud)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }

}
export const updateEstado = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const  estadoSolicitud = await EstadoSolicitud.findOneBy({ id: parseInt(req.params.id) })
        if (!estadoSolicitud)
            return res.status(404).json({ message: "No existe la categoria" })

        await  EstadoSolicitud.update({ id: parseInt(id) }, req.body)

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }
}
export const deleteEstado = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const result = await EstadoSolicitud.delete({ id: parseInt(id) })
        if (result.affected === 0)
            return res.status(404).json("La categoria no existe")

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }

}

export const getCategoria = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const estadoSolicitud = await EstadoSolicitud.findOneBy({ id: parseInt(id) })
        return res.json(estadoSolicitud)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }
}