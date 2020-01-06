<template>
  <div class="video">
    <div class="video__sidebar">
      <div class="video__company">
        <logo class="video__company-logo"/>
        <div class="video__company-title">{{company.name}}</div>
      </div>
      <div class="video__intro-text" v-if="activeStep === 0">
        {{intro.text}}
      </div>
      <div class="video__intro-text video__intro-text--check" v-else-if="activeStep === 1">
        {{check.text}}
      </div>
      <div class="video__intro-text video__intro-text--check" v-else-if="activeStep === 2">
        {{check.textFail}}
      </div>
    </div>
    <div class="video__content">
      <div class="video__ask" v-if="activeStep === 0">
        <img class="video__illustration" src="@/assets/img/video.svg" alt="">
        <div class="video__ask-buttons">
          <a class="video__ask-button--agree" @click="prepare()">Продолжить</a>
          <a class="video__ask-button--normal">Я не хочу отвечать на такие вопросы</a>
        </div>
      </div>
      <div class="video__check" v-else>
        <div class="video__player">
          <div ref="localVideo" class="video__player-cam"></div>
          <a class="video__player-button" @click="start()">Разрешить доступ к камере</a>
        </div>
      </div>
    </div>
    <div class="video__footer" :class="{'video__footer--dark-bg': activeStep === 0}">
      <img class="video__footer-img--inv" src='@/assets/img/logo-inv.svg'/>
      <img class="video__footer-img--def" src='@/assets/img/logo.svg'/>
    </div>
  </div>
</template>

