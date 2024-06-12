import { Link } from "react-router-dom"
import { MdPerson, MdSearch } from 'react-icons/md'
import Auth from "../utils/auth"

const Header = () => {
    const currentUser = Auth.getLoggedInUser()
    const toPath = Auth.loggedIn() ? `/user/${currentUser._id}` : '/login'

    return (
        <header className="app-header">
            <Link to={toPath}>
                <div>
                    <MdPerson size={65} className="MdPerson" />
                </div>
            </Link>
            <Link to={"/"}>
                <MdSearch color="black" size={65} className="search-icon"/>
            </Link>
            <h1 className="header-title">Toss me a book!</h1>
        </header>
    )
}

export default Header