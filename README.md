Express API with Error Handling

This project sets up an Express.js application with basic routes for handling reservations. 
It demonstrates error handling using both callback-based error handling and promise-based error handling.


API Endpoints
POST /reserve
Description: This route is responsible for creating a reservation. It uses the createReservation function (which simulates a callback-based async process) to create a new reservation.
Request Body:
The request body should be a JSON object with reservation details (e.g., name, date, etc.).
Response:
On success, returns a 201 status with the message "Reservation successful" and the reservation data.
On error, returns a 500 status with the error message.

GET /reservation/:id
Description: This route retrieves a reservation by its id. It uses the getReservation function (which simulates a promise-based async process).
Response:
On success, returns a 200 status with the message "Reservation found" and the reservation data.
On error, returns a 500 status with the error message.

GET /broken-route
Description: This is a sample route to demonstrate error handling in Express. It manually triggers an error to show how the error-handling middleware works.
Response:
It triggers an error with a custom message ("This route is broken on purpose!") and returns a 500 error with the message "Something went wrong with the server!".
Error Handling
1. Callback Error Handling (for /reserve):

The createReservation function simulates a reservation creation process with a random chance of failure. The function uses a callback pattern to handle success or failure:

If there's an error (e.g., a "Database error"), it calls the callback with the error message.
If successful, it returns the reservation data.
The route /reserve uses this function and sends the response accordingly:

If an error occurs, the server responds with a 500 status and an error message.
If successful, the server responds with a 201 status and reservation data.
2. Promise-based Error Handling (for /reservation/:id):

The getReservation function simulates fetching a reservation by id using Promises.

It has a random chance of failing with an error message.
On success, it returns the reservation data.
The route /reservation/:id handles this with async/await:

If the promise resolves, the server sends the reservation data back with a 200 status.
If the promise is rejected (due to an error), the server sends a 500 error.
3. Express Error-Handling Middleware:

Express has built-in support for error handling using middleware. In this app, two error-handling middlewares are used:

The first one catches any errors that happen during route execution and sends a generic error message.
The second one specifically checks if the error message contains the word "Database." If it does, it returns a custom message about the database error. Otherwise, it returns a generic server error.
Code Walkthrough
Dependencies:
The express module is required to set up the server and define routes.
Routes:
/reserve: Uses createReservation with a callback to simulate reservation creation. The success or error response depends on the callback result.
/reservation/:id: Uses getReservation with a promise. It fetches a reservation by id and responds accordingly.
/broken-route: Simulates an error for testing the error-handling middleware.
Error Handling:
Two error-handling middlewares are implemented to catch and process errors in the routes. The second middleware also distinguishes between different error types (e.g., "Database" errors).
Server:
The server listens on port 3000.
Example of Error Flow:
If a request to /reservation/:id fails due to a database error, the following steps occur:

The promise in getReservation is rejected.
The error is caught by the catch block in the route handler.
The error is passed to the error-handling middleware via next(error).
The error-handling middleware sends a 500 response with the appropriate error message.
Final Notes
This app demonstrates two approaches to handling asynchronous operations and errors in Node.js: callbacks (for createReservation) and promises (for getReservation). Express is used to handle API routes, with error-handling middleware ensuring graceful error responses.

