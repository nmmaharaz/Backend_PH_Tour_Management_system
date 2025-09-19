/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVers } from "./app/config/env";



let server: Server;

const startServer = async () => {
    try {
        await mongoose.connect(envVers.DB_URL)

        console.log("Database connected");

        server = app.listen(envVers.PORT, () => {
            console.log(`Server is running on port ${envVers.PORT}`);
        })
    } catch (err) {
        console.error("Error starting server:", err);
    }
}

startServer()


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