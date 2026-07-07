import { useLang } from '../LanguageContext'

function MenuFilters({
  searchTerm, onSearchChange,
  activeCategory, onCategoryChange,
  categories, dietaryFilters, onDietaryFilterChange,
  sortBy, onSortChange
}) {
  const { t } = useLang()

  const dietaryOptions = [
    { value: 'Vegan', label: t.vegan },
    { value: 'Spicy', label: t.spicy },
    { value: 'Contains nuts', label: t.containsNuts }
  ]

  const toggleDietaryFilter = (value) => {
    if (dietaryFilters.includes(value)) {
      onDietaryFilterChange(dietaryFilters.filter(f => f !== value))
    } else {
      onDietaryFilterChange([...dietaryFilters, value])
    }
  }

  return (
    <div className="filters-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category}
            className={`category-tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category === 'All' ? t.all : (t[category] || category)}
          </button>
        ))}
      </div>

      <div className="filters-row">
        <div className="dietary-filters">
          {dietaryOptions.map(option => (
            <button
              key={option.value}
              className={`filter-tag ${dietaryFilters.includes(option.value) ? 'active' : ''}`}
              onClick={() => toggleDietaryFilter(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <select className="sort-select" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="default">{t.sortDefault}</option>
          <option value="price-low">{t.sortPriceLow}</option>
          <option value="price-high">{t.sortPriceHigh}</option>
          <option value="name">{t.sortName}</option>
        </select>
      </div>
    </div>
  )
}

export default MenuFilters
