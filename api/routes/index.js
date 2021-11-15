const express = require("express")
const Router = express.Router()
const MergeController = require("../controllers/imageMerge")

Router.post("/merge-images", MergeController.Index)

module.exports = Router 