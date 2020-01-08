<template>
  <div class="test__questions">
    <div class="test__questions-meta">
      <div class="test__questions-top">
        <div class="test__questions-company">
          <logo class="test__questions-company-logo"/>
          <div class="test__questions-company-title">{{company.name}}</div>
        </div>
        <div class="test__questions-time">
          <div class="test__questions-time--icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.99303 1C12.4764 1 14.7249 2.00983 16.3571 3.6355C17.9828 5.26814 18.9926 7.51661 18.9926 10C18.9926 12.4834 17.9828 14.7319 16.3571 16.3645C14.7245 17.9902 12.4764 19 9.99303 19C7.50964 19 5.2616 17.9902 3.63593 16.3645C2.00329 14.7319 1 12.4838 1 10C1 7.51661 2.00286 5.26814 3.6355 3.6355C5.2616 2.00983 7.50964 1 9.99303 1ZM14.5798 9.50881C14.8495 9.50881 15.064 9.73022 15.064 10C15.064 10.2698 14.8495 10.4912 14.5798 10.4912H10.007H9.99303C9.81303 10.4912 9.65395 10.3875 9.57114 10.2423L9.56417 10.2354L9.55719 10.2214V10.2144L9.55022 10.2005L9.54325 10.1865V10.1796L9.53627 10.1656L9.5293 10.1586V10.1447L9.52232 10.1308V10.1238L9.51535 10.1098V10.0959V10.0889V10.0819L9.50838 10.075V10.061V10.0471V10.0349V10.0279V10.0139V10V4.14063C9.50838 3.87085 9.72281 3.65642 9.99259 3.65642C10.2624 3.65642 10.4838 3.87085 10.4838 4.14063V9.50881H14.5798ZM15.6654 4.3276C14.2128 2.87496 12.2066 1.98237 9.99303 1.98237C7.77942 1.98237 5.77327 2.87453 4.32063 4.3276C2.87496 5.78024 1.9754 7.78639 1.9754 10C1.9754 12.2136 2.87453 14.2198 4.32063 15.6728C5.77327 17.1255 7.77942 18.0181 9.99303 18.0181C12.2066 18.0181 14.2128 17.1255 15.6654 15.6728C17.1181 14.2202 18.0176 12.214 18.0176 10C18.0176 7.78639 17.1185 5.78024 15.6654 4.3276Z" fill="white" stroke="white" stroke-width="0.3"/>
            </svg>
          </div>
            {{ time | moment('mm:ss') }}
<!--          {{ $moment.duration(time * 1000).asSeconds() }}-->
          <!-- {{time | duration('seconds') | moment("mm:ss")}} -->
        </div>
      </div>
      <div class="test__questions-steps" :style="`grid-template-columns: repeat(${questions.length}, 1fr);`">
        <div class="test__questions-step" :class="{'test__questions-step--active': index <= active}"
             v-for="(item, index) in questions" :key="index"></div>
      </div>
      <div class="test__questions-question" v-for="(item, index) in questions" :key="index" v-if='index === active'>
        <span>{{item.question}}</span>
        <p v-if="item.text">{{item.text}}</p>
        <img class="test__questions-question-image" :src="item.image" v-if="item.image"/>
        <vue-plyr v-if="item.video" class="test__questions-question-video" :options="videoOptions">
          <div data-plyr-provider="youtube" data-plyr-embed-id="bTqVqk7FSmY"></div>
        </vue-plyr>
      </div>
    </div>
    <div class="test__questions-items">
      <div class="test__questions-item" v-for="(item, index) in questions" :key="index" v-if='index === active'>
        <span>Выберите один или несколько вариантов ответа:</span>
        <div
          class="test__questions-variant"
          :class="{'test__questions-variant--active': index === selectedVariant}"
          @click="select(index)"
          v-for="(item, index) in item.answers"
          :key="index">
          <span>{{item.text}}</span>
          <div class="test__questions-variant-check"></div>
        </div>
      </div>
      <a class="test__questions-button" :class="{'test__questions-button--disable': selectedVariant === null}"
         @click="nextStep()">
        Ответить
      </a>
    </div>
    <div class="test__questions-footer">
      <img class="test__questions-footer-img--inv" src='@/assets/img/logo-inv.svg'/>
      <img class="test__questions-footer-img--def" src='@/assets/img/logo.svg'/>
    </div>
  </div>
</template>

<script>
  import logo from '@/components/widgets/company/logo.vue'

  export default {
    components: {
      logo,
    },
    props: {
      company: {
        type: Object,
        default: []
      },
      questions: {
        type: Array,
        default: []
      },
      active: {
        type: Number,
        default: null
      },
      time: {
        type: Number,
        default: null
      },
    },
    data() {
      return {
        activeStep: this.active,
        selectedVariant: null,
        videoOptions: {
          // iconUrl: 'https://gist.githubusercontent.com/barbudour/ba51c7a3b636ca950191fea5d2f33e41/raw/044ef2f5b777b300365cfc7e04a8d08130348310/play.svg',
          controls: [
            'play-large'
          ]
        }
      }
    },
    filters: {
      time: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    },
    methods: {
      select(i) {
        if (this.selectedVariant !== i) {
          this.selectedVariant = i;
        } else {
          this.selectedVariant = null;
        }
      },
      nextStep() {
        var answerItem = {
          q: this.activeStep,
          a: this.selectedVariant
        }
        this.$parent.answers.push(answerItem);
        if (this.questions.length - 1 === this.$parent.activeItem) {
          this.$parent.start = false;
          this.$parent.end = true;
        } else {
          this.$parent.activeItem += 1;
          this.selectedVariant = null;
        }
        ;
      }
    },
  }
