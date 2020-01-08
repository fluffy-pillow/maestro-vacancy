<template>
  <div class="video">
    <div class="video__sidebar">
      <div class="video__company">
        <logo class="video__company-logo"/>
        <div class="video__company-title">{{company.name}}</div>
        <div class="video__questions-time" v-if="!(activeStep === 'none' || activeStep === 'init')">
          <div class="video__questions-time--icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.99303 1C12.4764 1 14.7249 2.00983 16.3571 3.6355C17.9828 5.26814 18.9926 7.51661 18.9926 10C18.9926 12.4834 17.9828 14.7319 16.3571 16.3645C14.7245 17.9902 12.4764 19 9.99303 19C7.50964 19 5.2616 17.9902 3.63593 16.3645C2.00329 14.7319 1 12.4838 1 10C1 7.51661 2.00286 5.26814 3.6355 3.6355C5.2616 2.00983 7.50964 1 9.99303 1ZM14.5798 9.50881C14.8495 9.50881 15.064 9.73022 15.064 10C15.064 10.2698 14.8495 10.4912 14.5798 10.4912H10.007H9.99303C9.81303 10.4912 9.65395 10.3875 9.57114 10.2423L9.56417 10.2354L9.55719 10.2214V10.2144L9.55022 10.2005L9.54325 10.1865V10.1796L9.53627 10.1656L9.5293 10.1586V10.1447L9.52232 10.1308V10.1238L9.51535 10.1098V10.0959V10.0889V10.0819L9.50838 10.075V10.061V10.0471V10.0349V10.0279V10.0139V10V4.14063C9.50838 3.87085 9.72281 3.65642 9.99259 3.65642C10.2624 3.65642 10.4838 3.87085 10.4838 4.14063V9.50881H14.5798ZM15.6654 4.3276C14.2128 2.87496 12.2066 1.98237 9.99303 1.98237C7.77942 1.98237 5.77327 2.87453 4.32063 4.3276C2.87496 5.78024 1.9754 7.78639 1.9754 10C1.9754 12.2136 2.87453 14.2198 4.32063 15.6728C5.77327 17.1255 7.77942 18.0181 9.99303 18.0181C12.2066 18.0181 14.2128 17.1255 15.6654 15.6728C17.1181 14.2202 18.0176 12.214 18.0176 10C18.0176 7.78639 17.1185 5.78024 15.6654 4.3276Z" fill="white" stroke="white" stroke-width="0.3"/>
            </svg>
          </div>
          {{ (globalTime + 1) |  moment("mm:ss")}}
        </div>
      </div>
      <div class="video__questions-steps" :style="`grid-template-columns: repeat(${questions.length}, 1fr);`" v-if="!(activeStep === 'none' || activeStep === 'init')">
        <div class="video__questions-step" :class="{'video__questions-step--active': index <= activeItem}"
             v-for="(item, index) in questions" :key="index"></div>
      </div>

      <div class="video__intro-text" v-if="activeStep === 'none'">
        {{intro.text}}
      </div>
      <div class="video__intro-text video__intro-text--check" v-else-if="activeStep === 'init'">
        {{check.text}}
      </div>
      <div class="video__intro-text video__intro-text--check" v-else-if="activeStep === 'fail'">
        {{check.textFail}}
      </div>
      <div class="video__intro-text video__intro-text--check" v-else>
        {{questions[activeItem].question}}
      </div>
    </div>
    <div class="video__content">
      <div class="video__ask" v-if="activeStep === 'none'">
        <img class="video__illustration" src="@/assets/img/video.svg" alt="">
        <div class="video__ask-buttons">
          <a class="video__ask-button--agree" @click="init()">Продолжить</a>
          <a class="video__ask-button--normal">Я не хочу отвечать на такие вопросы</a>
        </div>
      </div>
      <div class="video__check" v-else>
        <div class="video__player">
          <div ref="localVideo" class="video__player-cam">
            <div class="video__player-cam__timer" v-if="(activeStep === 'ready' || activeStep === 'recording')">
                <div class="video__player-cam__timer__rec-indicator" v-if="activeStep === 'recording'">
                </div>
                {{(this.time + 1) | moment('mm:ss')}} / {{(questions[activeItem].timer + 1) | moment('mm:ss')}}
            </div>
            <div class="video__player-cam__no-camera-screen" v-if="((activeStep === 'none' || activeStep === 'init' || activeStep === 'fail'))">
              <div class="video__player-cam__no-camera-screen--icon">>
                <svg width="90" height="71" viewBox="0 0 90 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60.5115 8.71354H9.70854L2.54554 0.497537C2.01854 -0.106463 1.10154 -0.169464 0.497537 0.357536C-0.106463 0.884536 -0.169464 1.80154 0.357536 2.40554L5.85654 8.71354H1.45254C1.07054 8.71354 0.696537 8.86854 0.426537 9.13854C0.155537 9.40854 0.000536423 9.78254 0.000536423 10.1645V60.4805C0.000536423 60.8625 0.155537 61.2365 0.425537 61.5065C0.695537 61.7765 1.06954 61.9315 1.45154 61.9315H52.2535L59.4155 70.1465C59.9425 70.7505 60.8595 70.8135 61.4635 70.2865C62.0675 69.7595 62.1305 68.8425 61.6035 68.2385L56.1045 61.9305H60.5095C60.8915 61.9305 61.2655 61.7755 61.5355 61.5055C61.8055 61.2355 61.9605 60.8615 61.9605 60.4795V10.1645C61.9605 9.78254 61.8055 9.40854 61.5355 9.13754C61.2655 8.86654 60.8935 8.71354 60.5115 8.71354ZM2.90354 59.0285V11.6165H8.38754L49.7225 59.0295H2.90354V59.0285ZM53.5755 59.0285L12.2395 11.6165H59.0595V59.0295H53.5755V59.0285Z" fill="#555555"/>
                  <path d="M89.2805 15.7625C88.8325 15.5015 88.2855 15.4975 87.8345 15.7535L69.1075 26.3455C68.6515 26.6035 68.3705 27.0855 68.3705 27.6095V43.0375C68.3705 43.5605 68.6525 44.0435 69.1075 44.3005L87.8345 54.8925C88.2855 55.1475 88.8325 55.1445 89.2805 54.8835C89.7285 54.6225 90.0005 54.1485 90.0005 53.6295V17.0165C90.0005 16.4975 89.7285 16.0235 89.2805 15.7625ZM71.2735 42.1905V28.4555L87.0975 19.5055V51.1405L71.2735 42.1905Z" fill="#555555"/>
                </svg>
              </div>
            </div>
            <div class="video__player-cam__processing-screen" v-if="activeStep === 'processing'">
              <div class="video__player-cam__processing-screen--icon">
                <svg width="110" height="110" viewBox="0 0 110 110">
                  <circle cx="55" cy="55" r="50" fill="transparent" stroke="#FFFFFF" stroke-width="4" opacity="0.2"></circle>

                  <circle cx="55" cy="55" r="50" fill="transparent" stroke="#FFFFFF"
                          stroke-width="8" stroke-dasharray="300"
                          :stroke-dashoffset="150"
                  ></circle>
                </svg>
              </div>
            </div>
            <div class="video__player-cam__controls">
              <button class="video__player-cam__record-button" :disabled="activeStep === 'none' || activeStep === 'init'"
                      @click="recordButtonHandler"
              >
                <svg width="100%" height="100%" viewBox="0 0 58 58" class="video__player-cam__record-button--icon">
                  <circle cx="29" cy="29" r="27" fill="transparent" stroke="#FFFFFF" stroke-width="4" opacity="0.2"></circle>

                  <circle cx="29" cy="29" r="27" fill="transparent" stroke="#FFFFFF"
                          stroke-width="4" stroke-dasharray="169"
                          :stroke-dashoffset="(169/100) * (100 - (100/questions[activeItem].timer) * time)"
                  ></circle>

                  <rect v-if="activeStep === 'recording'" width="28" height="28" rx="6" x="15.5" y="15.5" fill="#E70B18"></rect>
                  <circle v-else cx="29" cy="29" r="18.5"
                        :opacity="(activeStep === 'ready' || activeStep === 'stop' || activeStep === 'processing' || activeStep === 'completed') ? '1' : '0.2'"
                        :fill="(activeStep === 'ready' || activeStep === 'stop' || activeStep === 'processing' || activeStep === 'completed') ? '#E70B18' : '#FFFFFF'"
                  ></circle>

                  <mask id="mask1" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16" v-if="activeStep === 'processing' || activeStep === 'completed'">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.64 2.35C12.19 0.9 10.2 0 7.99 0C3.57 0 0 3.58 0 8C0 12.42 3.57 16 7.99 16C11.72 16 14.83 13.45 15.72 10H13.64C12.82 12.33 10.6 14 7.99 14C4.68 14 1.99 11.31 1.99 8C1.99 4.69 4.68 2 7.99 2C9.65 2 11.13 2.69 12.21 3.78L8.99 7H15.99V0L13.64 2.35Z" fill="white"/>
                  </mask>
                  <g mask="url(#mask1)" transform="translate(21, 21)" v-if="activeStep === 'processing' || activeStep === 'completed'">
                    <rect x="-5" y="-5" width="26" height="26" fill="white"/>
                  </g>


                </svg>
              </button>

              <button class="video__player-cam__pause-button" v-if="activeStep === 'recording'">
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="12" height="14">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 14H4V0H0V14ZM8 0V14H12V0H8Z" fill="white"/>
                  </mask>
                  <g mask="url(#mask0)">
                    <rect x="-7" y="-6" width="26" height="26" fill="black"/>
                  </g>
                </svg>
              </button>

              <button class="video__player-cam__play-button" v-if="activeStep === 'processing' || activeStep === 'completed'">
                <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="11" height="14">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V14L11 7L0 0Z" fill="white"/>
                  </mask>
                  <g mask="url(#mask0)">
                    <rect x="-8" y="-6" width="26" height="26" fill="black"/>
                  </g>
                </svg>

              </button>
            </div>
          </div>
          <a class="video__player-button" @click="allowAccess" v-if="activeStep === 'init'">Разрешить доступ к камере</a>
          <a class="video__player-button" v-if="activeStep === 'fail'">OK</a>
          <a class="video__player-answer-button" @click="send" v-if="activeStep === 'completed'">Ответить</a>

          <div class="video__player-message" v-if="activeStep === 'ready'">Можно начинать запись</div>
          <div class="video__player-message" v-if="activeStep === 'recording'">Идет запись</div>
          <div class="video__player-message" v-if="activeStep === 'processing'">Обработка видео</div>
        </div>
      </div>
    </div>
    <div class="video__footer" :class="{'video__footer--dark-bg': activeStep === 'none'}">
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
                activeStep: 'none',
                serverURL: 'wss://wcs5-us.flashphoner.com:8443/72976f26',
                company: {
                    name: 'McDonald’s'
                },
                intro: {
                    text: 'Некоторые вопросы требуют от вас запись видео/аудио ответа.',
                },
                check: {
                    text: 'Пожалуйста, проверьте вашу видео камеру и микрофон',
                    textFail: 'Ваше устройство не поддерживает видео/аудио запись'
                },
                activeItem: 0,
                time: 0,
                timerId: null,
                globalTimerId: null,
                globalTime: 1,
                stream: null,
                videoLinks: [],
                questions: [
                    {
                        timer: 1000,
                        question: 'Как не следует поступать,  если гость недоволен процедурой подачи пищи, сравнивая ее с сервисом в других ресторанах?'
                    },
                    {
                        timer: 15,
                        question: 'Как не следует поступать,  если гость недоволен процедурой подачи пищи, сравнивая ее с сервисом в других ресторанах?'
                    },
                    {
                        timer: 15,
                        question: 'Как не следует поступать,  если гость недоволен процедурой подачи пищи, сравнивая ее с сервисом в других ресторанах?'
                    }
                ]
            }
        },
        methods: {
            init() {
                this.activeStep = 'init'
            },
            stop () {
               this.stream.stop()
               this.stream = null
               this.time = 0
               clearInterval(this.timerId)
               this.activeStep = 'processing'
            },
            start () {
                console.log("Create new session with url: " + this.serverURL);
                Flashphoner.createSession({urlServer: this.serverURL}).on(Flashphoner.constants.SESSION_STATUS.ESTABLISHED, (session) => {
                    console.log(session.status());
                    this.publishStream(session);
                }).on(Flashphoner.constants.SESSION_STATUS.DISCONNECTED, () => {
                    console.log(Flashphoner.constants.SESSION_STATUS.DISCONNECTED);
                }).on(Flashphoner.constants.SESSION_STATUS.FAILED, () => {
                    console.log(Flashphoner.constants.SESSION_STATUS.FAILED);
                });
            },
            runGlobalTimer () {
                this.globalTimerId = setInterval(() => {
                    this.globalTime += 1
                }, 1000)
            },
            allowAccess (e) {
                e.target.style.pointerEvents = 'none'
                Flashphoner.getMediaAccess({audio:true,video:{width:320,height:240}}, this.$refs.localVideo).then( (disp) => {
                    console.log('ok')
//                    Flashphoner.releaseLocalMedia(this.$refs.localVideo)
                    this.activeStep = 'ready'
                    this.runGlobalTimer()
                }).catch(e => {
                    this.activeStep = 'fail'
                })
            },
            recordButtonHandler () {
                switch (this.activeStep) {
                    case 'ready': {
                        this.start()
                        break;
                    }
                    case 'recording': {
                        this.stop()
                        break;
                    }
                    case 'processing': {
                        this.start()
                        break;
                    }
                    case 'completed': {
                        this.videoLinks = []
                        this.start()
                        break;
                    }
                    default: {
                        break
                    }
                }
            },
            onStarted(session) {
                this.activeStep = 'recording'
                this.stream = session
                this.timerId = setInterval(() => {
                    if (this.time < this.questions[this.activeItem].timer){
                        this.time += 1
                    } else {
                        this.stop()
                    }
                }, 1000)
            },
            publishStream(session) {
                session.createStream({
                    name: 'stream2222',
                    display: this.$refs.localVideo,
                    record: true,
                    constraints:{audio:true,video:{width:320,height:240}},
                    receiveVideo: false,
                    receiveAudio: false
                }).on(Flashphoner.constants.STREAM_STATUS.PUBLISHING, (stream) => {
                    console.log(stream.status());
                    this.onStarted(stream);
                }).on(Flashphoner.constants.STREAM_STATUS.UNPUBLISHED, (stream) => {
                    console.log(stream.status());
                    this.videoLinks.push('https://wcs5-us.flashphoner.com:8888/client/records/' + stream.getRecordInfo())
                    this.activeStep = 'completed'
                }).on(Flashphoner.constants.STREAM_STATUS.FAILED, (stream) => {
                    console.log(stream.status(), stream.getInfo());
                }).publish();
            },
            send () {
                console.log(this.videoLinks)
                this.videoLinks = []
                this.next()
            },
            next () {
                if (this.activeItem < this.questions.length - 1) {
                    this.activeStep = 'ready'
                    this.activeItem += 1
                }
            }
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
      padding: 25px 0 0;
    }
    &__sidebar {
      @include tablet {
        padding: 0 40px;
      }
      @include mobile {
        padding: 0 15px;
      }
    }

    &__questions-steps {
      display: grid;
      grid-template-rows: 4px;
      grid-column-gap: 5px;
      grid-row-gap: 0px;
      margin: 0 0 50px;

      @include mobile {
        margin: 0 0 32px;
      }
    }

    &__questions-step {
      background: #C4C4C4;
      opacity: 0.1;

      &--active {
        background: #3DD498;
        opacity: 1;
      }
    }

    &__questions-time {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      letter-spacing: 0.16px;
      color: #FFFFFF;
      margin-left: auto;
      display: flex;
      align-items: center;

      &--icon {
        display: flex;
        margin-right: 10px;
      }
    }

    &__company {
      display: flex;
      align-items: center;
      margin: 0 0 80px;
      @include tablet {
        margin: 0 0 50px;
      }
      @include mobile {
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
            margin: 0 0 50px;
          }
        }
      }
    }
    &__illustration {
      width: 664px;
      margin: 38px 0 64px 58px;
      @include tablet {
        width: 594px;
        margin: 10px auto 50px;
      }
      @include mobile {
        width: 339px;
        margin: 57px auto 76px;
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
          margin-top: 57px;
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
        position: relative;
        overflow: hidden;

        @include mobile {
          height: 360px;
        }

        &__controls {
          padding-bottom: 20px;
          align-self: flex-end;
          width: calc(50% + 27px);
          position: absolute;
          right: 0;
          z-index: 1;
          display: flex;
          align-items: center;
        }

        &__timer {
            padding-right: 10px;
            padding-top: 4px;
            padding-left: 10px;
            padding-bottom: 4px;
            position: absolute;
            top: 20px;
            border-radius: 40px;
            background: rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(27px);
            color: #656565;
            font-weight: 500;
            font-size: 14px;
            line-height: 22px;
            display: flex;
            left: 50%;
            transform: translateX(-50%);

            &__rec-indicator {
                align-self: center;
                background: #E70B18;
                height: 6px;
                width: 6px;
                border-radius: 50%;
                margin-right: 7px;
            }
        }

        &__record-button {
          background: none;
          width: 54px;
          height: 54px;
          border: none;
          padding: 0;
          outline: none;

          & > svg {
            & > circle {
              &:nth-child(2) {
                transform: rotate(-90deg);
                transform-origin: 50% 50%;
              }
            }
          }

          &:enabled {
            cursor: pointer;
          }
        }

        &__pause-button {
          background: #FFFFFF;
          border-radius: 50%;
          height: 30px;
          width: 30px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 20px;
          outline: none;
        }

        &__play-button {
          background: #FFFFFF;
          border-radius: 50%;
          height: 30px;
          width: 30px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 20px;
          outline: none;
        }

        &__no-camera-screen {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;

          &--icon {
            display: flex;
            width: 90px;
            height: 71px;

            @include mobile {
              width: 57px;
              height: 45px;
            }
          }
        }

        &__processing-screen {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;

          &--icon {
            display: flex;
            height: 110px;
            width: 110px;

            @include mobile {
              width: 43px;
              height: 43px;
            }

            & > svg {
              -webkit-animation: rotating 2s linear infinite;
              -moz-animation: rotating 2s linear infinite;
              -ms-animation: rotating 2s linear infinite;
              -o-animation: rotating 2s linear infinite;
              animation: rotating 2s linear infinite;
            }
          }
        }
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

        @include mobile {
          margin: 32px 0 0;
        }
      }

      &-answer-button {
        display: inline-block;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        color: #FFFFFF;
        padding: 14px 22px;
        border: 1px solid #3DD498;;
        box-sizing: border-box;
        border-radius: 12px;
        cursor: pointer;
        margin: 50px 0 0;
        min-width: 260px;
        background-color: #3DD498;

        @include mobile {
          margin: 32px 0 0;
        }
      }

      &-message {
        margin-top: 63px;
        color: #979797;
        letter-spacing: 0.16px;
        font-size: 15px;
        line-height: 17px;

        @include mobile {
          margin-top: 50px;
        }
      }
    }
  }
</style>