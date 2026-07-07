import { useLang } from '../LanguageContext'

function Header({ cartCount, onCartClick }) {
  const { lang, setLang, t } = useLang()

  return (
    <header className="header">
      <div className="header-content">
        <h1>🇪🇹 {t.restaurantName}</h1>
        <div className="header-actions">
          <button
            className={`lang-button ${lang === 'en' ? 'active' : ''}`}
            onClick={() => setLang('en')}
          >EN</button>
          <button
            className={`lang-button ${lang === 'am' ? 'active' : ''}`}
            onClick={() => setLang('am')}
          >አማ</button>
          <button className="cart-button" onClick={onCartClick}>
            🛒 {t.cart} {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
