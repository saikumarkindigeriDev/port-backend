const express = require("express")
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());

require('dotenv').config()

app.use(express.urlencoded({extended: false}))
app.use(express.json())



const mysql = require('mysql2')

const pool = mysql.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, conn) => {
    if(err) console.log(err)
    console.log("Connected successfully")
})

app.get("/",(req,res)=>{
    res.send("Hi Sai")
})


app.post("/client",(req,res)=>{ 
    const {name,email,phone,message}=req.body 
    const values=[name,email,phone,message]

    
    pool.query(`INSERT INTO customers (name,email,phone,message) values(?,?,?,?)`,values,(err,data)=>{
        if (err){
            return res.json("Form failed to Submit!")
            console.log(err)
        }
        console.log("Form Submitted Successfully.")
        return res.json("Thank You for getting in Touch.")
    })

})



const PORT = process.env.PORT || 7000

app.listen(PORT, () => {
    console.log("Server is running....")
})