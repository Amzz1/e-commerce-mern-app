
// product routes
import express from 'express'
import {createProduct,updateProduct, deleteProduct, getProduct,getCategory, getAllProduct} from "../controllers/product.js"
const router = express.Router()

router.post('/',createProduct)
router.get('/:id',getProduct)
router.get('/category/:name',getCategory)
router.get('/',getAllProduct)
router.put('/:id',updateProduct)
router.delete('/:id',deleteProduct)
export default router
