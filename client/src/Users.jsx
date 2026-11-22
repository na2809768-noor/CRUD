
import React from "react";
import { Link } from "react-router-dom";

function Users() {
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="bg-white rounded p-5 text-center">
                <h2>Student CRUD</h2>
                <p>Add a new student to submit their details.</p>
                <Link to="/create" className="btn btn-success">
                    Add Student +
                </Link>
            </div>
        </div>
    )
}

export default Users;
