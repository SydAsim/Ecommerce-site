import mongoose from "mongoose";
import { DB_NAME } from "../src/constants.js"
import connectdb  from "../src/infrastructure/config/database.js"

import dotenv from "dotenv"

dotenv.config({
    path:'./env'
})

connectdb()