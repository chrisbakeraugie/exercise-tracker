import React from 'react';
import Axios from "axios";

class CreateUser extends React.Component {
    constructor(props) {
        super(props);

        //Nearly identical to our MongoDB schema
        this.state = {
            username: ""
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }


    onChangeUsername(event) {
        this.setState({ username: event.target.value })
    }

    onSubmit(event) {
        event.preventDefault(); //This prevents default submit behavior of html from happening

        const user = {
            username: this.state.username,
        }

        console.log(user); //This is to see whats happening before I connect to backend

        Axios.post("http://localhost:5000/users/add", user)
            .then(response => console.log(response.data))
    }
    render() {
        return (
            <div>
                <h2>Add a new user</h2>
                <h4>(cannot match username that already exists)</h4>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                        </input>
                        <div className="form-group">
                            <input type="submit"
                                value="Create User"
                                className="btn btn-primary"></input>
                        </div>


                    </div>
                </form>

            </div>
        );
    }

}

export default CreateUser;