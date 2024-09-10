import { Request, Response } from "express"
import { Departamento } from "../entities/departamento"
import { Area } from "../entities/area";


export const crearDepartamento = async (req: Request, res: Response) => {
    try {
        const { nombre, areaId } = req.body;

        // Validar que el areaId exista
        const area = await Area.findOne({ where: { id: areaId } });
        if (!area) {
            return res.status(404).json({ message: 'Area no encontrada' });
        }

        const departamento = new Departamento();
        departamento.nombre = nombre;
        departamento.area = area; // Asignar la relación con el área
        await departamento.save();

        return res.json(departamento);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const getDepartamentos = async (req: Request, res: Response) => {
    try {
        const departamentos = await Departamento.find()
        return res.json(departamentos)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }

}
export const updateDepartamentos = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const departamento = await Departamento.findOneBy({ id: parseInt(req.params.id) })
        if (!departamento)
            return res.status(404).json({ message: "No existe el departamento" })

        await Departamento.update({ id: parseInt(id) }, req.body)

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }
}
export const deleteDepartamentos = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const result = await Departamento.delete({ id: parseInt(id) })
        if (result.affected === 0)
            return res.status(404).json("El departarmento no existe")

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }

}

export const getDepartamento = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const departamento = await Departamento.findOneBy({ id: parseInt(id) })
        return res.json(departamento)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }
}
