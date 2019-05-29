<template>
  <div>
    <span @click="visible = !visible">
      <slot />
    </span>
    <a-modal
      title="上传文件"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <upload-files
        action="/test/uploadfile"
        :accept="accept"
      >
        <a-button>
          <a-icon type="upload" /> 选择文件
        </a-button>
      </upload-files>
    </a-modal>
  </div>
</template>

<script>
import uploadFiles from '../uploadFiles'
export default {
  name: 'HUploader',
  props: {
    multiple: {
      type: Boolean,
      default: true
    },
    type: {
      type: Array
    },
    limitType: {
      type: Boolean,
      default: false
    }
  },
  components: {
    uploadFiles
  },
  data () {
    return {
      visible: false
    }
  },
  created () {
    if (this.limitType && this.type.length === 0) {
      console.error('请添加允许上传文件的后缀配置项！')
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleOk () {
      this.visible = false
    },
    handleCancel () {
      this.visible = false
    },
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    clickSlot () {
      console.log('clickSlot')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
