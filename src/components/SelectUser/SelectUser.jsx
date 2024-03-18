import {useContext} from 'react';
import {UserContext} from '../../context/user.context.jsx';
import st from './SelectUser.module.css'

function SelectUser() {
  const {userId, setUserId} = useContext(UserContext);

  function changeUser(e) {
    setUserId(Number(e.target.value))
  }

  return (
    <>
      <select name="user" id="user" value={userId} onChange={changeUser} className={st['select']}>
        <option value="1">Вася</option>
        <option value="2">Коля</option>
        <option value="3">Петя</option>
      </select>
    </>
  )
}

export default SelectUser
