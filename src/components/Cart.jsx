import { useLang } from '../LanguageContext'

function Cart({ isOpen, onClose, cart, onUpdateQuantity, onRemove, total, onPlaceOrder }) {
  const { t } = useLang()

  return (
    <div className={`cart-panel ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2>{t.yourOrder}</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>

      <div className="cart-items">
        {cart.length === 0 ? (
          <p className="empty-cart">{t.emptyCart}</p>
        ) : (
          cart.map(item => {
            const translated = t.items[item.name] || { name: item.name }
            return (
              <div key={item.cartId} className="cart-item">
                <img src={item.image} alt={translated.name} />
                <div className="cart-item-details">
                  <h4>{translated.name}</h4>
                  <p className="cart-item-size">{t.sizes[item.selectedSize.name] || item.selectedSize.name}</p>
                  {item.selectedAddons.length > 0 && (
                    <p className="cart-item-addons">
                      + {item.selectedAddons.map(a => t.addonNames[a.name] || a.name).join(', ')}
                    </p>
                  )}
                  {item.specialInstructions && (
                    <p className="cart-item-instructions">{t.note} {item.specialInstructions}</p>
                  )}
                  <p className="cart-item-price">${item.totalPrice.toFixed(2)}</p>
                </div>
                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button onClick={() => onUpdateQuantity(item.cartId, -1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.cartId, 1)}>+</button>
                  </div>
                  <button className="remove-button" onClick={() => onRemove(item.cartId)}>{t.remove}</button>
                </div>
              </div>
            )
          })
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-footer">
          <div className="cart-total">
            <span>{t.total}</span>
            <span className="total-amount">${total.toFixed(2)}</span>
          </div>
          <button className="place-order-button" onClick={onPlaceOrder}>
            {t.placeOrder}
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart
