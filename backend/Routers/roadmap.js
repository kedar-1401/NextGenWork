const express = require("express")

const router = express.Router() ;
const { getAccessToRoute } = require("../Middlewares/Authorization/auth");

const {generateRoadmap}=require("../Controllers/roadmap")
router.post("/generateRoadmap",getAccessToRoute,generateRoadmap)

module.exports = router