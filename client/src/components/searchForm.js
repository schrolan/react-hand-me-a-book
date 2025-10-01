import { MdClear } from "react-icons/md"
import Container from "./container"

const SearchForm = ({
  searchTerm,
  handleInputChange,
  handleFormSubmit,
  reset,
  category,
  handleCategoryChange,
}) => {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <Container>
          <form className="d-flex" onSubmit={handleFormSubmit}>
            <input
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Look for a book"
              className="form-control me-2"
              aria-label="Search"
            />

            <select
              className="btn"
              id="category"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="subject">Subject</option>
            </select>

            <button className="btn" type="submit">
              Search
            </button>

            {searchTerm && (
              <button className="btn" type="button" onClick={reset}>
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