<script>
  import logo from '@/components/widgets/company/logo.vue';

  export default {
    components: {
      logo,
    },
    data() {
      return {
        localVideo: null,
        stream: null,
        activeStep: 0,
        company: {
          name: 'McDonald’s'
        },
        intro: {
          text: 'Некоторые вопросы требуют от вас запись видео/аудио ответа.',
        },
        check: {
          text: 'Пожалуйста, проверьте вашу видео камеру и микрофон',
          textFail: 'Ваше устройство не поддерживает видео/аудио запись'
        }
      }
    },
    methods: {
      prepare() {
        this.activeStep = 1;
          Flashphoner.init();
      },
/*      checkCam() {
        this.activeStep = 2;
      },*/
      start () {
          Flashphoner.createSession({urlServer: "wss://wcs5-eu.flashphoner.com:8443"}).on(Flashphoner.constants.SESSION_STATUS.ESTABLISHED,  (session) => {
              //session connected, start streaming
              this.startStreaming(session);
          }).on(Flashphoner.constants.SESSION_STATUS.DISCONNECTED, () => {
              console.log("DISCONNECTED");
          }).on(Flashphoner.constants.SESSION_STATUS.FAILED, () => {
              console.log("FAILED");
          });
      },
      stop () {
          this.stream.stop();
      },
      startStreaming(session) {
          this.stream = session.createStream({
              name: "stream222",
              display: this.$refs.localVideo,
              cacheLocalResources: true,
              receiveVideo: false,
              receiveAudio: false,
              record: true
          });

          this.stream.on(Flashphoner.constants.STREAM_STATUS.PUBLISHING, (publishStream) => {
              console.log(Flashphoner.constants.STREAM_STATUS.PUBLISHING);
          }).on(Flashphoner.constants.STREAM_STATUS.UNPUBLISHED, (stream) => {
              console.log(Flashphoner.constants.STREAM_STATUS.UNPUBLISHED + " " + stream.getRecordInfo());
          }).on(Flashphoner.constants.STREAM_STATUS.FAILED, ()=> {
              console.log(Flashphoner.constants.STREAM_STATUS.FAILED);
              this.activeStep = 2
          });

          this.stream.publish();
      }
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .video {
    background: #2B2B2B;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 408px 722px;
    grid-template-rows: 1fr;
    grid-column-gap: 122px;
    grid-row-gap: 112px;
    justify-content: center;
    padding: 60px 0 0;


    @include small-desktop {
      grid-template-columns: 378px 722px;
    }

    @include tablet {
      grid-template-columns: 1fr;
      grid-row-gap: unset;
    }

    @include mobile {
      grid-template-columns: 1fr;
      grid-row-gap: unset;
    }


    &__sidebar {
      @include tablet {
        padding: 0 40px;
      }

      @include mobile {
        padding: 0 15px;
      }
    }

    &__company {
      display: flex;
      align-items: center;
      margin: 0 0 80px;

      @include tablet {
        margin: 0 0 50px;
      }

      &-logo {
        width: 54px;
        height: 54px;
        margin: 0 20px 0 0;
      }

      &-title {
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 22px;
        color: #FFFFFF;
      }
    }

    &__ask {
      @include tablet {
        display: flex;
        flex-direction: column;
      }
      @include mobile {
        display: flex;
        flex-direction: column;
      }
    }

    &__intro {
      &-text {
        font-style: normal;
        font-weight: bold;
        font-size: 25px;
        line-height: 38px;
        color: #FFFFFF;

        @include mobile {
          font-size: 18px;
          line-height: 28px;
        }

        &--check {
          margin: 0 0 40px;
          @include mobile {
            margin: 0;
          }
        }
      }
    }

    &__illustration {
      width: 664px;
      margin: 38px 0 64px 58px;

      @include tablet {
        width: 594px;
        margin: 0 auto 50px;
      }

      @include mobile {
        width: 339px;
        margin: 0 auto 76px;
      }
    }

    &__ask {
      &-buttons {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        padding: 0 0 0 58px;

        @include tablet {
          padding: 0 0 61px;
        }

        @include mobile {
          padding: 0;
        }
      }
      &-button {
        &--agree {
          background: #3DD498;
          border-radius: 12px;
          font-style: normal;
          font-weight: normal;
          font-size: 18px;
          line-height: 22px;
          text-align: center;
          color: #FFFFFF;
          padding: 14px 36px;
          min-width: 390px;
          display: inline-block;
          margin: 0 0 20px;
          cursor: pointer;
          @include mobile {
            min-width: 300px;
            padding: 10px 15px;
          }
        }
        &--normal {
          background: #3DD498;
          border-radius: 12px;
          font-style: normal;
          font-weight: normal;
          font-size: 18px;
          line-height: 22px;
          text-align: center;
          color: #FFFFFF;
          padding: 14px 36px;
          min-width: 390px;
          display: inline-block;
          background: transparent;
          color: #EDEDED;
          border: 1px solid #656565;
          cursor: pointer;
          @include mobile {
            min-width: 300px;
            padding: 10px 15px;
            font-size: 15px;
          }
        }
      }
    }

    &__footer {
      margin: 0 0 60px;
      &-img {
        &--def {
          display: none;

          @include tablet {
            display: block;
          }

          @include mobile {
            display: block;
          }
        }

        &--inv {
          display: block;

          @include tablet {
            display: none;
          }

          @include mobile {
            display: none;
          }
        }
      }

      @include tablet {
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        padding-bottom: 60px;
        margin: 0;

      }

      @include mobile {
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        padding-bottom: 50px;
        margin: 0;
      }

      &--dark-bg {
        @include tablet {
          background-color: transparent;
        }
        @include mobile {
          background-color: transparent;
        }
      }
    }

    &__player {
      background: #FFFFFF;
      border-radius: 24px;
      padding: 30px 30px 50px;
      display: flex;
      flex-direction: column;
      align-items: center;

      @include tablet {
        padding: 16px 16px 60px;
        border-radius: 24px 24px 0 0;
      }

      @include mobile {
        padding: 16px 16px 60px;
        border-radius: 24px 24px 0 0;
      }

      &-cam {
        background: #2A2A2A;
        border-radius: 16px;
        height: 500px;
        width: 100%;
      }

      &-button {
        display: inline-block;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        color: #2A2A2A;
        padding: 14px 22px;
        border: 1px solid #2A2A2A;
        box-sizing: border-box;
        border-radius: 12px;
        cursor: pointer;
        margin: 50px 0 0;
        min-width: 260px;
      }
    }
  }
</style>
