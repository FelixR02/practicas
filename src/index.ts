import "reflect-metadata"
import app from "./app"
import { AppDataSource } from "./db"
import { LDAPConnection } from "./ldap_conected"

async function main(){
    try {
        await AppDataSource.initialize()
        console.log("Conectado a la BD")
        app.listen(3000)
        console.log("El servidor está corriendo en el puerto",3000)
       
    } catch (error) {
        console.error(error)
    }
}

main()