import cn from 'classnames'
import st from './JournalForm.module.css'
import Button from '../Button/Button.jsx'
import {useEffect, useReducer, useRef} from 'react';
import {formReducer, INITIAL_FORM_STATE} from './JournalForm.state.js';
import Input from '../Input/Input.jsx';

function JournalForm({onSubmit}) {
  // const [formValidState, setFormValidState] = useState(INITIAL_VALID_STATE)
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_FORM_STATE)
  const {isValid, values, isFormReadyToSubmit} = formState;

  const titleRef = useRef()
  const dateRef = useRef()
  const textRef = useRef()

  function focusOnInput() {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.text:
        textRef.current.focus();
        break;
    }
  }

  useEffect(() => {
    let timerId

    if (!isValid.title || !isValid.date || !isValid.text) {
      focusOnInput()
      timerId = setTimeout(() => {
        dispatchForm({type: 'RESET_VALIDITY'})
      }, 2000)
    }

    return () => {
      clearTimeout(timerId)
    }
  }, [isValid]);


  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({type: 'CLEAR_VALUES'})
    }
  }, [isFormReadyToSubmit, values, onSubmit]);

  function addJournalItem(e) {
    e.preventDefault();
    dispatchForm({type: 'SUBMIT'})
  }

  function inputOnChange(e) {
    const {name, value} = e.target;
    dispatchForm({type: 'SET_VALUES', payload: {[name]: value}})
  }

  return (
    <form action="#" className={st['journal-form']} name="journal-form" onSubmit={addJournalItem}>
      <div className={st['form-row']}>
        <Input ref={titleRef} onChange={inputOnChange} value={values.title} type="text" name="title"
               appearance={'title'} isValid={isValid.title}/>
      </div>

      <div className={st['form-row']}>
        <label htmlFor="date" className={st['form-label']}>
          <img src="./icons/calendar.svg" alt="Иконка календаря"/>
          <span>Дата</span>
        </label>
        <Input ref={dateRef} onChange={inputOnChange} value={values.date} type="date" name="date" id="date"
               isValid={isValid.date}/>
      </div>

      <div className={st['form-row']}>
        <label htmlFor="tag" className={st['form-label']}>
          <img src="./icons/folder.svg" alt="Иконка папки"/>
          <span>Метки</span>
        </label>
        <Input onChange={inputOnChange} value={values.tag} type="text" name="tag" id="tag"/>
      </div>

      <textarea ref={textRef} onChange={inputOnChange} value={values.text} cols="30" rows="10" name="text"
                className={cn(st.input, {[st['invalid-input']]: !isValid.text})}></textarea>
      <Button>Сохранить</Button>
    </form>
  )
}

export default JournalForm
