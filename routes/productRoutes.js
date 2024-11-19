const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, updateProduct,getProductById, deleteProduct, upload } = require('../controllers/productController');


router.get('/products', getAllProducts); 
router.get('/products/:id', getProductById); 
router.post('/products', upload.single('productImage'), createProduct); 
router.put('/products/:id', upload.single('productImage'), updateProduct); 
router.delete('/products/:id', deleteProduct);

module.exports = router;
