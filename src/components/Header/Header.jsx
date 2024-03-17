import st from './Header.module.css'
import SelectUser from '../SelectUser/SelectUser.jsx';
import Logo from '../Logo/Logo.jsx';
import {memo} from 'react';

function Header() {
  return (
    <>
      <header className={st['header']}>
        <Logo src={'./icons/logo.svg'}/>
        <SelectUser/>
      </header>
    </>
  )
}

export default memo(Header)
