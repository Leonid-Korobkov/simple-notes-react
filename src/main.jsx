import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserContextProvider from './context/user.context.jsx';
import SideBarContextProvider from './context/sidebar.context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <SideBarContextProvider>
        <App/>
      </SideBarContextProvider>
    </UserContextProvider>
  </React.StrictMode>
)
