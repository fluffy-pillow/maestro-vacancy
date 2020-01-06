<template>
  <div class="test__questions">
    <div class="test__questions-meta">
      <div class="test__questions-top">
        <div class="test__questions-company">
          <logo class="test__questions-company-logo"/>
          <div class="test__questions-company-title">{{company.name}}</div>
        </div>
        <div class="test__questions-time">
          <!-- {{ time | moment('dddd, MMMM Do, h:mm a') }} -->
          {{ $moment.duration(time * 1000).asSeconds() }}
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
