import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import {SHAPES} from "../src/models/diamond.model";
import RapSheet from "../src/models/rapSheet.model";
import defaultRapSheet from "../src/seeds/data/defaultRapSheet";

let mongo:any = null

const createConnection = async ()=>{
    mongo = await MongoMemoryServer.create();
    await mongoose.connect(mongo.getUri(), { dbName: "test" })

    // Load default data
    const shapeName = Object.keys(SHAPES)[0]
    await RapSheet.insertMany(defaultRapSheet(shapeName))
}

const closeConnection = async ()=>{
    await RapSheet.deleteMany({ reportIdentifier: 'default' })
    await mongo.stop();
}

export { createConnection, closeConnection }
