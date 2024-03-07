import './App.css'
import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx'
import Body from './layouts/Body/Body.jsx'
import Header from './components/Header/Header.jsx'
import JournalList from './components/JournalList/JournalList.jsx'
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx'
import JournalForm from './components/JournalForm/JournalForm.jsx'
import { useState } from 'react'

const INITIAL_DATA = [
  // {
  //   id: 1,
  //   title: 'Подготовка к обновлению курсов',
  //   text: 'Горные походы открывают удивительные природные ландшафт',
  //   date: new Date()
  // },
  // {
  //   id: 2,
  //   title: 'Поход в годы',
  //   text: 'Думал, что очень много времени',
  //   date: new Date()
  // }
]

function App() {
  const [notes, setNotes] = useState(INITIAL_DATA)

  function addItem(item) {
    setNotes([
      ...notes,
      {
        id: notes.length > 0 ? Math.max(...notes.map((el) => el.id)) + 1 : 1,
        title: item.title,
        text: item.text,
        date: new Date(item.date ? item.date : new Date())
      }
    ])
  }

  return (
    <div className="app">
      <LeftPanel>
        <Header></Header>
        <JournalAddButton></JournalAddButton>
        <JournalList notes={notes}></JournalList>
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem}></JournalForm>
      </Body>
    </div>
  )
}

export default App
