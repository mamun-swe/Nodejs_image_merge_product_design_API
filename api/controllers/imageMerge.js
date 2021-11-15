const MergeImages = require("merge-images")
const { Canvas, Image } = require("canvas")
const fs = require("fs")
const base64ToImage = require('base64-to-image')

// Merge images
const Index = async (req, res, next) => {
    try {
        let uploaded
        const file1 = fs.readFileSync("files/body.png")
        const file2 = fs.readFileSync("files/head.png")
        const file3 = fs.readFileSync("files/left.png")
        const file4 = fs.readFileSync("files/right.png")

        const response = await MergeImages(
            [
                { src: file1, x: 0, y: 0 },
                { src: file2, x: 0, y: 0 },
                { src: file3, x: 0, y: 0 },
                { src: file4, x: 0, y: 0 }
            ],
            {
                Canvas: Canvas,
                Image: Image
            }
        )

        if (response) {
            var optionalObj = { 'fileName': Date.now(), 'type': 'png' };

            const result = await base64ToImage(response, "./files", optionalObj)
            if (result) uploaded = true
        }

        if (uploaded) {
            return res.status(200).json({
                message: "Uploaded"
            })
        }
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}


module.exports = {
    Index
}