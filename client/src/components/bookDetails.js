import { MdSave } from 'react-icons/md'
import Container from './container'
import Auth from '../utils/auth'

const BookDetails = (props) => {

    const randomIndex = Math.floor(Math.random() * props.book.docs.length)

    const book = props.book

    // console.log(book.docs[0])

    const {
        title,
        author_name,
        first_publish_year,
        cover_i
    } = props.book.docs[randomIndex]


    // console.log(title)


    const coverImage = `http://covers.openlibrary.org/b/id/${cover_i}-M.jpg`

    return (
        <Container classname='results'>
            <div style={{
                display: 'flex',
                justifyContent:'space-between'
            }}>
                <h1>Title: {title}</h1>
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