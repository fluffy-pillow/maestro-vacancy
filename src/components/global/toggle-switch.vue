<template>
  <div class="toggle-switch">
    <label class="toggle-switch__var switch__var--first" :class="{'toggle-switch__var--active' : toggled === '0'}">
      <input type="radio" name="toggle-switch" v-model="toggled"  value="0" class="toggle-switch__radio">
      <span class="toggle-switch__var-text">
        {{firstVariant}}
      </span>
    </label>
    <label class="toggle-switch__var switch__var--second" :class="{'toggle-switch__var--active' : toggled === '1'}">
      <input type="radio" name="toggle-switch" v-model="toggled" value="1"  class="toggle-switch__radio">
      <span class="toggle-switch__var-text">
        {{secondVariant}}
      </span>
    </label>
  </div>
</template>

<script>
    export default {
        name: "toggle-switch",
        props: {
          firstVariant: String,
          secondVariant: String
        },
        data () {
          return {
            toggled: "0"
          }
        }
    }
</script>

<style lang="scss" scoped>
.toggle-switch {
  display: flex;
  background: #F8FAFD;
  border-radius: 6px;
  overflow: hidden;
  width: 92px;

  &__radio {
    display: none;
  }

  &__var {
    flex: 1;
    height: 42px;
    color: #C4C4C4;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;

    &--active {
      color: #ffffff;
      background: #3DD498;
      width: 43px;
      border-radius: 6px;
    }
  }
}
</style>
