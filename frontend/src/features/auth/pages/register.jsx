import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loading, handleRegister } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await handleRegister(username, email, password);

        navigate("/");
    };

    if (loading) {
        return (
            <main>
                <div>Loading...</div>
            </main>
        );
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>

                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Register
                    </button>
                </form>

                <p>
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </p>
            </div>
        </main>
    );
};

export default Register;