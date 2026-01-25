/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server: Server;


const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL)
        console.log("connected to DB");

        server = app.listen(parseInt(envVars.PORT), () => {
            console.log("Server is listening on port : ", parseInt(envVars.PORT))
        });


    } catch (error) {
        console.log(error);

    }

}

(async () => {
    await startServer();
    await seedSuperAdmin();
})()


