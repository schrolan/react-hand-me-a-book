import { MdSave } from 'react-icons/md'
import { useMutation } from '@apollo/client'
import { ADD_BOOK } from '../utils/mutations'
import { GET_USER } from '../utils/queries'
import Container from './container'
import Auth from '../utils/auth'

const BookDetails = (props) => {

    const randomIndex = Math.floor(Math.random() * props.book.docs.length)

    // const book = props.book

    // console.log(book.docs[0])

    const {
        title,
        author_name,
        first_publish_year,
        cover_i
    } = props.book.docs[randomIndex]

    const currentUser = Auth.getLoggedInUser()

    // console.log(title)
    const [addBook] = useMutation(ADD_BOOK, {
        refetchQueries: [
            { query: GET_USER },
            'GET_USER'
        ]
    })

    const saveBook = async () => {
        await addBook({
            variables: {
                userId: currentUser._id,
                title,
                author_name,
                first_publish_year,
                cover_i
            }
        })
        alert(`${title} saved!`)
    }

    const coverImage = `http://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
    
    return (
        <Container classname='results'>
            <div style={{
                display: 'flex',
                justifyContent:'space-between'
            }}>
                <h1>Title: {title}</h1>
                {Auth.loggedIn() && (
                    <button onClick={saveBook}>
                        <MdSave size={25} />
                    </button>
                )}
            </div>
            <img 
                src={coverImage}
                alt={`The cover of the book ${title}`}
            />
            <h2>Author: {author_name}</h2>
            <h2>First year published: {first_publish_year}</h2>
        </Container>    
    )
}

export default BookDetails