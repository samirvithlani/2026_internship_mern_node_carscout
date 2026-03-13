const router = require("express").Router()
const categoryController = require("../controllers/CategoryController")
router.post("/category",categoryController.createCategory)
router.get("/categories",categoryController.getAllCategories)
module.exports = router