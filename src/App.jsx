import './App.css'
import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx'
import Body from './layouts/Body/Body.jsx'
import Header from './components/Header/Header.jsx'
import JournalList from './components/JournalList/JournalList.jsx'
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx'
import JournalForm from './components/JournalForm/JournalForm.jsx'
import useLocalstorage from './hooks/useLocalstorage.js';

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

  function addItem(item) {
    setNotes([
      ...mapItems(notes),
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
        <JournalList notes={mapItems(notes)}></JournalList>
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem}></JournalForm>
      </Body>
    </div>
  )
}

export default App
