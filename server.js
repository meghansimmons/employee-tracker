require('dotenv').config()

const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    user: 'root',
    password: process.env.password,
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

