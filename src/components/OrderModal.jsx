import { useLang } from '../LanguageContext'

function OrderModal({ isOpen }) {
  const { t } = useLang()
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="order-success-modal">
        <div className="success-icon">✓</div>
        <h2>{t.orderPlaced}</h2>
        <p>{t.estimatedWait}</p>
        <p className="success-message">{t.thankYou}</p>
      </div>
    </div>
  )
}

export default OrderModal
