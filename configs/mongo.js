import mongoose, { disconnect } from 'mongoose'

export const connect = async()=>{
    try{
        console.log("MongoDB:")
        mongoose.connection.on('error', ()=>{
            console.log('-> Could not be connect to mongodb')
        })
        mongoose.connection.on('connecting', ()=>{
            console.log('-> Conecting to MongoDB services.')
        })
        mongoose.connection.on('connected', ()=>{
            console.log('-> Succesfully connected to MongoDB.')
        })
        mongoose.connection.once('open', ()=>{
            console.log(`-> Succesfully connected to database: ${process.env.DB_NAME}.`)
        })
        mongoose.connection.on('reconnected', ()=>{
            console.log('-> Succesfully reconnected to mongodb.')
        })
        mongoose.connection.on('disconnected', ()=>{
            console.log('-> Disconnected from MongoDB services.')
        })

        await mongoose.connect(
            `${process.env.DB_SERVICE}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
            {
                maxPoolSize: 50,
                serverSelectionTimeoutMS: 5000 
            }
        )

    }catch(err){
        console.error('MongoDB \n-> General error on trying connecting to database', err)
    }
}