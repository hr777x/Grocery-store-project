const sqlite3 = require('better-sqlite3');
const db = new sqlite3('./my_database.db');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });


const getAllProducts = (req, res) => {
    try {
        const products = db.prepare('SELECT * FROM products').all();
        console.log('Products fetched from database:', products); 
        res.json(products); 
    } catch (error) {
        console.error('Error retrieving products:', error.message); 
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
};


const getProductById = (req, res) => {
    try {
        const { id } = req.params; 
        const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id); 

        if (product) {
            console.log('Product fetched:', product); 
            res.json(product); 
        } else {
            res.status(404).json({ message: 'Product not found' }); 
        }
    } catch (error) {
        console.error('Error retrieving product by ID:', error.message); 
        res.status(500).json({ message: 'Error retrieving product', error: error.message }); 
    }
};

const createProduct = (req, res) => {
    try {
        console.log(req.body); 
        const { name, price, category_id, description } = req.body;
        
        
        let image_url = null;
        if (req.file) {
           
            image_url = 'images/' + req.file.filename; 
        }

        
        const stmt = db.prepare('INSERT INTO products (name, price, category_id, description, image_url) VALUES (?, ?, ?, ?, ?)');
        stmt.run(name, price, category_id, description, image_url); 
        console.log('Product created:', { name, price, category_id, description, image_url }); 
        res.status(201).json({ message: 'Product created successfully', product: { name, price, category_id, description, image_url } });
    } catch (error) {
        console.error('Error creating product:', error.message); 
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};



const updateProduct = (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, category_id, description } = req.body;

        
        let query = 'UPDATE products SET name = ?, price = ?, category_id = ?, description = ?';
        let params = [name, price, category_id, description];
        console.log("file",req.file)
      
        if (req.file) {
            const image_url = 'images/' + req.file.filename;
            query += ', image_url = ?';
            console.log("imggg",image_url)
            params.push(image_url);
        }

        
        query += ' WHERE id = ?';
        params.push(id);

       
        const stmt = db.prepare(query);
        const result = stmt.run(...params); 

        if (result.changes > 0) {
            console.log('Product updated:', { id, name, price, category_id, description });
            res.json({ message: 'Product updated successfully', product: { id, name, price, category_id, description } });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};



const deleteProduct = (req, res) => {
    try {
        const { id } = req.params;
        const stmt = db.prepare('DELETE FROM products WHERE id = ?');
        const result = stmt.run(id); 

        if (result.changes > 0) {
            console.log('Product deleted:', { id }); 
            res.json({ message: 'Product deleted successfully', id });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error deleting product:', error.message); 
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct,getProductById, upload };
