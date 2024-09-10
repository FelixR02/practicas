import { Request, Response } from "express"
import { Solicitud } from "../entities/solicitud"


export const crearSolicitud = async (req: Request, res: Response) => {
    try {
        const { fundamentacion, responsableId, solicitantes } = req.body
        const solicitud = new Solicitud()

        solicitud.fundamentacion = fundamentacion
        solicitud.responsableId = responsableId;
        solicitud.solicitantes = solicitantes;

        await solicitud.save()
        return res.json(solicitud)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }
}

export const getSolicitudes = async (req: Request, res: Response) => {
    try {
        const s = await Solicitud.find()
        return res.json(s)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }

}
export const updateSolicitud = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const solicitud = await Solicitud.findOneBy({ id: parseInt(req.params.id) })
        if (!solicitud)
            return res.status(404).json({ message: "No existe el área" })

        await Solicitud.update({ id: parseInt(id) }, req.body)

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }
}
export const deleteSolicitud = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const result = await Solicitud.delete({ id: parseInt(id) })
        if (result.affected === 0)
            return res.status(404).json("La solicitud no existe")

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }

}

export const getSolicitud = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const s = await Solicitud.findOneBy({ id: parseInt(id) })
        return res.json(s)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }
}