// const express= require('express') ,Normally done like this.Can also be done the below way
import express from 'express'  //"type":"module", <- Need to use that in package.json(used to enable the import modules)
import path, { dirname } from 'path' //this and the below one
import { fileURLToPath } from 'url'  // enable our js server.js files look for the html,css files and get a response
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'

const app = express()
const PORT = process.env.PORT || 5003   //(5003 is a backup) (process.env.PORT-This accesses the PORT environment variable from your system.It’s commonly used in web servers to let the system (or platform) decide which port your app should run on.)

//Get file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url)
//Get the directory name from the file path
const __dirname = dirname(__filename)


//Middleware
app.use(express.json())  //is ready to accept json requests

//Serves the html file from the public directory and also tells express to serve all files from the public folder as static files.Any requests for the CSS files will be resolved to the public directory.
app.use(express.static(path.join(__dirname, '../public')))


//Seving up the html file from /public directory
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'public','index.html'))  //to send the html fle(joins the cur dir along with, public folder, file name)
})


//Routes
app.use('/auth',authRoutes)  //for any /auth path use authRoutes
app.use('/todos',authMiddleware, todoRoutes)

app.listen(PORT , () =>{
    console.log(`Server has started on port: ${PORT}`)
})

