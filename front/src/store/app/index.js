const app = {
  state: {
    // backgroundColor: 'rgb(235, 237, 239)',
    // backgroundColorInit: 'rgb(235, 237, 239)'
  },
  mutations: {
    SET_BACKGROUND_COLOR (state, color) {
      state.backgroundColor = color
    },
    RESET_BACKGROUND_COLOR (state) {
      // state.backgroundColor = state.backgroundColorInit
    }
  }
}

export default app
