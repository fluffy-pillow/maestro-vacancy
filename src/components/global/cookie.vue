<template>
    <div class="cookie-widget">
      <div class="cookie-widget__head">
        <h3 class="cookie-widget__title">
          Файлы cookies
        </h3>
      </div>
      <div class="cookie-widget__body">
        <p class="cookie-widget__desc">
          Некоторые функции могут не работать, если не установлены cookies. Чтобы узнать больше об использовании cookies на нашем сайте,
          <a href="#" class="cookie-widget__more">перейдите на информационную страницу Cookies.</a>
        </p>
        <div class="cookie-widget__controls">
          <button class="cookie-widget__button cookie-widget__button--deny" @click="deny">
            Отклонить
          </button>
          <button class="cookie-widget__button cookie-widget__button--agree" @click="allow">
            Разрешить
          </button>
        </div>
      </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "cookie",
        methods: {
          ...mapActions({
            hide: 'cookie/hide',
            hideOverlay: 'overlay/hide'
          }),
          deny () {
            this.hide()
            if (!this.bShowPopup) {
              this.hideOverlay()
            }
          },
          allow () {
            this.hide()
            if (!this.bShowPopup) {
              this.hideOverlay()
            }
          }
        },
        computed: {
          ...mapGetters({
            bShowPopup: 'popup/isShow'
          })
        }
    }
</script>

<style scoped lang="scss">
.cookie-widget {
  position: fixed;
  bottom: 30px;
  padding: 30px;
  background: #FFFFFF;
  border: 2px solid #61707D;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  width: 1180px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  z-index: 10;

  @include tablet {
    width: 668px;
  }

  @include mobile {
    width: 343px;
    padding: 16px;
  }

  &__title {
    font-weight: 500;
    font-size: 22px;
    line-height: 26px;
    letter-spacing: 0.04px;
    color: #000000;
  }

  &__more {
    text-decoration-line: underline;
    color: #000000;
  }

  &__body {
    margin-top: 14px;
    display: flex;

    @include mobile {
      flex-direction: column;
    }
  }

  &__desc {
    font-size: 15px;
    line-height: 22px;
    color: #000000;
  }

  &__controls {
    display: flex;

    @include tablet {
      flex-direction: column;
    }

    @include mobile {
      flex-direction: row;
      justify-content: space-between;
      margin-top: 20px;
    }
  }

  &__button {
    width: 145px;
    height: 40px;
    border-radius: 12px;
    font-size: 18px;
    line-height: 22px;
    color: #FFFFFF;
    border: none;
    margin-left: 30px;
    cursor: pointer;
    outline: 0;

    &--agree {
      background: #3DD498;

      @include tablet {
        margin-top: 20px;
      }

      @include mobile {
        margin-top: 0;
      }
    }

    &--deny {
      background: #C4C4C4;

      @include tablet {
        margin-top: 0;
      }
    }

    @include tablet {
      margin-left: 20px;
    }

    @include mobile {
      margin-left: 0;
    }
  }
}
</style>
