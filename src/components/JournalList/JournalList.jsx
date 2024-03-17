import CardButton from '../CardButton/CardButton'
import JournalItem from '../JournalItem/JournalItem'
import './JournalList.css'
import {UserContext} from '../../context/user.context.jsx';
import {useContext, useMemo} from 'react';

function JournalList({notes, setItem}) {
  const {userId} = useContext(UserContext)

  const filterAndSortNotes = useMemo(() => (notes) =>
      notes.filter(el => el.userId === userId).sort(sortNotes),
    [notes, userId]);

  if (notes.length === 0) {
    return <div>Записей пока нет 🙃. Добавьте первую запись</div>
  }

  function sortNotes(a, b) {
    if (a.date > b.date) return 1
    else return -1
  }

  return (
    <div className="journal-list">
      {filterAndSortNotes(notes).map((el) => (
        <CardButton key={el.id} onClick={() => setItem(el)}>
          <JournalItem title={el.title} date={el.date} text={el.text}></JournalItem>
        </CardButton>
      ))}
    </div>
  )
}

export default JournalList
