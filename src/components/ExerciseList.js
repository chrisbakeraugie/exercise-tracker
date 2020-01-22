import React from 'react';
import { Link } from "react-router-dom";
import Axios from "axios";
import Exercise from "./Exercise"

class ExerciseList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            exercisesList: []
        }

        this.deletedExercise = this.deletedExercise.bind(this);
    }

    componentDidMount() {
        Axios.get("http://localhost:5000/exercises/")
            .then(response => {
                this.setState({ exercisesList: response.data })
            })
            .catch(error => console.log(error));
    }

    deletedExercise(id) {
        Axios.delete("http://localhost:5000/exercises/" + id)
            .then(response => { console.log(response.data) })
            .catch(error => console.log(error));

            alert("This exercise has been deleted");
            this.setState({
            exercisesList: this.state.exercisesList.filter(element => element._id !== id)
        })

        console.log(this.state);
    }

    exerciseList() {
        console.log(this.state.exerciseList + "here");
        return (this.state.exercisesList.map(exer => {
            return (<Exercise exercise={exer} deletedExercise={this.deletedExercise} key={exer._id} />)
        }))

    }
    render() {
        return (
            <div>
                <h1>Logged Exercises</h1>
                <table className="table">
                    <thead className="thread-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    {this.exerciseList()}
                </table>
            </div>
        );
    }

}

export default ExerciseList;