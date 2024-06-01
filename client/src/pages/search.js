import { useState, useEffect } from 'react'
import SearchForm from "../components/searchForm"
import BookDetails from "../components/bookDetails"
import Spinner from '../components/spinner'

const Search = () => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [book, setBook] = useState(null)
    const [searchTerm, setSearchTerm] = useState('Treasure Island')
    const [category, setCategory] = useState('title')

    useEffect(() => {
        getBook()
    }, [])

    const getBook = () => {
        setLoading(true)
        setError(null)
        fetch(`https://openlibrary.org/search.json?${category}=${searchTerm}`)
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

    const handleInputChange = e => {
        setSearchTerm(e.target.value)
    }

    const handleCategoryChange = e => {
        setCategory(e.target.value)
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        if (!searchTerm){
            return
        } 
        getBook()
    }

    const reset = () => {
        setSearchTerm('')
        setError(null)
        setBook(null)
    }

    return (
        <>

            <SearchForm 
                searchTerm={searchTerm}
                handleInputChange={handleInputChange}
                handleFormSubmit={handleFormSubmit}
                reset={reset}
                category={category}
                handleCategoryChange={handleCategoryChange}
            />
            { renderUI() }
        </>
    )
}

export default Search