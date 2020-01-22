const router = require('express').Router(); //Need the express router, because this is a route we are creating
let User = require('../models/user.model'); // This is the mongoose model that we made (Schema)

router.route('/').get((request, response) => {      //This route would be localhost:5000/users/ get request. 
                                                    //The '/' is referencing the slash at the end of the url
    User.find().then(users => response.json(users)) //User.find is a mongoose method, getting all the users from the mongoDataBase and return a promise
                .catch(error => { response.status(400).json("Error: " + error)}) //This will catch errors
});

router.route('/add').post((request, response) => { //This route is to add a new user
    const username = request.body.username; 

    const newUser = new User({username}); //Creates a new instance of user, using the username

    newUser.save()                         //New user is saved to the database. This returns a promise
        .then(() => {response.json('User Added!') }) //Then returns "User added"
        .catch(error => { response.status(400).json("Error: " + error)})
})

module.exports = router; // Exporting the router we have created