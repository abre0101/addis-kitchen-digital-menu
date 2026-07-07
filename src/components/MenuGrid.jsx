import MenuItem from './MenuItem'

function MenuGrid({ items, onAddToCart }) {
  return (
    <div className="menu-grid">
      {items.map(item => (
        <MenuItem key={item.id} item={item} onAddToCart={onAddToCart} />
      ))}
    </div>
  )
}

export default MenuGrid
