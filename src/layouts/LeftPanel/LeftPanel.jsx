import './LeftPanel.css'
import {useContext} from 'react';
import cn from 'classnames';
import {SideBarContext} from '../../context/sidebar.context.jsx';

function LeftPanel({children}) {
  const {isOpened, setIsOpened} = useContext(SideBarContext)

  return <div className={cn('left-panel', isOpened && 'show')}>{children}</div>
}

export default LeftPanel
