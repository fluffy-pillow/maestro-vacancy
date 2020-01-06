export const SHOW = (state) => {
  state.bShow = true
}

export const HIDE = (state) => {
  state.bShow = false
}

export const ADD_CONTENT = (state, arg) => {
  state.content = arg
}

export const REMOVE_CONTENT = (state) => {
  state.content = null
}

export const REMOVE_TITLE = (state) => {
  state.title = ''
}

export const REMOVE_DESC = (state) => {
  state.desc = ''
}

export const SET_TITLE = (state, arg) => {
  state.title = arg
}

export const SET_DESC = (state, arg) => {
  state.desc = arg
}
