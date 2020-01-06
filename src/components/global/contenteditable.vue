
<template>
  <label class="contenteditable" @click="focus">
        <span class="contenteditable__input"
              ref="contentEditable"
              :placeholder="placeholderText"
              contenteditable="true"
              @input="update"
              @paste="onPaste"
              @click="$emit('onFocus')"
              v-click-outside="handleBlur"
        >
        </span>
  </label>
</template>

<script>
  import ClickOutside from 'vue-click-outside'


  export default {
    name: "contenteditable",
    props: {
      content: String,
      placeholderText: {
        type: String,
        default: ''
      }
    },
    methods: {
      handleBlur () {
        this.$emit('onBlur')
      },
      update:function(event){
        event.preventDefault()
        this.$emit('update',event.target.innerText.trim())
      },
      focus () {
        this.$refs.contentEditable.focus()
      },
      onPaste (event) {
        event.preventDefault()
        event.stopPropagation()
        let paste = (event.clipboardData || window.clipboardData).getData('text/plain')
        event.target.textContent += paste
        this.$emit('update',event.target.innerText.trim())
        this.moveCursorToEnd()
      },
      moveCursorToEnd () {
        let el = this.$refs.contentEditable
        let range = document.createRange()
        let sel = window.getSelection()
        range.setStart(el.childNodes[0], el.innerHTML.length)
        range.collapse(true)
        sel.removeAllRanges()
        sel.addRange(range)
      }
    },
    directives: {
      ClickOutside
    },
    mounted:function(){
      this.$refs.contentEditable.innerText = this.content
    }
  }
</script>

<style scoped>
  .contenteditable {
    display: flex;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .contenteditable__input {
    border-radius: 16px;
    border: 1px solid #E0E6EE;
    min-height: 144px;
    color: #61707D;
    font-size: 14px;
    line-height: 18px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 16px;
    width: 100%;
    -webkit-user-select: text;
    user-select: text;
  }
  .contenteditable__input:focus {
    outline: none;
  }
  .contenteditable__input:empty:before{
    content: attr(placeholder);
    display: block; /* For Firefox */
    font-size: 14px;
    line-height: 18px;
    /* identical to box height */
    color: #61707D;
    mix-blend-mode: normal;
  }
</style>
