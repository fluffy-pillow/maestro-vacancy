<template lang="pug">
  div(id="app")
    transition(name="fade")
      overlay(v-if="bShowOverlay")
    transition(name="fade")
      cookie(v-if="bShowCookie")
    transition(name="fade")
      popup(v-if="bShowPopup")
    router-view
</template>

<script>
import {mapGetters} from 'vuex'
import Cookie from "@/components/global/cookie";
import Overlay from "@/components/global/overlay";
import Popup from "@/components/global/popup";

export default {
  name: 'app',
  components: {Overlay, Cookie, Popup},
  computed: {
      ...mapGetters({
          bShowOverlay: 'overlay/isShow',
          bShowCookie: 'cookie/isShow',
          bShowPopup: 'popup/isShow'
      })
  }
}
</script>

<style lang='scss'>
  html {
    font-family: $gilroy;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    overflow-x: hidden;
  }
  body {
    overflow-x: hidden;
  }
  .main {
    /**  position: relative;**/
  }
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }
  .button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
  }
  .button--green:hover {
    color: #fff;
    background-color: #3b8070;
  }
  .button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
  }
  .button--grey:hover {
    color: #fff;
    background-color: #35495e;
  }
</style>

<style lang="scss">
  .video {
      &__player-cam {
          display: flex;
          & > video {
              width: 100%;
          }
      }
  }

  .company {
    &__title {
      font-style: normal;
      font-weight: bold;
      font-size: 22px;
      line-height: 22px;
      color: #000000;
      margin: 0 0 20px;
      @include tablet {
        margin: 0 0 10px;
        /*font-size: 22px;*/
      }
      @include mobile {
        margin: 0 0 7px;
        font-size: 20px;
      }
    }
    &__url {
      display: inline-block;
      font-weight: normal;
      font-size: 15px;
      line-height: 22px;
      color: #0096EB;
      margin: 0;
      text-decoration: none;
    }
    &__adress {
      font-style: normal;
      font-weight: 300;
      font-size: 15px;
      line-height: 22px;
      color: #000000;
      margin: 0;
    }
    &__about {
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 22px;
      color: #656565;
      margin: 0;
      align-self: flex-start;
    }
  }
</style>