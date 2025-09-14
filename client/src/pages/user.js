import { useParams } from "react-router-dom"
import { GET_USER } from "../utils/queries"
import { useQuery } from "@apollo/client"
import Spinner from "../components/spinner"
import Auth from "../utils/auth"
import DeleteBookButton from "../components/deleteButton"
import Container from "../components/container"

const User = () => {
    const { id } = useParams()
    const { data, loading, error } = useQuery(GET_USER, {
        variables: {
            _id: id
        }
    })

    console.log(data)

    if (loading) return <Spinner />
    if (error) return <p>Error {error.message}</p>

    const user = data?.user || {}    

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-success">
            <div className="container-fluid">
                
                <h1 className="custom-font">{user.username}: <h6 className="custom-font">{user.email}</h6></h1>
                <button onClick={() => Auth.logout()} className="btn btn-info custom-font">Log out</button>
            </div>
            </nav>
                <h1 className="custom-font">Books to check out</h1>

                <Container className="results search-result-book">
                    <div className="card-container">
                        {user.book.map((book, i) => {
                            const coverImage = `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`


                            return (
                                <div className="card bg-success" key={`${book.title}-${i}`}>
                                    <div style={{
                                            display: 'flex',
                                            justifyContent:'space-between'
                                        }}>
                                            <h1 className="book-background">Title: {book.title}</h1>
                                            
                                        </div>
                                        <img 
                                            src={coverImage}
                                            alt={`The cover of the book ${book.title}`}
                                            className="card-img-top"
                                        />
                                        <div className="book-background">
                                            <h3 className="card-text">Written By: {book.author_name}</h3>
                                            <h3 className="card-text">Published in {book.first_publish_year}</h3>
                                        </div>
                                        <DeleteBookButton userId={user._id} bookId={book._id} />
                                    </div>
                            ) 
                        })}
                    </div>
                </Container>
        </>
    )
}

export default User