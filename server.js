//importing our dependencies

const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');

//cors and ejs

//configure environment variables
dotenv.config();



//create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// use the object itself to test if the connection works
db.connect((err) => {
    //if the connection is not successful
    if (err) {
        return console.error('Error connecting to the database:', err);
    }
    //if connection was successful
    console.log('Successfully connected to the database', db.threadId);
})


//basic endpoint to say hello world
// app.get('',(req,res)=>{
//     res.send('Hello World, its sesugh on the console get ready for me!');
// })


app.set('view engine','ejs');
app.set('views', __dirname + '/views');

//retrieve all patients
app.get('',(req,res)=>{
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients"
    db.query(getPatients,(err,data)=>{
        //if there is an error
        if(err){
            return res.status(400).send("failed to get patients",err)
        }
        res.status(200).render('data', {data})
    })
})


//retrieve all providers
app.get('',(req,res)=>{
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers"
    db.query(getProviders,(err,data)=>{
        //if there is an error
        if(err){
            return res.status(400).send("failed to get providers",err)
        }
        res.status(200).render('providerData', {data})
    })
})

//Retrieve all providers by their specialty
app.get('',(req,res)=>{
    const getProviderSpecialty = "SELECT * FROM providers WHERE provider_speciaty = 'pediatrics'"
    db.query(getProviderSpecialty,(err,data)=>{
        //if there is an error
        if(err){
            return res.status(400).send("failed to get provider speciaty",err)
        }
        res.status(200).render('providerSpeciaty', {data})
    })
})

//Filter patients by First Name
app.get('',(req,res)=>{
    const getFirstname = "SELECT * FROM Patients WHERE first_name = 'john'"
    db.query(getFirstname,(err,data)=>{
        //if there is an error
        if(err){
            return res.status(400).send('failed to get firstnames')
        }
        res.status(200).render('firstName',{data})
    })
})

//start and listen to the server
app.listen(3300,()=>{
    console.log('server is running on port 3300...');
})