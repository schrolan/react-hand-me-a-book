import { Link } from "react-router-dom"
import { MdPerson, MdSearch } from 'react-icons/md'
import Auth from "../utils/auth"

const Header = () => {
    const currentUser = Auth.getLoggedInUser()
    const toPath = Auth.loggedIn() ? `/user/${currentUser._id}` : '/login'

    return (
        <header className="app-header">
            <nav className="navbar navbar-expand-lg navbar-light bg-info">
            <div className="container-fluid">
                <form className="d-flex">
                    <a className="btn btn-success" type="submit">
                        <Link to={"/"}>
                            <a className="nav-link">
                                <MdSearch color="black" size={50} />
                            </a>
                        </Link>
                    </a>
                </form>

                <a className="navbar-brand">Toss me a Book</a>
                
                <form className="d-flex">
                    <a className="btn btn-success" type="submit">
                        <Link to={toPath}>
                            <div>
                                <a className="nav-link">
                                    <MdPerson color="black" size={50} />
                                </a>
                            </div>
                        </Link>
                    </a>
                </form>
            </div>
            </nav>
        </header>
    )
}

export default Header