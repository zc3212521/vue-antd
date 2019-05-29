<template>
  <div>
    <p>{{ accept === "" ? "" : "仅限上传 " + accept + " 的文件类型,"}} {{muiltiple ? '' : '不'}}支持多文件上传。</p>
    <a-upload
      name="file"
      :accept="accept"
      :directory="directory"
      :multiple="true"
      :headers="headers"
      :action="action"
      @change="handleChange"
      :showUploadList="showUploadList"
      :remove="removeFile"
      listType="picture"
    >
      <slot></slot>
    </a-upload>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    action: {
      type: String,
      required: true
    },
    muiltiple: {
      type: Boolean,
      default: true
    },
    limitType: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String
    },
    directory: {
      type: Boolean,
      default: false
    },
    headers: {
      type: Object,
      default: null
    },
    showUploadList: {
      type: Object,
      default: function () {
        return { showPreviewIcon: false, showRemoveIcon: true }
      }
    }
  },
  data () {
    return {
      removeFile: function (file) {
        console.log('remove file', file)
      }
    }
  },
  created () {
    if (this.limitType && this.type.length === 0) {
      console.error('请添加允许上传文件的后缀配置项！')
    }
  },
  methods: {
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
