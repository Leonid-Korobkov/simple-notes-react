import './JournalForm.css'
import Button from '../Button/Button.jsx'

function JournalForm({ onSubmit }) {
  function addJournalItem(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formProps = Object.fromEntries(formData)
    onSubmit(formProps)
  }

  return (
    <form action="#" className="journal-form" name="journal-form" onSubmit={addJournalItem}>
      <input type="text" name="title" />
      <input type="date" name="date" />
      <input type="text" name="tag" />
      <textarea cols="30" rows="10" name="text"></textarea>
      <Button>Сохранить</Button>
    </form>
  )
}

export default JournalForm
