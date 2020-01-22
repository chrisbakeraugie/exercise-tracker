import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"; //Googled import statement after running npm install react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css'; //Googled import statement after running npm install bootstrap;

import Navbar from './components/Navbar'
import ExerciseList from './components/ExerciseList'
import EditExercise from './components/EditExercise'
import CreateExercise from './components/CreateExercise'
import CreateUser from './components/CreateUser';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ExerciseList} /> {/*Adding components that don't exist yet, just because I'm learning about react-router methodology */}
        {/*Additionally, the ^^ exact attribute means that the route won't accept partial matches. This will prevent incorrect routing when two routes are similar */}
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
