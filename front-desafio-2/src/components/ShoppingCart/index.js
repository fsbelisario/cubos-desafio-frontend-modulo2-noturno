import './style.css';
import shoppingCartIcon from '../../assets/images/bag.svg'
import emptyShoppingCart from '../../assets/images/person-illustration.svg'
import incrementQty from '../../assets/images/plus-icon.svg'
import decrementQty from '../../assets/images/minus-icon.svg'
import removeItem from '../../assets/images/trash-icon.svg'

function ShoppingCart({ shoppingCartItems, handleShoppingCart, finalPrice }) {
    return (
        <div className="shopping-cart" >
            <div className="top-bar">
                <img src={shoppingCartIcon} alt="ícone do carrinho de compras" />
                Sacola
            </div>
            {shoppingCartItems.length === 0 ?
                (<div className="empty-shopping-cart">
                    <h1>Sua sacola está vazia</h1>
                    <h3>Adicione filmes agora</h3>
                    <img src={emptyShoppingCart} alt="ícone do carrinho de compras vazio" />
                </div>)
                :
                (shoppingCartItems.map(movie =>
                    <div className="shopping-cart-content" key={movie.title}>
                        <img className="movie-poster" src={movie.posterPath} alt="poster do filme" />
                        <div className="movie-data">
                            <span className="shopping-cart-movie-title">{movie.title}</span>
                            <span className="shopping-cart-movie-price">R$ {movie.price.toFixed(2)}</span>
                        </div>
                        <div className="shopping-cart-qty">
                            <img className="handle-increase" src={incrementQty} alt="botão para adicionar 1" onClick={() => handleShoppingCart(1, movie.title)} />
                            <span className="movie-qty">{movie.shoppingCartQty}</span>
                            <img className="handle-decrease" src={movie.shoppingCartQty > 1 ? decrementQty : removeItem} alt="botão para remover 1" onClick={() => handleShoppingCart(-1, movie.title)} />
                        </div>
                    </div>
                ))
            }
            {shoppingCartItems.length > 0 ?
                (< button className="check-out-btn">
                    <span>Confirme seus dados</span>
                    <span className="final-price">R$ {finalPrice.toFixed(2)}</span>
                </button>)
                :
                (<></>)
            }
        </div >
    );
}

export default ShoppingCart;