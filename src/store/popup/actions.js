export function show({commit}) {
    commit('SHOW')
}

export function hide({commit}) {
    commit('HIDE')
}

export function popup({commit}, args) {
  commit('ADD_CONTENT', args.content)
  commit('SET_TITLE', args.title)
  commit('SET_DESC', args.desc)
  commit('SHOW')
}

export function destroy({commit}) {
  commit('REMOVE_CONTENT')
  commit('REMOVE_TITLE')
  commit('REMOVE_DESC')
  commit('HIDE')
}
