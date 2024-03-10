import cn from 'classnames'
import st from './JournalForm.module.css'
import Button from '../Button/Button.jsx'
import {useEffect, useReducer} from 'react';
import {formReducer, INITIAL_FORM_STATE} from './JournalForm.state.js';

function JournalForm({onSubmit}) {
  // const [formValidState, setFormValidState] = useState(INITIAL_VALID_STATE)
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_FORM_STATE)
  const {isValid, values, isFormReadyToSubmit} = formState;
  console.log(isValid)


  useEffect(() => {
    let timerId

    if (!isValid.title || !isValid.date || !isValid.text) {
      timerId = setTimeout(() => {
        dispatchForm({type: 'RESET_VALIDITY'})
        // setFormValidState(INITIAL_VALID_STATE)
      }, 2000)
    }

    return () => {
      clearTimeout(timerId)
    }
  }, [isValid]);


  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
    }
  }, [isFormReadyToSubmit]);

  function addJournalItem(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    console.log(formProps)
    dispatchForm({type: 'SUBMIT', payload: formProps})
  }

  return (
    <form action="#" className={st['journal-form']} name="journal-form" onSubmit={addJournalItem}>
      <div className={st['form-row']}>
        <input type="text" name="title"
               className={cn(st['input-title'], st['input'], {[st['invalid-input']]: !isValid.title})}/>
      </div>

      <div className={st['form-row']}>
        <label htmlFor="date" className={st['form-label']}>
          <img src="./icons/calendar.svg" alt="Иконка календаря"/>
          <span>Дата</span>
        </label>
        <input type="date" name="date" id="date"
               className={cn(st.input, {[st['invalid-input']]: !isValid.date})}/>
      </div>

      <div className={st['form-row']}>
        <label htmlFor="tag" className={st['form-label']}>
          <img src="./icons/folder.svg" alt="Иконка папки"/>
          <span>Метки</span>
        </label>
        <input type="text" name="tag" id="tag" className={st.input}/>
      </div>

      <textarea cols="30" rows="10" name="text"
                className={cn(st.input, {[st['invalid-input']]: !isValid.text})}></textarea>
      <Button>Сохранить</Button>
    </form>
  )
}

export default JournalForm
