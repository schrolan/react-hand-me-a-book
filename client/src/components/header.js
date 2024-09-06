import { Link } from "react-router-dom"
import Auth from "../utils/auth"

const Header = () => {
    const currentUser = Auth.getLoggedInUser()
    const toPath = Auth.loggedIn() ? `/user/${currentUser._id}` : '/login'

    return (
        <header className="app-header">
            <nav className="navbar navbar-expand-lg book">
            <div className="container-fluid">
                <form className="d-flex">
                    <a className="btn btn-success" type="submit">
                        <Link to={"/"}>
                            <a className="nav-link">
                                <h2 className="custom-font">Search</h2>
                            </a>
                        </Link>
                    </a>
                </form>

                <a className="navbar-brand">
                    <h1 className="custom-font">Hand me a Book</h1>
                </a>
                
                <form className="d-flex">
                    <a className="btn btn-success" type="submit">
                        <Link to={toPath}>
                            <div>
                                <a className="nav-link">
                                    <h2 className="custom-font">Your Collection</h2>
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