<template>
    <div class="overlay" @click="handleClick">

    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        name: "overlay",
        methods: {
          ...mapActions({
            hide: 'overlay/hide',
            destroyPopup: 'popup/hide'
          }),
          handleClick () {
            if (!this.bCookieIsShow) {
              this.hide()
              this.destroyPopup()
            }
          }
        },
        computed: {
          ...mapGetters({
            bCookieIsShow: 'cookie/isShow'
          })
        }
    }
</script>

<style scoped>
  .overlay {
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    top: 0;
    z-index: 3;
  }
</style>
