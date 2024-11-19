const sqlite3 = require('better-sqlite3');
const db = new sqlite3('./my_database.db');


const getAllCategories = () => {
    return db.prepare('SELECT * FROM categories').all(); 
};


const getCategoryById = (id) => {
    return db.prepare('SELECT * FROM categories WHERE id = ?').get(id); 
};


const createCategory = (name, priority) => {
    const stmt = db.prepare('INSERT INTO categories (name, priority) VALUES (?, ?)');
    return stmt.run(name, priority); 
};


const updateCategory = (id, name, priority) => {
    const stmt = db.prepare('UPDATE categories SET name = ?, priority = ? WHERE id = ?');
    return stmt.run(name, priority, id); 
};


const deleteCategory = (id) => {
    const stmt = db.prepare('DELETE FROM categories WHERE id = ?');
    return stmt.run(id); 
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
