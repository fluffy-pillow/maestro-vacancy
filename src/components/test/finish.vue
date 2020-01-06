<template>
	<div class="test__finish">
    <div class="test__finish__head">
      <button class="test__finish__close-button">

      </button>
    </div>
    <div class="test__finish__body">
      <div class="test__finish__body-content">
        <h3 class="test__finish__title">
          Спасибо за ответы на вопросы
        </h3>
        <p class="test__finish__desc">
          Наш HR менеджер свяжется с вами в ближайшее время. Оставьте, пожалуйста, свои контактные данные.
        </p>

        <div class="test__finish__content">
          <label>
            <input class="test__finish-input-text" type="text" placeholder="Имя">
          </label>

          <label>
            <input class="test__finish-input-text" type="text" placeholder="Фамилия">
          </label>

          <label>
            <input class="test__finish-input-text" type="text" placeholder="Номер телефона">
          </label>

          <label>
            <input class="test__finish-input-text" type="text" placeholder="Email">
          </label>

          <contenteditable :content="text" @update="text = $event" :placeholderText="'Текст сообщения'"></contenteditable>

          <label class="test__finish-agreement-label" @click="bAgree = !bAgree">
            <span class="test__finish-check" :class="{'test__finish-check--agree': bAgree}"></span>
            <span class="test__finish-agreement-text">
              Я согласен на обработку
              <a href="#" class="test__finish-agreement-link">персональных данных</a>
            </span>
          </label>

          <label class="test__finish-button-label">
            <button class="test__finish-button">
              Отправить
            </button>
          </label>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
	import Contenteditable from "../global/contenteditable";
  export default {
    components: {Contenteditable},
    props: {
			data: {
				type: Object,
				default: null
			},
		},
    data () {
      return {
        text: '',
        bAgree: false
      }
    }
	}
</script>

<style lang="scss" scoped>
.test__finish {
  padding-top: 20px;
  padding-bottom: 50px;
  width: 540px;
  background-color: #ffffff;
  border-radius: 16px;
  display: flex;
  max-height: 90vh;
  position: relative;
  top: 5vh;
  margin: 0 auto;
  flex-direction: column;

  @include mobile {
    min-width: unset;
    width: min-content;
  }


  &__head {
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
  }

  &__body {
    overflow-y: scroll;

    &-content {
      padding-left: 20px;
      padding-right: 20px;
    }
  }

  &__close-button {
    margin-left: auto;
    width: 30px;
    height: 30px;
    background-image: url(../../assets/img/cross.svg);
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
    margin-top: 20px;

    @include mobile {
      width: auto;
    }
  }

  &__content {
    margin-top: 50px;
    display: grid;
    grid-row-gap: 20px;
    justify-content: center;
  }

  &-input {
    &-text {
      width: 350px;
      height: 54px;
      border: 1px solid #E0E6EE;
      border-radius: 16px;
      background: #ffffff;
      color: #61707D;
      font-size: 14px;
      line-height: 22px;
      padding: 16px;

      @include mobile {
        width: 303px;
      }
    }
  }


  &-input-file-label {
    display: grid;
    grid-column-gap: 8px;
    grid-template-columns: 18px auto;
  }

  &-agreement {
    &-label {
      display: grid;
      grid-column-gap: 16px;
      grid-template-columns: 22px auto;
      justify-content: center;
    }

    &-text {
      font-size: 12px;
      line-height: 22px;
      color: #656565;
      user-select: none;


      @include mobile {
        width: 160px;
      }
    }

    &-link {
      color: #656565;
    }
  }

  &-check {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    box-sizing: border-box;

    &--agree {
      background-color: #3DD498;
      background-image: url('../../assets/img/check.svg');
      border-color: #3DD498;
      background-size: cover;
    }
  }

  &-button {
    background: #3DD498;
    border-radius: 16px;
    color: #FFFFFF;
    font-size: 18px;
    line-height: 22px;
    height: 50px;
    width: 343px;
    border: none;
    outline: none;
    cursor: pointer;

    @include mobile {
      width: 250px;
      height: 45px;
    }
  }

  &-button-label {
    margin-top: 30px;

    @include tablet {
      grid-column-start: unset;
      grid-column-end: unset;
    }

    @include mobile {
      grid-column-start: unset;
      grid-column-end: unset;
      margin-top: 10px;
      justify-content: center;
      display: flex;
    }
  }

}
</style>
