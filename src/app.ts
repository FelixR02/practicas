import express from "express"
import morgan from "morgan"
import cors from "cors"
import areaRouter from "./routes/areaRoutes"
import carreraRouter from "./routes/carreraRoutes"
import categoriaRouter from "./routes/categoriaRoutes"
import departamentoRouter from "./routes/departamentoRoutes"
import responsableRoutes from "./routes/responsableRoutes"
import solicitudRoutes from "./routes/solicitudRoutes"
import ladpRoutes from"./routes/ldapRoutes"
import { LDAPConnection } from "./ldap_conected"
import dotenv from 'dotenv';
dotenv.config();

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

//Aqui van las entidades
app.use(areaRouter)
app.use(carreraRouter)
app.use(categoriaRouter)
app.use(departamentoRouter)
app.use(responsableRoutes)
app.use(solicitudRoutes)
app.use(ladpRoutes)
app.post("/ldap/connect",LDAPConnection)


export default app