</script>

<style lang="scss" scoped>
  .test {
    &__questions {
      display: grid;
      grid-template-columns: 445px 767px;
      grid-template-rows: 1fr;
      grid-column-gap: 118px;
      grid-row-gap: 0px;
      justify-content: center;
      padding: 30px 0;


      @include small-desktop {
        grid-template-columns: 378px 722px;
      }

      @include tablet {
        grid-template-columns: 1fr;
        padding: 0;
      }

      @include mobile {
        grid-template-columns: 1fr;
        padding: 0;
      }

      &-meta {
        @include tablet {
          padding: 40px 56px 20px 40px;
        }
        @include mobile {
          padding: 25px 16px 50px 15px;
        }
      }

      &-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 0 50px 0;

        @include mobile {
          margin: 0 0 16px 0;
        }
      }

      &-footer {
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
        }

        @include mobile {
          background-color: #ffffff;
          display: flex;
          justify-content: center;
          padding-bottom: 50px;
        }
      }

      &-time {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 16px;
        letter-spacing: 0.16px;
        color: #FFFFFF;
        display: flex;
        align-items: center;

        &--icon {
          display: flex;
          margin-right: 10px;
        }
      }

      &-company {
        display: flex;
        align-items: center;

        &-logo {
          width: 54px;
          height: 54px;
          margin: 0 20px 0 0;

          @include mobile {
            width: 32px;
            height: 32px;
            margin: 0 16px 0 0;
          }
        }

        &-title {
          font-style: normal;
          font-weight: bold;
          font-size: 18px;
          line-height: 22px;
          color: #FFFFFF;

          @include mobile {
            font-size: 16px;
          }
        }
      }

      &-steps {
        display: grid;
        grid-template-rows: 4px;
        grid-column-gap: 5px;
        grid-row-gap: 0px;
        margin: 0 0 50px;

        @include mobile {
          margin: 0 0 16px;
        }
      }

      &-step {
        background: #C4C4C4;
        opacity: 0.1;

        &--active {
          background: #3DD498;
          opacity: 1;
        }
      }

      &-question {
        position: relative;

        span {
          display: block;
          font-style: normal;
          font-weight: bold;
          font-size: 25px;
          line-height: 38px;
          letter-spacing: 0.16px;
          font-feature-settings: 'case' on;
          color: #FFFFFF;
          margin: 0 0 30px;

          @include mobile {
            margin: 0 0 10px;
          }
        }

        p {
          font-style: normal;
          font-weight: normal;
          font-size: 15px;
          line-height: 17px;
          letter-spacing: 0.04px;
          color: #979797;
          margin: 0 0 50px;

          @include mobile {
            margin: 0 0 32px;
          }
        }

        > img {
          width: 100%;
          border-radius: 16px;
        }

        &-video {
          border-radius: 16px;
          overflow: hidden;

          @include tablet {
            margin: 0 0 50px;
          }
        }

        &-image {
          @include tablet {
            margin: 0 0 50px;
          }
        }
      }

      &-items {
        background: #FFFFFF;
        border-radius: 24px;
        padding: 50px;

        @include tablet {
          padding: 32px 50px 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 24px 24px 0 0;
        }

        @include mobile {
          border-radius: 24px 24px 0 0;
          padding: 20px 16px 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }

      &-item {
        margin: 0 0 50px;

        @include mobile {
          margin: 0 0 32px;
        }

        > span {
          display: block;
          font-style: normal;
          font-weight: normal;
          font-size: 15px;
          line-height: 17px;
          letter-spacing: 0.16px;
          color: #979797;
          margin: 0 0 30px 28px;

          @include tablet {
            text-align: center;
            margin: 0 28px 30px 28px;
          }

          @include mobile {
            text-align: center;
            margin: 0 39px 32px;
          }
        }
      }

      &-variant {
        padding: 30px 20px 30px 30px;
        background: #FFFFFF;
        border-radius: 12px;
        border: 1px solid #E5E5E5;
        cursor: pointer;
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-rows: auto;
        grid-column-gap: 40px;
        grid-row-gap: 0px;
        align-items: center;

        @include mobile {
          padding: 16px;
          grid-column-gap: 16px;
        }

        &--active {
          border-color: #3DD498;
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);

          .test__questions-variant-check {
            background-color: #3DD498;
            background-image: url('../../assets/img/check.svg');
            border-color: #3DD498;
            background-size: cover;
          }
        }

        &:hover {
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        }

        &:not(:last-child) {
          margin: 0 0 20px;
        }

        &-check {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1px solid #E5E5E5;
          box-sizing: border-box;
        }
      }

      &-button {
        display: inline-block;
        background: #3DD498;
        border-radius: 12px;
        padding: 12.6px 92px;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        color: #FFFFFF;
        cursor: pointer;

        &--disable {
          background: #D8D8D8;
          pointer-events: none;
        }
      }
    }
  }
</style>

<style lang="scss">
  .plyr__control {
    background: rgba(97, 112, 125, 0.2);
    width: 69px !important;
    height: 69px;

    svg {
      margin: auto;
    }

  }

  .plyr--video .plyr__control.plyr__tab-focus, .plyr--video .plyr__control:hover, .plyr--video .plyr__control[aria-expanded=true] {
    background: rgba(97, 112, 125, 0.2) !important;
  }
</style>
