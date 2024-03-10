import st from './Header.module.css'

function Header() {
  return (
    <>
      <header className="header">
        <img className={st.logoImg} src="./icons/logo.svg" alt=""/>
      </header>
    </>
  )
}

export default Header
