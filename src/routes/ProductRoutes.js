const router = require("express").Router()
const productController = require("../controllers/ProductController")
const upload  = require("../middleware/UploadMiddleware")
const testMiddleware = require("../middleware/TestMiddleware")
const validateToken = require("../middleware/AuthMiddleware")
router.get("/products",validateToken,productController.getAllProducts)
router.get("/productBySellerId",validateToken,productController.getProductBySellerId)
router.post("/product",upload.single("image"),productController.createProduct)
module.exports = router