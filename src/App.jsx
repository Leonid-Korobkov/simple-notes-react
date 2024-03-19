import './App.css'
import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx'
import Body from './layouts/Body/Body.jsx'
import Header from './components/Header/Header.jsx'
import JournalList from './components/JournalList/JournalList.jsx'
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx'
import JournalForm from './components/JournalForm/JournalForm.jsx'
import useLocalstorage from './hooks/useLocalstorage.js';
import {useContext, useEffect, useState} from 'react';
import BurgerMenu from './components/BurgerMenu/BurgerMenu.jsx';
import HeaderBody from './components/HeaderBody/HeaderBody.jsx';
import {SideBarContext} from './context/sidebar.context.jsx';

// const INITIAL_DATA = [
//   {
//     id: 1,
//     title: 'Подготовка к обновлению курсов',
//     text: 'Горные походы открывают удивительные природные ландшафт',
//     date: new Date()
//   },
//   {
//     id: 2,
//     title: 'Поход в годы',
//     text: 'Думал, что очень много времени',
//     date: new Date()
//   }
// ]

// const json = [
//   {
//     'id': 1,
//     'title': 'Подготовка к обновлению курсов',
//     'text': 'Горные походы открывают удивительные природные ландшафт',
//     'date': '2024-03-10T11:39:25.428Z'
//   },
//   {
//     'id': 2,
//     'title': 'Поход в годы',
//     'text': 'Думал, что очень много времени',
//     'date': '2024-03-10T11:39:25.428Z'
//   }
// ]

function mapItems(items) {
  if (!items) return []

  return items.map((el) =>
    ({
      ...el,
      date: new Date(el.date)
    }))
}

function App() {
  const [notes, setNotes] = useLocalstorage('notes')
  const [selectedItem, setSelectedItem] = useState(null)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // Track screen width
  const {isOpened, setIsOpened} = useContext(SideBarContext)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (selectedItem && screenWidth < 768) {
      setIsOpened(!isOpened)
    }
  }, [selectedItem])

  function addItem(item) {
    if (!item.id) { // Создание item
      setNotes([
        ...mapItems(notes),
        {
          ...item,
          id: notes.length > 0 ? Math.max(...notes.map((el) => el.id)) + 1 : 1,
          date: new Date(item.date ? item.date : new Date())
        }
      ])
    } else { // Обновление текущего item
      setNotes([
        ...mapItems(notes).map(i => {
          if (i.id == item.id) {
            return {...item}
          }
          return i
        })
      ])
    }
  }

  function deleteItem(id) {
    setNotes([...notes.filter(i => i.id !== id)]);
    setSelectedItem({})
  }

  function clearForm() {
    setSelectedItem(null)
    setIsOpened(!isOpened)
  }

  return (
    <div className="app">
      <LeftPanel>

        {screenWidth >= 768 ? ( // Render Header conditionally based on screen width
          <Header/>
        ) : null}

        <JournalAddButton onClick={clearForm}></JournalAddButton>
        <JournalList notes={mapItems(notes)} setItem={setSelectedItem}></JournalList>
      </LeftPanel>
      <Body>

        {screenWidth < 768 ? ( // Render Header conditionally based on screen width
          <HeaderBody>
            <BurgerMenu/>
            <Header/>
          </HeaderBody>
        ) : null}

        <JournalForm onSubmit={addItem} dataNote={selectedItem} onDeleteItem={deleteItem}></JournalForm>
      </Body>
    </div>
  )
}

export default App
