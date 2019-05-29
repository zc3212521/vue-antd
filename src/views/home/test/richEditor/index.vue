<template>
  <div class="editor-wrap">
    <div id="editor">
    </div>
  </div>
</template>

<script>
export default {
  name: 'richEditor',
  mounted () {
    let toolbarOptions = [
      [ 'bold', 'italic', 'underline', 'strike' ], // 切换按钮
      [ 'blockquote', 'code-block' ],

      [ { 'header': [1, 2, 3, false] } ],

      [ { 'list': 'ordered' }, { 'list': 'bullet' } ],
      [ { 'indent': '-1' }, { 'indent': '+1' } ], // 减少缩进/缩进
      [ { 'script': 'sub' }, { 'script': 'super' } ], // 上标/下标
      [ { 'direction': 'rtl' } ], // 文本下划线

      [ { 'color': [] }, { 'background': [] } ], // 主题默认下拉，使用主题提供的值
      [ { 'font': [] } ],
      [ { 'align': [] } ],

      [ 'formula' ],

      [ 'clean' ] // 清除格式
    ]

    let options = {
      debug: 'info',
      placeholder: 'Compose an epic...',
      theme: 'snow',
      modules: {
        toolbar: toolbarOptions
      }
    }

    const Quill = window.Quill
    let quill = new Quill('#editor', options)
    quill.insertText(0, 'Hello', 'link', 'https://world.com')
    quill.setSelection(0, 1)
  }
}
</script>

<style lang="less" scoped>
  .editor-wrap {
    padding: 20px 24px;
    background-color: #fff;
  }
  #custom-button {
    color: red;
  }
</style>
