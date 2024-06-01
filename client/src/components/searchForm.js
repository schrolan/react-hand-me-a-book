import { MdClear } from "react-icons/md"
import Container from "./container"

//The value for the input needs to come from the state.
const SearchForm = ({ searchTerm, handleInputChange, handleFormSubmit, reset, category, handleCategoryChange }) => {
    return (
        <form id="search-form" onSubmit={handleFormSubmit}>
            <Container>
                <input 
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Look for a book"
                />
                <select id="category" value={category} onChange={handleCategoryChange}>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="subject">Subject</option>
                </select>
                <button type="submit">Search</button>
                
                {searchTerm && (
                    <button type="button" onClick={reset}>
                    <MdClear />
                </button>
                )}
            </Container>
        </form>
    )
}

export default SearchForm