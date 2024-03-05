import './CardButton.css'

function CardButton({children, className}) {
  const cl = 'card-btn ' + (className ? className : '')

  return (
    <button type="button" className={cl}>
      {children}
    </button>
  )
}

export default CardButton