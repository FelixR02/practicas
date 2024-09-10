import { Request, Response } from "express"
import { Responsable } from "../entities/responsable"
import { Departamento } from "../entities/departamento";
import { Area } from "../entities/area";


export const crearResponsable = async (req: Request, res: Response) => {
    try {
        const { nombre, apellidos, nombreUsuario, email, areaId, departamentoId } = req.body;

        // Validar que el areaId exista
        const area = await Area.findOne({ where: { id: areaId } });
        if (!area) {
            return res.status(404).json({ message: 'Area no encontrada' });
        }

        // Validar que el departamentoId exista
        const departamento = await Departamento.findOne({ where: { id: departamentoId } });
        if (!departamento) {
            return res.status(404).json({ message: 'Departamento no encontrado' });
        }

        const responsable = new Responsable();
        responsable.nombre = nombre;
        responsable.apellidos = apellidos;
        responsable.nombreUsuario = nombreUsuario;
        responsable.email = email;
        responsable.area = area; // Asignar la relación con el área
        responsable.areaId = areaId; // Asignar el ID del área
        responsable.departamento = departamento; // Asignar la relación con el departamento
        responsable.departamentoId = departamentoId; // Asignar el ID del departamento

        await responsable.save();

        return res.json(responsable);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const getResponsables = async (req: Request, res: Response) => {
    try {
        const responsable = await Responsable.find()
        return res.json(responsable)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }

}
export const updateResponsable = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const responsable = await Responsable.findOneBy({ id: parseInt(req.params.id) })
        if (!responsable)
            return res.status(404).json({ message: "No existe el responsable" })

        await Responsable.update({ id: parseInt(id) }, req.body)

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }
}
export const deleteResponsable = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const result = await Responsable.delete({ id: parseInt(id) })
        if (result.affected === 0)
            return res.status(404).json("El responsable no existe")

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }

}

export const getResponsable = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const responsable = await Responsable.findOneBy({ id: parseInt(id) })
        return res.json(responsable)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }
}