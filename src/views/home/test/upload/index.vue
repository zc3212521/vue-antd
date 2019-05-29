<template>
  <div class="upload-wrap">
    <h-uploader>
      <a-button>上传</a-button>
    </h-uploader>
  </div>

</template>

<script>
import HUploader from '@/components/HUploader'
export default {
  name: 'upload',
  components: {
    HUploader
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
  .upload-wrap {
    padding: 20px 24px;
    background-color: #fff;
  }
</style>
