import './Button.css'

function Button({ onClick, children }) {
  return (
    <>
      <button className="btn btn--accent" onClick={onClick}>
        {children}
      </button>
    </>
  )
}

export default Button
