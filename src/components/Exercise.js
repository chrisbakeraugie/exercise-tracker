import React from 'react';
import { Link } from 'react-router-dom';


const Exercise = props => (
    <thead>
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{props.exercise.date.substring(0, 10)}</td>
            <td>
                <Link className="btn btn-success" to={"/edit/" + props.exercise._id}>EDIT</Link> | <button className="btn btn-danger" onClick={() => props.deletedExercise(props.exercise._id)}>Delete</button>
                {/*<a href="#" onClick={() => props.deletedExercise(props.exercise._id)}>DELETE</a>*/}
            </td>
        </tr>
    </thead>

)

export default Exercise;