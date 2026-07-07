import { useLang } from '../LanguageContext'

const VAT_RATE = 0.15

function Cart({ isOpen, onClose, cart, onUpdateQuantity, onRemove, total, onPlaceOrder }) {
  const { t } = useLang()
  const vat = total * VAT_RATE
  const grandTotal = total + vat

  return (
    <div className={`cart-sidebar ${isOpen ? 'active' : ''}`}>
      <div className="cart-header">
        <h2>{t.yourOrder}</h2>
        <button className="close-cart" onClick={onClose}>×</button>
      </div>

      <div className="cart-items">
        {cart.length === 0 ? (
          <p className="cart-empty">{t.emptyCart}</p>
        ) : (
          cart.map(item => {
            const translated = t.items[item.name] || { name: item.name }
            const opts = [
              t.sizes[item.selectedSize.name] || item.selectedSize.name,
              ...item.selectedAddons.map(a => t.addonNames[a.name] || a.name),
              item.specialInstructions ? `📝 ${item.specialInstructions}` : null
            ].filter(Boolean).join(' · ')

            return (
              <div key={item.cartId} className="cart-item">
                <div className="cart-item-header">
                  <span className="cart-item-name">{translated.name}</span>
                  <span className="cart-item-price">ETB {item.totalPrice}</span>
                </div>
                {opts && <div className="cart-item-options">{opts}</div>}
                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button className="qty-btn qty-minus" onClick={() => onUpdateQuantity(item.cartId, -1)}>−</button>
                    <span>{item.quantity}</span>
                    <button className="qty-btn qty-plus" onClick={() => onUpdateQuantity(item.cartId, 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => onRemove(item.cartId)}>{t.remove}</button>
                </div>
              </div>
            )
          })
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-footer">
          <div className="cart-total">
            <span>{t.subtotal}</span>
            <span>ETB {total}</span>
          </div>
          <div className="cart-total">
            <span>{t.vat}</span>
            <span>ETB {vat.toFixed(2)}</span>
          </div>
          <div className="cart-total cart-grand-total">
            <span>{t.total}</span>
            <span>ETB {grandTotal.toFixed(2)}</span>
          </div>
          <button className="btn btn-primary btn-block" onClick={onPlaceOrder}>
            {t.placeOrder}
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart
