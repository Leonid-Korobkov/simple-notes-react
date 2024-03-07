import './JournalForm.css'
import Button from '../Button/Button.jsx'
import {useState} from 'react';

function JournalForm({onSubmit}) {
  const [formValidState, setFormValidState] = useState({
    title: true,
    date: true,
    text: true
  })

  function addJournalItem(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let isFormValid = true
    for (const field of ['title', 'date', 'text']) {
      if (!formProps[field]?.trim().length > 0) {
        setFormValidState(prevState => ({
          ...prevState,
          [field]: false
        }));
        isFormValid = false;
      } else {
        setFormValidState(prevState => ({
          ...prevState,
          [field]: true
        }));
      }
    }

    if (!isFormValid) {
      return
    }
    onSubmit(formProps);
  }


  return (
    <form action="#" className="journal-form" name="journal-form" onSubmit={addJournalItem}>
      <input type="text" name="title" className={'input ' + (formValidState.title ? '' : 'invalid-input')}/>
      <input type="date" name="date" className={'input ' + (formValidState.date ? '' : 'invalid-input')}/>
      <input type="text" name="tag"/>
      <textarea cols="30" rows="10" name="text"
                className={'input ' + (formValidState.text ? '' : 'invalid-input')}></textarea>
      <Button>Сохранить</Button>
    </form>
  )
}

export default JournalForm
