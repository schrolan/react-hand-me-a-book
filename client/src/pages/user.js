import { useParams } from "react-router-dom"
import { GET_USER } from "../utils/queries"
import { useQuery } from "@apollo/client"
import Spinner from "../components/spinner"
import Auth from "../utils/auth"

const User = () => {
    const { id } = useParams()

    const { data, loading, error } = useQuery(GET_USER, {
        variables: {
            _id: id
        }
    })

    if (loading) return <Spinner />
    if (error) return <p>Error {error.message}</p>

    const user = data?.user || {}

    return (
        <>
            <h1>{user.username}</h1>
            <p>{user.email}</p>
            <button onClick={() => Auth.logout()}>Log out</button>

            <h2>Theme</h2>
            <select>
                {['Light', 'Dark'].map(mode => {
                    return <option value={mode} key={mode}>{mode}</option>
                })}
            </select>

            <h2>My Books...</h2>
            <ul>
                {user.book.map((book, i) => {
                    return <li key={`${book.title}-${i}`}>{book.title}</li>
                })}
            </ul>

        </>
    )
}

export default User