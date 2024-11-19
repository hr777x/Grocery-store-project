# Online Products Project

This is a full-stack project to manage products using Node.js, Express.js, and SQLite.

## Features

- Backend API to manage products.
- SQLite database integration.
- Static frontend served from `public/`.

---

## Requirements

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [SQLite](https://sqlite.org/)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JunaidRustam/online-products.git
   cd online-products
   ```
   npm install

Run the following SQL scripts in the Milestone4 folder:

sqlite3 Milestone4/my_database.db < Milestone4/drop_tables.sql
sqlite3 Milestone4/my_database.db < Milestone4/create_tables.sql
sqlite3 Milestone4/my_database.db < Milestone4/insert_categories.sql
sqlite3 Milestone4/my_database.db < Milestone4/insert_products.sql

//to run the application

node server.js

Feel free to submit issues or pull requests for improvements.
