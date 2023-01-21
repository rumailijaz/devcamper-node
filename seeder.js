const fs= require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

// load env variables
dotenv.config({path:'./config/config.env'})

// load modal
const Bootcamp= require('./model/bootcamp')

// connect db
// mongoose.connect(process.env.MONGO_URI)

const connectDB = require('./config/db')
connectDB()

// Read JSON Files
const bootcamp = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))


// Import  into DB
const importData = async () => {
    try
    {
        await Bootcamp.create(bootcamp)
        console.log('Data imported........')
        process.exit(1)
    }
    catch (err)
    {
        console.log(err)
    }
 }

 const deleteData = async () => {
    try
    {
        await Bootcamp.deleteMany()
        console.log('Data Destroyed........'.red.inverse)
    }
    catch (err)
    {
        console.log(err)
    }
 }
 
 
 console.log(process.argv,'process');

 if (process.argv[2] === '-i')
{
   importData()
   console.log(process.argv,'process');
}
else if (process.argv[2] === '-d')
{
   deleteData()
}

