import { useState } from 'react'
import { useLang } from '../LanguageContext'

function MenuItem({ item, onAddToCart }) {
  const { t } = useLang()
  const [showCustomize, setShowCustomize] = useState(false)
  const [selectedSize, setSelectedSize] = useState(item.sizes[0])
  const [selectedAddons, setSelectedAddons] = useState([])
  const [specialInstructions, setSpecialInstructions] = useState('')
  const [quantity, setQuantity] = useState(1)

  const translated = t.items[item.name] || { name: item.name, description: item.description }

  const handleAddToCart = () => {
    onAddToCart(item, selectedSize, selectedAddons, specialInstructions, quantity)
    setShowCustomize(false)
    setSelectedSize(item.sizes[0])
    setSelectedAddons([])
    setSpecialInstructions('')
    setQuantity(1)
  }

  const toggleAddon = (addon) => {
    if (selectedAddons.find(a => a.name === addon.name)) {
      setSelectedAddons(selectedAddons.filter(a => a.name !== addon.name))
    } else {
      setSelectedAddons([...selectedAddons, addon])
    }
  }

  const totalPrice = item.price + selectedSize.price + selectedAddons.reduce((sum, a) => sum + a.price, 0)

  return (
    <div className={`menu-item ${!item.available ? 'sold-out' : ''}`}>
      <div className="item-image-wrapper">
        <img src={item.image} alt={translated.name} />
        {!item.available && <div className="sold-out-badge">{t.soldOut}</div>}
        {item.featured && item.available && <div className="featured-badge">{t.chefsSpecial}</div>}
      </div>

      <div className="item-details">
        <h3>{translated.name}</h3>
        <p className="item-description">{translated.description}</p>

        <div className="item-tags">
          {item.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <div className="item-footer">
          <span className="item-price">${item.price.toFixed(2)}</span>
          {item.available && (
            <button className="add-button" onClick={() => setShowCustomize(true)}>
              {t.addToCart}
            </button>
          )}
        </div>
      </div>

      {showCustomize && (
        <div className="modal-overlay" onClick={() => setShowCustomize(false)}>
          <div className="customize-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowCustomize(false)}>×</button>

            <h2>{translated.name}</h2>

            {item.sizes.length > 1 && (
              <div className="customize-section">
                <h3>{t.size}</h3>
                {item.sizes.map(size => (
                  <label key={size.name} className="radio-option">
                    <input
                      type="radio"
                      checked={selectedSize.name === size.name}
                      onChange={() => setSelectedSize(size)}
                    />
                    <span>{t.sizes[size.name] || size.name} {size.price > 0 && `+$${size.price.toFixed(2)}`}</span>
                  </label>
                ))}
              </div>
            )}

            {item.addons.length > 0 && (
              <div className="customize-section">
                <h3>{t.addons}</h3>
                {item.addons.map(addon => (
                  <label key={addon.name} className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={!!selectedAddons.find(a => a.name === addon.name)}
                      onChange={() => toggleAddon(addon)}
                    />
                    <span>{t.addonNames[addon.name] || addon.name} +${addon.price.toFixed(2)}</span>
                  </label>
                ))}
              </div>
            )}

            <div className="customize-section">
              <h3>{t.specialInstructions}</h3>
              <textarea
                placeholder={t.specialInstructionsPlaceholder}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
              />
            </div>

            <div className="customize-section">
              <h3>{t.quantity}</h3>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <div className="modal-footer">
              <span className="modal-total">{t.total} ${(totalPrice * quantity).toFixed(2)}</span>
              <button className="add-to-cart-button" onClick={handleAddToCart}>
                {t.addToCart}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MenuItem
