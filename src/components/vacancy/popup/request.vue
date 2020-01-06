<template>
    <div class="popup__request">
      <label>
        <input class="popup__request-input-text" type="text" placeholder="Имя">
      </label>

      <label>
        <input class="popup__request-input-text" type="text" placeholder="Фамилия">
      </label>

      <label>
        <input class="popup__request-input-text" type="text" placeholder="Номер телефона">
      </label>

      <label>
        <input class="popup__request-input-text" type="text" placeholder="Email">
      </label>

      <contenteditable :content="text" @update="text = $event" :placeholderText="'Текст сообщения'"></contenteditable>

      <label class="popup__request-input-file-label">
          <input type="file" class="popup__request-input-file">
          <span class="popup__request-file-icon">
            <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.1451 1.37442L0.962629 10.7111C-0.320876 12.0164 -0.320876 14.146 0.962629 15.444C2.24613 16.7493 4.3377 16.7493 5.6212 15.444L14.7468 6.16467C15.548 5.35432 15.5977 4.02769 14.8036 3.23155C13.9174 2.33521 12.6481 2.55745 11.9035 3.28915L3.24574 12.0806C3.02578 12.3102 3.02578 12.7189 3.24574 12.9414C3.46545 13.1708 3.86961 13.1708 4.09668 12.9414L12.7544 4.14236C13.1233 3.76942 13.6409 3.76941 13.953 4.08503C14.2648 4.40774 14.2648 4.9385 13.8961 5.31119L4.77027 14.5908C3.94775 15.4298 2.63583 15.4298 1.80621 14.5908C0.976583 13.7444 0.976583 12.418 1.80621 11.5717L10.9957 2.23499C12.5555 0.679005 14.6545 1.1164 15.6967 2.15609C16.9092 3.36805 17.3204 5.42612 15.7819 7.10415L7.04628 15.9748C6.82631 16.197 6.82631 16.6057 7.04628 16.828C7.26599 17.0573 7.67014 17.0573 7.89721 16.828L16.6331 7.95736C18.7886 5.69125 18.1434 2.73683 16.555 1.27395C14.8534 -0.289396 12.2298 -0.590547 10.1451 1.37442Z" fill="#3DD498"/>
            </svg>
          </span>
          <span class="popup__request-file-title">
            Прикрепить резюме
          </span>
      </label>

      <label class="popup__request-agreement-label" @click="bAgree = !bAgree">
        <span class="popup__request-check" :class="{'popup__request-check--agree': bAgree}"></span>
        <span class="popup__request-agreement-text">
          Я согласен на обработку
          <a href="#" class="popup__request-agreement-link">персональных данных</a>
        </span>
      </label>

      <label class="popup__request-button-label">
        <button class="popup__request-button">
          Отправить
        </button>
      </label>


    </div>
</template>

<script>
    import Contenteditable from "../../global/contenteditable";
    export default {
      name: "request",
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
.popup__request {
  display: grid;
  grid-row-gap: 20px;
  justify-content: center;
  margin-top: 50px;

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

    &-file {
      display: none;
    }
  }

  &-file-title {
    color: #3DD498;
    font-size: 14px;
    line-height: 22px;
  }

  &-file-icon {
    display: flex;
    align-items: center;
  }

  &-input-file-label {
    display: grid;
    grid-column-gap: 8px;
    grid-template-columns: 18px auto;

    @include mobile {
      margin-left: 16px;
    }
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
