import mongoose from "mongoose";
import config from "../config/config";
import defaultRapSheet from './data/defaultRapSheet'
import generateDiamonds from './data/defaultDiamonds'
import RapSheet from "../models/rapSheet.model";
import {Diamond, SHAPES} from "../models/diamond.model";

const start = async () =>{
    await mongoose.connect(config.mongoose.url)

    try {
        await RapSheet.deleteMany({ reportIdentifier: 'default' })
        await Object.keys(SHAPES).forEach((shapeName:string)=>{
             RapSheet.insertMany(defaultRapSheet(shapeName))
        })

        await Diamond.deleteMany()
        const diamonds = await generateDiamonds()
        await Diamond.insertMany(diamonds)
    } catch (e) {
        console.log(`Something went wrong, ${(e as Error).message}`)
        console.log((e as Error).stack)
    } finally {
        await mongoose.disconnect()
    }
}
start().then(()=>{
    console.log("Seeds successfully loaded")
})



