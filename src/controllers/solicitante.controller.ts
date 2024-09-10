import { Request, Response } from "express"
import { Solicitante } from "../entities/solicitante"
import { Categoria } from "../entities/categoria"
import { EstadoSolicitud } from "../entities/estadoSolicitud"


export const crearSolicitante = async (req: Request, res: Response) => {
    try {
        const { nombre_1, nombre_2, apellido_1, apellido_2,categoriaId,estadoSolicitudId } = req.body

         // Busca la categoría por ID
         const categoria = await Categoria.findOneBy({ id: categoriaId });
         if (!categoria) {
             return res.status(404).json({ message: "Categoria no encontrada" });
         }


          // Busca el estado de solicitud por ID
        const estadoSolicitud = await EstadoSolicitud.findOneBy({ id: estadoSolicitudId });
        if (!estadoSolicitud) {
            return res.status(404).json({ message: "Estado de solicitud no encontrado" });
        }

        const solicitante = new Solicitante()

        solicitante.nombre_1 = nombre_1
        solicitante.nombre_2 = nombre_2
        solicitante.apellido_1 = apellido_1
        solicitante.apellido_2 = apellido_2
        solicitante.categoria = categoria; // Asigna la categoría al solicitante
        solicitante.estadoSolicitud = estadoSolicitud; // Asigna el estado de solicitud al solicitante


        await solicitante.save()
        return res.json(solicitante)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }
}

export const getSolicitantes = async (req: Request, res: Response) => {
    try {
        const solicitante = await Solicitante.find()
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

        const solicitante = await Solicitante.findOneBy({ id: parseInt(id) });
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

        const result = await Solicitante.delete({ id: parseInt(id) })
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
        const solicitante = await Solicitante.findOneBy({ id: parseInt(id) })
        return res.json(solicitante)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }
}