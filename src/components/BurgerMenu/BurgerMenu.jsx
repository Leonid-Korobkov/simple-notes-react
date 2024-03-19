import './BurgerMenu.css';
import cn from 'classnames';
import {useContext} from 'react';
import {SideBarContext} from '../../context/sidebar.context.jsx';


function BurgerMenu() {
  const {isOpened, setIsOpened} = useContext(SideBarContext)
  console.log(isOpened)

  return (
    <div className={cn('burger-menu', isOpened && 'show')} onClick={() => setIsOpened(!isOpened)}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

export default BurgerMenu;