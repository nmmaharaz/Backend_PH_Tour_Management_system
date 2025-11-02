/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";



let server: Server;

const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL)

        console.log("Database connected");

        server = app.listen(envVars.PORT, () => {
            console.log(`Server is running on port ${envVars.PORT}`);
        })
    } catch (err) {
        console.error("Error starting server:", err);
    }
}

(async()=>{
    await startServer()
    await seedSuperAdmin()
})()


process.on("SIGTERM", (err)=>{
    console.error("SIGTERM signal recived **** server Shutting down:", err);
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})


process.on("unhandledRejection", (err)=>{
    console.error("Unhandled Rejection:", err);
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})