<template>
  <div class="update-name">
    <van-nav-bar
      title="修改昵称"
      left-arrow
      right-text="修改"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <div class="name-wrap">
      <van-field
        v-model="localName"
        rows="4"
        type="textarea"
        maxlength="20"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  data() {
    return {
      localName: this.name
    }
  },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbinclick: true
      })

      try {
        await updateUserProfile({
          name: this.localName
        })
        this.$toast.success('保存成功')
        this.$emit('upadate-name', this.localName)
        this.$emit('close')
      } catch (error) {
        if (error && error.response && error.response.status === 409) {
          this.$toast.fail('昵称已存在')
        }
      }




    }
  }
}
</script>

<style scoped less="less">
.name-wrap {
  padding: 10px;
}
</style>