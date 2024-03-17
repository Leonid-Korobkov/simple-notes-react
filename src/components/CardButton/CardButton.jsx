import './CardButton.css'

function CardButton({children, className, ...props}) {
  const cl = 'card-btn ' + (className ? className : '')

  return (
    <button {...props} type="button" className={cl}>
      {children}
    </button>
  )
}

export default CardButton