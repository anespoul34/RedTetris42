const view = (state = {}, action) => {
  switch (action.type) {
  case 'VIEW': {
    return { view: action.view }
  }
  default:
    return state
  }
}

export default view
