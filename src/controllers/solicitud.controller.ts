import { Request, Response } from "express"
import { Solicitud } from "../entities/solicitud"
import { Categoria } from "../entities/categoria"
import { Responsable } from "../entities/responsable"



export const crearSolicitante = async (req: Request, res: Response) => {
    try {
        const { nombre_1, nombre_2, apellido_1, apellido_2, categoriaId,responsableId } = req.body

        // Busca la categoría por ID
        const categoria = await Categoria.findOneBy({ id: categoriaId });
        if (!categoria) {
            return res.status(404).json({ message: "Categoria no encontrada" });
        }

        const responsable = await Responsable.findOneBy({ id: responsableId });
        if (!responsable) {
            return res.status(404).json({ message: "Responsbale no encontrado" });
        }




        const solicitud = new Solicitud()

        solicitud.nombre_1 = nombre_1
        solicitud.nombre_2 = nombre_2
        solicitud.apellido_1 = apellido_1
        solicitud.apellido_2 = apellido_2
        solicitud.categoria = categoria; // Asigna la categoría al solicitante
        solicitud.responsable= responsable;


        await solicitud.save()
        return res.json(solicitud)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }
}

export const getSolicitantes = async (req: Request, res: Response) => {
    try {
        const solicitante = await Solicitud.find()
        return res.json(solicitante)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }

}
export const updateSolicitante = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombre_1, nombre_2, apellido_1, apellido_2, categoriaId } = req.body;

        const solicitante = await Solicitud.findOneBy({ id: parseInt(id) });
        if (!solicitante) {
            return res.status(404).json({ message: "No existe el solicitante" });
        }

        if (nombre_1) solicitante.nombre_1 = nombre_1;
        if (nombre_2) solicitante.nombre_2 = nombre_2;
        if (apellido_1) solicitante.apellido_1 = apellido_1;
        if (apellido_2) solicitante.apellido_2 = apellido_2;
        if (categoriaId) {
            const categoria = await Categoria.findOneBy({ id: categoriaId });
            if (categoria) {
                solicitante.categoria = categoria;
            } else {
                return res.status(404).json({ message: "No existe la categoria" });
            }
        }

        await solicitante.save();
        return res.sendStatus(204);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const deleteSolicitante = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const result = await Solicitud.delete({ id: parseInt(id) })
        if (result.affected === 0)
            return res.status(404).json("El responsable no existe")

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }

}

export const getSolicitante = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const solicitante = await Solicitud.findOneBy({ id: parseInt(id) })
        return res.json(solicitante)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }
}
