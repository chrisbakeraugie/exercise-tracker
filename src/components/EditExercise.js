import React from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Axios from 'axios';

class EditExercise extends React.Component {
    constructor(props) {
        super(props);

        //Nearly identical to our MongoDB schema
        this.state = {
            username: "",
            description: "",
            duration: 0,
            date: new Date(),
            users: [] //This is temporary to show users in the dropdown menu before connecting to backend
        }

        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
    }

    /**
     * This will run right before the rendered method is displayed
     */
    componentDidMount() {
        Axios.get("http://localhost:5000/exercises/" + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                })
            })
            .catch(error => console.log(error));
        Axios.get("http://localhost:5000/users/")
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        users: response.data.map( user => user.username),
                        username: response.data[0].username
                    })
                }
                console.log("ran then statement")
            })
    }

    onChangeUsername(event) {
        this.setState({ username: event.target.value })
    }

    onChangeDescription(event) {
        this.setState({ description: event.target.value })
    }

    onChangeDuration(event) {
        this.setState({ duration: event.target.value })
    }

    /**
     * This setState method is different because the method for entering the date will
     * be an interactive calendar
     * @param {} date 
     */
    onChangeDate(date) {
        this.setState({ date: date })
    }

    onSubmit(event) {
        event.preventDefault(); //This prevents default submit behavior of html from happening

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise); //This is to see whats happening before I connect to backend

        Axios.post("http://localhost:5000/exercises/update/" + this.props.match.params.id, exercise)
            .then(response => console.log(response.data));
    }
    render() {
        return (
            <div>
                <h1>Edit exercise log</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {this.state.users.map((user) => {
                                return (
                                    <option
                                        key={user}
                                        value={user}>
                                        {user}
                                    </option>
                                )
                            })}
                        </select>

                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription} />

                    </div>
                    <div className="form-group">
                        <label>Duration: (minutes)</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration} />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>

                </form>
            </div>
        );
    }

}

export default EditExercise;