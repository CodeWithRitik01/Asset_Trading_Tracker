import mongoose from "mongoose";

const connectDb = (uri) =>{
    mongoose
    .connect(uri, {dbName: "machine_task"})
    .then((data) => console.log(`connect to db: ${data.connection.host}`))
    .catch((err) => {
        console.log(err)
    })
}

export  {connectDb};