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
                    <MdPerson color="gold" size={65} />
                </div>
            </Link>
            <Link to={"/"}>
                <MdSearch color="black" size={65}/>
            </Link>
        </header>
    )
}

export default Header