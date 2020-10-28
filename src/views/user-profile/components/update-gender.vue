<template>
  <div class="update-gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onGenderChange"
      :default-index="defaultIndex"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  data() {
    return {
      showPicker: true,
      columns: ['男', '女'],
      defaultIndex: this.value
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  methods: {

    onGenderChange(picker, value, index) {
      this.defaultIndex = index
    },
    async onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbinclick: true
      })

      await updateUserProfile({
        gender: this.defaultIndex
      })
      this.$toast.success('保存成功')
      this.$emit('input', this.defaultIndex)
      this.$emit('close')

    }
  }
}
</script>

<style>
</style>