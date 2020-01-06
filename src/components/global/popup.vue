<template>
    <div class="popup">
      <div class="popup__head">
        <button class="popup__close-button" @click="handleClick">

        </button>
      </div>
      <div class="popup__body">
        <div class="popup__content">
          <h3 class="popup__title">
            {{title}}
          </h3>
          <p class="popup__desc">
            {{desc}}
          </p>

          <component :is="content">

          </component>
        </div>
      </div>
    </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'


  export default {
        name: "popup",
        methods: {
          ...mapActions({
            destroy: 'popup/destroy',
            hideOverlay: 'overlay/hide'
          }),
          handleClick () {
            this.destroy()
            if (!this.bShowCookie) {
              this.hideOverlay()
            }
          }
        },
        computed: {
          ...mapGetters({
            bShowCookie: 'cookie/isShow',
            title: 'popup/getTitle',
            desc: 'popup/getDesc',
            content: 'popup/getContent',
          })
        }
    }
</script>

<style scoped lang="scss">
.popup {
  padding-top: 20px;
  padding-bottom: 50px;
  position: fixed;
  z-index: 3;
  min-width: 540px;
  background-color: #ffffff;
  border-radius: 16px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-height: 90vh;
  display: flex;
  flex-direction: column;

  @include mobile {
    min-width: unset;
  }


  &__head {
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
  }

  &__body {
    overflow-y: scroll;
  }

  &__close-button {
    margin-left: auto;
    width: 30px;
    height: 30px;
    background-image: url(/assets/img/cross.svg);
    background-color: #F8FAFD;
    background-position: center;
    background-repeat: no-repeat;
    border: none;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
  }

  &__title {
    font-weight: 500;
    font-size: 22px;
    line-height: 26px;
    text-align: center;
    letter-spacing: 0.04px;
    font-feature-settings: 'case' on;
    color: #2B2B2B;
  }

  &__desc {
    width: 408px;
    text-align: center;
    letter-spacing: 0.04px;
    font-feature-settings: 'case' on;
    color: #61707D;
    font-size: 15px;
    line-height: 26px;
    margin: 20px auto;

    @include mobile {
      width: auto;
    }
  }

  &__content {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
