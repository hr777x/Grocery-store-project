
const Category = require('../models/categoryModel');


const getAllCategories = (req, res) => {
    try {
        const categories = Category.getAllCategories(); 
        res.json(categories); 
    } catch (error) {
        console.error('Error retrieving categories:', error.message);
        res.status(500).json({ message: 'Error retrieving categories', error: error.message });
    }
};


const getCategoryById = (req, res) => {
    const { id } = req.params;
    try {
        const category = Category.getCategoryById(id); 
        if (category) {
            res.json(category); 
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        console.error('Error retrieving category by ID:', error.message);
        res.status(500).json({ message: 'Error retrieving category', error: error.message });
    }
};


const createCategory = (req, res) => {
    const { name, priority } = req.body;
    try {
        Category.createCategory(name, priority);
        res.status(201).json({ message: 'Category created successfully' });
    } catch (error) {
        console.error('Error creating category:', error.message);
        res.status(500).json({ message: 'Error creating category', error: error.message });
    }
};

const updateCategory = (req, res) => {
    const { id } = req.params;
    const { name, priority } = req.body;
    try {
        const result = Category.updateCategory(id, name, priority); 
        if (result.changes > 0) {
            res.json({ message: 'Category updated successfully' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        console.error('Error updating category:', error.message);
        res.status(500).json({ message: 'Error updating category', error: error.message });
    }
};


const deleteCategory = (req, res) => {
    const { id } = req.params;
    try {
        const result = Category.deleteCategory(id);
        if (result.changes > 0) {
            res.json({ message: 'Category deleted successfully' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        console.error('Error deleting category:', error.message);
        res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
