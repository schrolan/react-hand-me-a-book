import { useParams } from "react-router-dom"
import { GET_USER } from "../utils/queries"
import { useQuery } from "@apollo/client"
import Spinner from "../components/spinner"
import Auth from "../utils/auth"
import DeleteBookButton from "../components/deleteButton"

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
            <nav className="navbar navbar-expand-lg navbar-light bg-success">
            <div className="container-fluid">
                
                <h1>{user.username}: <h6>{user.email}</h6></h1>
                <button onClick={() => Auth.logout()} className="btn btn-info">Log out</button>
            </div>
            </nav>
                <h2>Books to check out</h2>
                <ul className="grid-container">
                    {user.book.map((book, i) => {
                        return <li 
                            key={`${book.title}-${i}`}>
                                <div className="card bg-info" style={{width: 100+ '%'}}>
                                <div style={{
                                        display: 'flex',
                                        justifyContent:'space-between'
                                    }}>
                                        <p>Title: {book.title}</p>
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
                                    <DeleteBookButton userId={user._id} bookId={book._id} />
                                </div>
                            </li>
                    })}
                </ul>
        </>
    )
}

export default User