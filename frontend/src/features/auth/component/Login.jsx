import { useState } from "react";
import React from "react";
import { useAuth } from "../hooks/useAuth";
import "../auth.form.scss";
import { Link } from "react-router";
import { useNavigate } from "react-router";

const Login = () => {

    const {loading,handleLogin} = useAuth();
    const navigate = useNavigate();

    const[email,setEmail] = useState("");
    const[password,setPassword] =useState("");

    const handleSubmit =async (e) => {
        e.preventDefault();
        await handleLogin(email, password);
        navigate("/");
    };

    if(loading) {
        return <main><div>Loading...</div></main>;
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={(e)=>{setEmail(e.target.value)}}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e)=>{ setPassword(e.target.value)}}
                            placeholder="Enter your password"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>

                <p>
                    Don't have an account?{" "}
                    <Link to="/register">Register</Link>
                </p>
            </div>
        </main>
    );
};

export default Login;