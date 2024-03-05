import CardButton from '../CardButton/CardButton'
import JournalItem from '../JournalItem/JournalItem'
import './JournalList.css'

function JournalList({ notes }) {
  if (notes.length === 0) {
    return <div>Записей нет 🙃</div>
  }

  function sortNotes(a, b) {
    if (a.date > b.date) return 1
    else return -1
  }

  return (
    <div className="journal-list">
      {notes.sort(sortNotes).map((el) => (
        <CardButton key={el.id}>
          <JournalItem title={el.title} date={el.date} text={el.text}></JournalItem>
        </CardButton>
      ))}
    </div>
  )
}

export default JournalList
