import { MdClear } from "react-icons/md"
import Container from "./container"

//The value for the input needs to come from the state.
const SearchForm = ({ searchTerm, handleInputChange, handleFormSubmit, reset, category, handleCategoryChange }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Container>
                    <form 
                        className="d-flex" 
                        onSubmit={handleFormSubmit}
                    >
                        <input value={searchTerm}
                            onChange={handleInputChange}
                            placeholder="Look for a book" 
                            className="form-control me-2" 
                            aria-label="Search" 
                        />
                <select 
                    className="btn btn-success" 
                    id="category" 
                    value={category} 
                    onChange={handleCategoryChange}
                >
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                        <option value="subject">Subject</option>
                </select>
                <button 
                className="btn btn-outline-success" 
                type="submit"
                >
                    Search
                </button>
            {searchTerm && (
                <button 
                    className="btn btn-success" 
                    type="button" 
                    onClick={reset}
                >
                    <MdClear />
                </button>
            )}
                        </form>
                </Container>
            </div>
        </nav>
    )
}

export default SearchForm