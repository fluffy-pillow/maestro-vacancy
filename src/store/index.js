import Vue from 'vue'
import Vuex from 'vuex'

import overlay from './overlay/index'
import cookie from './cookie/index'
import popup from './popup/index'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
      overlay: overlay,
      cookie: cookie,
      popup: popup,
    }
})
