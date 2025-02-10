import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');           
const bodyParser = require('body-parser'); // For parsing JSON in requests
const crypto = require('crypto');  // for password hashing
const session = require('express-session');

let globalUsername = null;

const app = express();
app.use(cors());

app.use(bodyParser.json()); // Enable parsing JSON body in POST requests
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const config = {
  host: 'xyz-db.c7c8vlx0uioi.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'adminpassword',
  database: 'WarehouseInventory',
  port: 3306
}; 
const pool = await mysql.createPool(config);

app.use(session({
    secret: 'very_bery_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

// Test route to check if the server is running
app.get('/', (req, res) => {
    return res.json("Hi, I am the backend");
    globalUsername = null;
});

app.post('/info', (req,res) =>{
    const {username} = req.body;
    if(!username){
        return res.status(400).send({status: 'failed'})
    }
    res.status(200).send({status: 'success'});

})

// Login API
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    console.log("Username:" + username);
    console.log("Password:" + password);

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    try {
        // Query to check the credentials in the database
        const connection = await pool.getConnection();
        const [rows] = await connection.query(
            'SELECT * FROM `dbo.User` WHERE Username = ?', [username]
        );
        connection.release();

        if (rows.length > 0) {
            const user = rows[0];

            // hash entered password with SHA2-256
            const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

            // Debugging: Log the hashed password and stored hash to compare
            // console.log("Entered Password (SHA256 Hash):", hashedPassword);
            //console.log("Stored Password Hash in DB:", user.PasswordHash);
            
            // Compare Entered Password with stored hashed password
            if (hashedPassword.toLowerCase() === user.PasswordHash.toLowerCase()) {
                globalUsername = username;
                req.session.user = { username, role: user.Role};
                console.log("Logged in as: " + globalUsername);
                // Login success
                res.json({ success: true, message: "Login successful" });
            } else {
                // Password Mismatch
                res.status(401).json({ success: false, message: "Invalid credentials" });

            }
        } else {
            // User not Found
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

app.get('/Users', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM `dbo.User`')
        connection.release();
        res.json(rows); // Send the records as JSON response
    } catch (err) {
        console.error('Error fetching Users:', err);
        res.status(500).json({ error: 'Internal Server Error' }); // Return error if query fails
    }
});

app.get('/Customer', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM `dbo.Customer`')
        connection.release();
        res.json(rows); // Send the records as JSON response
    } catch (err) {
        console.error('Error fetching Users:', err);
        res.status(500).json({ error: 'Internal Server Error' }); // Return error if query fails
    }
});

app.get('/Product', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM `dbo.Product`')
        connection.release();
        res.json(rows); // Send the records as JSON response
    } catch (err) {
        console.error('Error fetching Users:', err);
        res.status(500).json({ error: 'Internal Server Error' }); // Return error if query fails
    }
});

app.get('/ProductInventory', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM `dbo.ProductInventory`')
        connection.release();
        res.json(rows); // Send the records as JSON response
    } catch (err) {
        console.error('Error fetching Users:', err);
        res.status(500).json({ error: 'Internal Server Error' }); // Return error if query fails
    }
});

app.get('/SalesOrderDetail', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM `dbo.OrderDetails`')
        connection.release();
        res.json(rows); // Send the records as JSON response
    } catch (err) {
        console.error('Error fetching Users:', err);
        res.status(500).json({ error: 'Internal Server Error' }); // Return error if query fails
    }
});

//SQL ALTER TABLE query
app.post('/executeUpdate', async (req, res) => {
    if (!req.session.user) return res.status(401).json({ message: 'Unauthorized' });
    console.log(query);

    try {
        const { query, params } = req.body;
        const connection = await pool.getConnection();
        const [result] = await connection.query(query, params);
        connection.release();
        res.json({ message: 'Query executed successfully.', affectedRows: result.affectedRows });
    } catch (err) {
        console.error('SQL Execution Error:', err);
        res.status(500).json({ message: 'Error executing query.' });
    }
});

app.post('/executeInsert', async (req, res) => {
    if (!req.session.user) return res.status(401).json({ message: 'Unauthorized' });
    console.log(query);

    try {
        const { query, params } = req.body;
        const connection = await pool.getConnection();
        const [result] = await connection.query(query, params);
        connection.release();
        res.json({ message: 'Query executed successfully.', affectedRows: result.affectedRows });
    } catch (err) {
        console.error('SQL Execution Error:', err);
        res.status(500).json({ message: 'Error executing query.' });
    }
});

app.post('/executeDelete', async(req, res) => {
    if (!req.session.user) return res.status(401).json({ message: 'Unauthorized' });
    console.log(query);

    try {
        const { query, params } = req.body;
        const connection = await pool.getConnection();
        const [result] = await connection.query(query, params);
        connection.release();
        res.json({ message: 'Query executed successfully.', affectedRows: result.affectedRows });
    } catch (err) {
        console.error('SQL Execution Error:', err);
        res.status(500).json({ message: 'Error executing query.' });
    }
});


// Start the server
app.listen(3000, () => {
    console.log("The server is starting on Port 3000");
});


