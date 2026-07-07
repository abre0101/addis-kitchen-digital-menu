import { useState, useMemo, useRef } from 'react'
import { menuData, categories } from './data/menuData'
import Header from './components/Header'
import MenuFilters from './components/MenuFilters'
import MenuGrid from './components/MenuGrid'
import Cart from './components/Cart'
import OrderModal from './components/OrderModal'
import { useLang } from './LanguageContext'

function App() {
  const { t } = useLang()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [dietaryFilters, setDietaryFilters] = useState([])
  const [sortBy, setSortBy] = useState('default')
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const orderCounterRef = useRef(0)
  const [currentOrderNumber, setCurrentOrderNumber] = useState(null)

  const filteredItems = useMemo(() => {
    let items = [...menuData]

    // Search filter
    if (searchTerm) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (activeCategory !== 'All') {
      items = items.filter(item => item.category === activeCategory)
    }

    // Dietary filters
    if (dietaryFilters.length > 0) {
      items = items.filter(item =>
        dietaryFilters.every(filter => item.tags.some(tag => tag.includes(filter)))
      )
    }

    // Sorting
    if (sortBy === 'price-low') {
      items.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      items.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'name') {
      items.sort((a, b) => a.name.localeCompare(b.name))
    }

    return items
  }, [searchTerm, activeCategory, dietaryFilters, sortBy])

  const featuredItems = menuData.filter(item => item.featured)

  const addToCart = (item, selectedSize, selectedAddons, specialInstructions, quantity) => {
    const cartItem = {
      ...item,
      cartId: Date.now(),
      selectedSize,
      selectedAddons,
      specialInstructions,
      quantity,
      totalPrice: (item.price + selectedSize.price + selectedAddons.reduce((sum, a) => sum + a.price, 0)) * quantity
    }
    setCart([...cart, cartItem])
    setCartOpen(true)
  }

  const updateCartQuantity = (cartId, delta) => {
    setCart(cart.map(item =>
      item.cartId === cartId
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ))
  }

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId))
  }

  const placeOrder = () => {
    orderCounterRef.current += 1
    setCurrentOrderNumber(orderCounterRef.current)
    setOrderModalOpen(true)
    setTimeout(() => {
      setOrderModalOpen(false)
      setCart([])
      setCartOpen(false)
    }, 3000)
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="app">
      <Header 
        cartCount={cartCount}
        onCartClick={() => setCartOpen(!cartOpen)}
      />
      
      <MenuFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        categories={['All', ...categories]}
        dietaryFilters={dietaryFilters}
        onDietaryFilterChange={setDietaryFilters}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <main className="main-content">
        {activeCategory === 'All' && searchTerm === '' && featuredItems.length > 0 && (
          <section className="featured-section">
            <h2>{t.chefsSpecials}</h2>
            <MenuGrid items={featuredItems} onAddToCart={addToCart} />
          </section>
        )}

        <section className="menu-section">
          {filteredItems.length === 0 ? (
            <div className="empty-state">
              <p>{t.noDisheFound}</p>
              <button onClick={() => {
                setSearchTerm('')
                setActiveCategory('All')
                setDietaryFilters([])
              }}>{t.clearFilters}</button>
            </div>
          ) : (
            <MenuGrid items={filteredItems} onAddToCart={addToCart} />
          )}
        </section>
      </main>

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
        total={cartTotal}
        onPlaceOrder={placeOrder}
      />

      <OrderModal isOpen={orderModalOpen} orderNumber={currentOrderNumber} />
    </div>
  )
}

export default App
