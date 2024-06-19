import { useState } from "react"
import { LOGIN } from "../utils/mutations"
import { useMutation } from "@apollo/client"
import Auth from '../utils/auth'
import { Link } from "react-router-dom"
 
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [login, { loading, error }] = useMutation(LOGIN)

    const handleSubmit = async e => {
        e.preventDefault()
        const { data } = await login({
            variables: {
                email,
                password,
            }
        })
        console.log(data)
        Auth.login(data.login.token)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <h1>Login:</h1>
            <div className="container-fluid">
                <form 
                    id="login-form" 
                    onSubmit={handleSubmit}
                    className="d-flex"
                    >
                    <input
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="email"
                        type="email"
                        className="form-control me-2" 
                    />
                    <input
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="password"
                        type="password"
                        className="form-control me-2" 
                    />
                    <button 
                        className="btn btn-outline-success"
                    >
                        Login
                    </button>
                    <Link to={"/signUp"}>
                        <div>
                            <button className="btn btn-success">
                                SignUp
                            </button>
                        </div>
                    </Link>
                </form>
            </div>
        </nav>
    )
}

export default Login