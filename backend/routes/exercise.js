const router = require("express").Router();
const Exercise = require('../models/exercise.model');

router.route('/').get((request, response) => {      //This route would be localhost:5000/Exercises/ get request. 
    //The '/' is referencing the slash at the end of the url
    Exercise.find().then(Exercises => response.json(Exercises)) //Exercise.find is a mongoose method, getting all the Exercises from the mongoDataBase and return a promise
        .catch(error => { response.status(400).json("Error: " + error) }) //This will catch errors
});

router.route('/add').post((request, response) => { //This route adds a new exercise (localhost:5000/exercise/add)
    const username = request.body.username; //Follows our schema in exercise.model.js
    const description = request.body.description
    const duration = Number(request.body.duration); //Converting the data into a number
    const date = Date.parse(request.body.date); //Converting the date to a date data type

    const newExercise = new Exercise({  //Putting all our varibales into a new Exercise instance
        username,
        description,
        duration,
        date
    })

    newExercise.save()  //Same as users.js save function
        .then(() => { response.json("Exercise added!") })
        .catch(error => { response.status(400).json("Error: " + error) })
});

router.route('/:id').get((request, response) => { //This is a get request for exercise by id. The notation /:id indicates a parameter
    Exercise.findById(request.params.id) //Exercise.findById is using the id parameter mentioned above
        .then((exercise) => response.json(exercise))
        .catch((error) => response.status(400).json("Error: " + error));
})

router.route('/:id').delete((request, response) => { //This deletes an entry, basically the same as above otherwise
    Exercise.findByIdAndDelete(request.params.id)
        .then(() => response.json("Exercise deleted"))
        .catch((error) => response.status(400).json("Error: " + error))
})

router.route('/update/:id').post((request, response) => {
    Exercise.findById(request.params.id)
        .then(exercise => {
            exercise.username = request.body.username;
            exercise.description = request.body.description;
            exercise.duration = Number(request.body.duration);
            exercise.date = Date.parse(request.body.date);

            exercise.save()
                .then(() => response.json("Exercise updated successfully!"))
                .catch((error) => response.status(400).json("Error: " + error));
        })
        .catch((error) => response.status(400).json("Error: " + error));
})

module.exports = router; //Exporting the router we have created