import express from "express";
import { getReservation, createReservation } from "./database.js";

const app = express();
const PORT = 3000;
app.use(express.json());

//createReservation and handles any errors it returns
app.post('/reserve', (req, res) => {
    createReservation(req.body, (error, result) => {
        if(error) {
            return res.status(500).json({message: error});
        }
        res.status(201).json({message: 'Reservation successful', data: result})
    });
});

//create a new route (/reservation/:id) that calls getReservation and handles any promise errors. 
// app.get("/reservation/:id", (req, res) => {
//     getReservation(req.params.id)
//         .then(reservation => {
//             console.log(reservation);
//         })
//         .catch(error => {
//             console.error("Oh no", error );
//         });
// });


//Update the /reservation/:id route to use async/await syntax instead of .then and .catch. 
app.get("/reservation/:id", async (req, res) => {
    try {
        const result = await getReservation(req.params.id);
        res.status(200).json({message: "Reservation found", data: result});
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// Express Error-Handling Middleware
app.use((error, req, res, next) => {
    console.error("Error", error.message)
    res.status(500).json({message: "Ops, something went wrong"})
})

//Routes to call next(error) instead of sending a response directly
app.get("/broken-route", (req, res, next) => {
    const error = new Error ("This route is broken on purpose!")
    next(error)
});

//Sending Error Responses in APIs
app.use((error, req, res, next) => {
    console.error('Error: ',error.message || error);
    if(error.message && error.message.includes('Database')) {
        res.status(500).json({message: 'There was an issue with the database!'})
    } else {
        res.status(500).json({message: "Something went wrong with the server!"})
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});