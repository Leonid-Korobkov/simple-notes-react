import './App.css'
import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx'
import Body from './layouts/Body/Body.jsx'
import Header from './components/Header/Header.jsx'
import JournalList from './components/JournalList/JournalList.jsx'
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx'
import JournalForm from './components/JournalForm/JournalForm.jsx'
import useLocalstorage from './hooks/useLocalstorage.js';
import UserContextProvider from './context/user.context.jsx';
import {useReducer, useState} from 'react';
import {formReducer, INITIAL_FORM_STATE} from './components/JournalForm/JournalForm.state.js';

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
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_FORM_STATE)
  const [notes, setNotes] = useLocalstorage('notes')
  const [selectedItem, setSelectedItem] = useState(null)

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
  }

  return (
    <UserContextProvider>
      <div className="app">
        <LeftPanel>
          <Header></Header>
          <JournalAddButton onClick={clearForm}></JournalAddButton>
          <JournalList notes={mapItems(notes)} setItem={setSelectedItem}></JournalList>
        </LeftPanel>
        <Body>
          <JournalForm onSubmit={addItem} dataNote={selectedItem} onDeleteItem={deleteItem}></JournalForm>
        </Body>
      </div>
    </UserContextProvider>
  )
}

export default App
