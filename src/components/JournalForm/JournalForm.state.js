export const INITIAL_FORM_STATE = {
  isValid: {
    title: true,
    date: true,
    text: true
  },
  values: {
    title: '',
    date: '',
    text: '',
    tag: ''
  },
  isFormReadyToSubmit: false
}

export function formReducer(state, action) {
  switch (action.type) {
    case 'SET_VALUES':
      return {...state, values: {...state.values, ...action.payload}}
    case 'CLEAR_VALUES':
      return {...state, values: INITIAL_FORM_STATE.values, isFormReadyToSubmit: false}
    case 'RESET_VALIDITY':
      return {...state, isValid: INITIAL_FORM_STATE.isValid}
    case 'SUBMIT': {
      const titleValid = state.values.title?.trim().length > 0
      const dateValid = state.values.date
      const textValid = state.values.text?.trim().length > 0

      return {
        ...state,
        isValid: {
          title: titleValid,
          date: dateValid,
          text: textValid
        },
        isFormReadyToSubmit: titleValid && dateValid && textValid
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}