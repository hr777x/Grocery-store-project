const express = require('express');
const path = require('path');
const { db, executeScript, runQuery } = require('./db'); 
const productRoutes = require('./routes/productRoutes'); 
const categoryRoutes = require('./routes/categoryRoutes'); 


const app = express();
const PORT = 3000;

app.use(express.json()); 
app.use('/api', productRoutes); 
app.use('/api', categoryRoutes); 



app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

(async () => {
  try {
    console.log('Initializing the database...');
    await executeScript('./Milestone4/create_tables.sql'); 
    console.log('Tables created successfully.');

    await executeScript('./Milestone4/insert_categories.sql');
    console.log('Categories inserted successfully.');

    await executeScript('./Milestone4/insert_products.sql');
    console.log('Products inserted successfully.');

   
    const users = await runQuery('SELECT * FROM users;');
    console.log('Users:', users);
  } catch (err) {
    console.error('Error during database initialization:', err.message);
  }
})();

app.get('/api/test', (req, res) => {
  res.send('Server is running!');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
