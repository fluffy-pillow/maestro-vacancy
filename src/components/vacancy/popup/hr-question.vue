<template>
    <div class="popup__hr-question">
      <label class="popup__hr-question-label">
        <input class="popup__hr-question-input-text" type="text" placeholder="Имя">
      </label>

      <label class="popup__hr-question-label">
        <input class="popup__hr-question-input-text" type="text" placeholder="Email">
      </label>

      <label class="popup__hr-question-label">
        <input class="popup__hr-question-input-text" type="text" placeholder="Фамилия">
      </label>

      <label class="popup__hr-question-label">
        <input class="popup__hr-question-input-text" type="text" placeholder="Номер телефона">
      </label>

      <contenteditable class="popup__hr-question-contenteditable"
                       :content="text"
                       @update="text = $event"
                       :placeholderText="'Текст сообщения'"></contenteditable>


      <label class="popup__hr-question-label popup__hr-question-agreement-label" @click="bAgree = !bAgree">
        <span class="popup__hr-question-check" :class="{'popup__hr-question-check--agree': bAgree}"></span>
        <span class="popup__hr-question-agreement-text">
          Я согласен на обработку
          <a href="#" class="popup__hr-question-agreement-link">персональных данных</a>
        </span>
      </label>

      <label class="popup__hr-question-button-label">
        <button class="popup__hr-question-button">
          Отправить
        </button>
      </label>
    </div>
</template>

<script>
    import Contenteditable from "../../global/contenteditable";

    export default {
      name: "hr-question",
      components: {Contenteditable},
      data () {
        return {
          text: '',
          bAgree: false
        }
      }
    }
</script>

<style scoped lang="scss">
.popup__hr-question {
  display: grid;
  grid-row-gap: 20px;
  justify-content: center;
  grid-column-gap: 30px;
  grid-template-columns: 1fr 1fr;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 50px;

  @include tablet {
    padding: 0;
    grid-template-columns: unset;
  }

  @include mobile {
    padding: 0;
    grid-template-columns: unset;
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


  &-contenteditable {
    grid-row-start: 2;
    grid-row-end: 4;
    grid-column-start: 2;

    @include tablet {
      grid-row-start: unset;
      grid-row-end: unset;
      grid-column-start: unset;
    }

    @include mobile {
      grid-row-start: unset;
      grid-row-end: unset;
      grid-column-start: unset;
    }
  }

  &-agreement {
    &-label {
      display: grid;
      grid-column-gap: 16px;
      grid-template-columns: 22px auto;
      grid-column-start: 1;
      grid-column-end: 3;
      justify-content: center;

      @include tablet {
        grid-column-start: unset;
        grid-column-end: unset;
      }

      @include mobile {
        grid-column-start: unset;
        grid-column-end: unset;
      }
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
      background-image: url('../../../assets/img/check.svg');
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
    grid-column-start: 1;
    grid-column-end: 3;
    justify-content: center;
    display: flex;

    @include tablet {
      grid-column-start: unset;
      grid-column-end: unset;
    }

    @include mobile {
      grid-column-start: unset;
      grid-column-end: unset;
      margin-top: 10px;
    }
  }
}
</style>
