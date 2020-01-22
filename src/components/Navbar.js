import React from 'react';
import { Link } from 'react-router-dom';

/**
 * This bootstrap Tab styled navbar was taken directly from https://getbootstrap.com/docs/4.0/components/navs/
 * The anchor elements have been replaced by Link components
 */
export default class Navbar extends React.Component {

    render() {
        return (
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Exercise Tracker</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Exercises</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/create">Create Exercise Log</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/user">Create User</Link>
                </li>
            </ul>
        );
    }
}