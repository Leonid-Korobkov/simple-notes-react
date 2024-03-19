import {createContext, useState} from 'react';

export const SideBarContext = createContext(false)

function SideBarContextProvider({children}) {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <SideBarContext.Provider value={{isOpened, setIsOpened}}>
      {children}
    </SideBarContext.Provider>
  );
}

export default SideBarContextProvider;