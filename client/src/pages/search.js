import { useState, useEffect } from 'react'
import SearchForm from "../components/searchForm"
import BookDetails from "../components/bookDetails"
import Spinner from '../components/spinner'

const Search = () => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [book, setBook] = useState(null)
    const [searchTerm, setSearchTerm] = useState('Treasure Island')

    useEffect(() => {
        getBook()
    }, [])

    const getBook = () => {
        setLoading(true)
        setError(null)
        fetch(`https://openlibrary.org/search.json?q=${searchTerm}`)
            .then(response => response.json())
            .then(json => setBook(json))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }

    //Will return different parts of the UI
    const renderUI = () => {
        if (loading) {
            return <Spinner />
        } else if (error) {
            return <p className="error">{error}</p>
        } else if (!searchTerm) {
            return <p>Search a book to get started!</p>
        } else if (book) {
            return <BookDetails book={book} />
        } else {
            return null
        }
    }

    return (
        <>

            <SearchForm />
            { renderUI() }
        </>
    )
}

export default Search