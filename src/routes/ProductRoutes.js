const router = require("express").Router()
const productController = require("../controllers/ProductController")
const upload  = require("../middleware/UploadMiddleware")
const testMiddleware = require("../middleware/TestMiddleware")
router.get("/products",testMiddleware,productController.getAllProducts)
router.post("/product",upload.single("image"),productController.createProduct)
module.exports = router