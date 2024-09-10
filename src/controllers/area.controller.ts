import { Request, Response } from "express"
import { Area } from "../entities/area"


export const crearArea = async (req: Request, res: Response) => {
    try {
        const { nombre } = req.body
        const area = new Area()

        area.nombre = nombre

        await area.save()
        return res.json(area)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }
}

export const getAreas = async (req: Request, res: Response) => {
    try {
        const areas = await Area.find()
        return res.json(areas)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }

}
export const updateAreas = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const area = await Area.findOneBy({ id: parseInt(req.params.id) })
        if (!area)
            return res.status(404).json({ message: "No existe el área" })

        await Area.update({ id: parseInt(id) }, req.body)

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }
}
export const deleteAreas = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const result = await Area.delete({ id: parseInt(id) })
        if (result.affected === 0)
            return res.status(404).json("El área no existe")

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }

}

export const getArea = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const area = await Area.findOneBy({ id: parseInt(id) })
        return res.json(area)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }
}