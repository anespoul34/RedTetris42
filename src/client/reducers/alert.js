const alert = (state = { message: '' }, action) => {
  switch (action.type) {
  case 'ERROR_MESSAGE':
    return { message: action.message }
  default:
    return state
  }
}

export default alert
