const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const RouteV1 = require("./api/routes/index")

const app = express()
app.use(morgan('dev'))
app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/files', express.static('files/'))


// API URL's
app.use("/api/v1", RouteV1)

app.use((req, res, next) => {
    let error = new Error('404 page Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    if (error.status == 404) {
        return res.status(404).json({
            message: error.message
        })
    }
    if (error.status == 400) {
        return res.status(400).json({
            message: "Bad request"
        })
    }
    if (error.status == 401) {
        return res.status(401).json({
            message: "You have no permission"
        })
    }
    return res.status(500).json({
        message: "Internal Server Error"
    })
})



// App Port
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`App running on ${port} port`)
})
