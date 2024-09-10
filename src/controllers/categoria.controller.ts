import { Request, Response } from "express"
import { Categoria } from "../entities/categoria"


export const crearCategoria = async (req: Request, res: Response) => {
    try {
        const { estudiante, docente, noDocente } = req.body
        const categoria = new Categoria()

        categoria.estudiante = estudiante
        categoria.docente = docente
        categoria.noDocente = noDocente

        await categoria.save()
        return res.json(categoria)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }
}

export const getCategorias = async (req: Request, res: Response) => {
    try {
        const categorias = await  Categoria.find()
        return res.json(categorias)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }

}
export const updateCategorias = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const  categorias = await Categoria.findOneBy({ id: parseInt(req.params.id) })
        if (!categorias)
            return res.status(404).json({ message: "No existe la categoria" })

        await  Categoria.update({ id: parseInt(id) }, req.body)

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }
}
export const deleteCategoria = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const result = await Categoria.delete({ id: parseInt(id) })
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
        const categoria = await Categoria.findOneBy({ id: parseInt(id) })
        return res.json(categoria)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }
}