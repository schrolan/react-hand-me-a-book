import { MdSave } from 'react-icons/md'
import { useMutation } from '@apollo/client'
import { ADD_BOOK } from '../utils/mutations'
import { GET_USER } from '../utils/queries'
import Container from './container'
import Auth from '../utils/auth'

const BookDetails = (props) => {
    const currentUser = Auth.getLoggedInUser()

    const getRandomBooks = (booksArray, num) => {
        const shuffled = [...booksArray].sort(() => 0.5 - Math.random()); 
        return shuffled.slice(0, num); 
    }

    const randomBooks = getRandomBooks(props.book.docs, 3)

    const [addBook] = useMutation(ADD_BOOK, {
        refetchQueries: [
            { query: GET_USER },
            'GET_USER'
        ]
    })

    const saveBook = async (book) => {
        await addBook({
            variables: {
                userId: currentUser._id,
                title: book.title,
                author_name: book.author_name,
                first_publish_year: book.first_publish_year,
                cover_i: book.cover_i
            }
        })
        alert(`${book.title} saved!`)
    }

    return (
        <Container className='results search-result-book'>
            <div className="card-container">
                {randomBooks.map((book, index) => {
                    const coverImage = `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`

                    return (
                        <div className="card bg-success" key={index}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h1 className='book-background'>Title: {book.title}</h1>
                                {Auth.loggedIn() && (
                                    <button className='btn btn-info' onClick={() => saveBook(book)}>
                                        <MdSave size={25} />
                                    </button>
                                )}
                            </div>
                            <img 
                                src={coverImage}
                                alt={`The cover of the book ${book.title}`}
                                className="card-img-top"
                            />
                            <div className='book-background'>
                                <h3 className="card-text">Written By: {book.author_name}</h3>
                                <h3 className="card-text">Published in {book.first_publish_year}</h3>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Container>
    )
}

export default BookDetails



// import { MdSave } from 'react-icons/md'
// import { useMutation } from '@apollo/client'
// import { ADD_BOOK } from '../utils/mutations'
// import { GET_USER } from '../utils/queries'
// import Container from './container'
// import Auth from '../utils/auth'

// const BookDetails = (props) => {

//     const randomIndex = Math.floor(Math.random() * props.book.docs.length)

//     // const book = props.book

//     // console.log(book.docs[0])

//     const {
//         title,
//         author_name,
//         first_publish_year,
//         cover_i
//     } = props.book.docs[randomIndex]

//     const currentUser = Auth.getLoggedInUser()

//     console.log(title)
//     const [addBook] = useMutation(ADD_BOOK, {
//         refetchQueries: [
//             { query: GET_USER },
//             'GET_USER'
//         ]
//     })

//     const saveBook = async () => {
//         await addBook({
//             variables: {
//                 userId: currentUser._id,
//                 title,
//                 author_name,
//                 first_publish_year,
//                 cover_i
//             }
//         })
//         alert(`${title} saved!`)
//     }

//     const coverImage = `http://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
    
//     return (
//         <Container classname='results search-result-book'>
//             <div className="card bg-success" style={{width: 25 + '%'}}>
//                 <div style={{
//                     display: 'flex',
//                     justifyContent:'space-betwef'
//                 }}>
//                     <h1>Title: {title}</h1>
//                     {Auth.loggedIn() && (
//                         <button className='btn btn-info' onClick={saveBook}>
//                             <MdSave size={25} />
//                         </button>
//                     )}
//                 </div>
//                 <img 
//                     src={coverImage}
//                     alt={`The cover of the book ${title}`}
//                     className="card-img-top"
//                 />
//                 <div>
//                     <h3 className="card-text">Written By: {author_name}</h3>
//                     <h3 className="card-text">Published in {first_publish_year}</h3>
//                 </div>
//             </div>
//         </Container>    
//     )
// }

// export default BookDetails