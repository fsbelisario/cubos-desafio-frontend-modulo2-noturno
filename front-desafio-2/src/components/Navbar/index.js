import './style.css';
import logo from '../../assets/images/logo.svg'
import searchIcon from '../../assets/images/search-icon.svg'
import userPhoto from '../../assets/images/user-photo.jpeg'

function Navbar() {
    return (
        <div className="navbar">
            <img className="logo" src={logo} alt="logo site" />
            <form action="">
                <input className="input-search" type="text" placeholder="Pesquise filmes..." />
                <img className="search-button" src={searchIcon} alt="botão de busca" />
            </form>
            <div className="user-area">
                <span className="welcome-msg">Bem vindo Fbelisario</span>
                <img className="user-photo" src={userPhoto} alt="foto do usuário" />
            </div>
        </div >
    );
}

export default Navbar;