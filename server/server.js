const express = require('express')
const app = express()
const cors = require("cors")
const mongoose = require('mongoose')
const logger = require('morgan') //<= logging middleware (logs HTTP requests in console)
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const recipeRoutes = require('./routes/recipes')
const authenticateToken = require('./middleware/auth.js')

// .env config
require('dotenv').config({ path: './config/.env' })


connectDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors());
app.use(logger('dev'))

//Routes
app.use('/', mainRoutes)
app.use('/recipes',authenticateToken, recipeRoutes)



app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
}) 

