import { useState } from "react"
import { ADD_USER, LOGIN } from "../utils/mutations"
import { useMutation } from "@apollo/client"
import Auth from '../utils/auth'

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [addUser, { loading, error }] = useMutation(ADD_USER)
    const [login, { loginLoading, loginError }] = useMutation(LOGIN)

    const handleSubmit = async e => {
        e.preventDefault()
        
        try {
            const { data } = await addUser({
            variables: {
                username,
                email,
                password
            }
        })
        } catch (err) {
            console.log(err)
        }
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
        <form id="signUp-form" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <nav className="navbar navbar-expand-lg navbar-light bg-success">
               <div className="container-fluid">
                    <input 
                        name="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="username"
                        type="text"
                        className="form-control me-2"
                    />
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
                    <button className="btn btn-info">SignUp</button>
                </div>
             </nav>
        </form>
    )
}

export default SignUp