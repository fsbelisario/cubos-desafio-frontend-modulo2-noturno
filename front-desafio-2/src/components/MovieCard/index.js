import './style.css';
import gondenStar from '../../assets/images/golden-star.svg'

function MovieCard({ movie, handleShoppingCart }) {
    return (
        < div className="movie-card" style={{
            backgroundImage: `url(${movie.posterPath})`, backgroundSize: '100% 100%',
        }}>
            < div className="movie-info" >
                <span className="movie-title">{movie.title}</span>
                <div className="rating">
                    <img className="golden-star" src={gondenStar} alt="rating golden star" />
                    <span className="movie-rating">{movie.voteAverage}</span>
                </div>
            </div >
            <button className="buy-movie-btn" onClick={() => handleShoppingCart(1, movie.title)}>
                <span>Sacola</span>
                <span className="movie-price">R$ {movie.price.toFixed(2)}</span>
            </button>
        </div >
    );
}

export default MovieCard;