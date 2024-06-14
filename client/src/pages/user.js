import { useParams } from "react-router-dom"
import { GET_USER } from "../utils/queries"
import { useQuery } from "@apollo/client"
import Spinner from "../components/spinner"
import Auth from "../utils/auth"
import { useThemeContext } from "../ctx/themeContext"
import DeleteBookButton from "../components/deleteButton"

const User = () => {
    const { id } = useParams()
    const { theme, setTheme } = useThemeContext()

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
            <select 
                value={theme}
                onChange={e => setTheme(e.target.value)}
            >
                {['Light', 'Dark'].map(mode => {
                    return <option value={mode} key={mode}>{mode}</option>
                })}
            </select>

            
            <h2>My Books...</h2>
                <ul>
                    {user.book.map((book, i) => {
                        return <li 
                            key={`${book.title}-${i}`}>
                                <div className="card" style={{width: 25+ '%'}}>
                                <div style={{
                                        display: 'flex',
                                        justifyContent:'space-between'
                                    }}>
                                        <h1>{book.title}</h1>
                                    </div>
                                    <img 
                                        src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                                        alt={`The cover of the book ${book.title}`}
                                        className="card-img-top"
                                    />
                                    <div>
                                        <p className="card-text">Written By: {book.author_name}</p>
                                        <p className="card-text">Published in {book.first_publish_year}</p>
                                    </div>
                                </div>
                            </li>
                    })}
                </ul>
        </>
    )
}

export default User