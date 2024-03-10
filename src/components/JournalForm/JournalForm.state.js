export const INITIAL_FORM_STATE = {
  isValid: {
    title: true,
    date: true,
    text: true
  },
  values: {
    title: undefined,
    date: undefined,
    text: undefined
  },
  isFormReadyToSubmit: false
}

export function formReducer(state, action) {
  switch (action.type) {
    case 'RESET_VALIDITY': {
      return {
        ...state,
        isValid: INITIAL_FORM_STATE.isValid
      }
    }
    case 'SUBMIT': {
      const titleValid = action.payload.title?.trim().length > 0
      const dateValid = action.payload.date?.trim().length > 0
      const textValid = action.payload.text?.trim().length > 0

      return {
        values: action.payload,
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