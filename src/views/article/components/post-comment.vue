<template>
  <div class="post-comment">
    <van-field
      class="commentContent"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="onPostComment"
      size="small"
      :disabled="!message"
      >发布</van-button
    >
  </div>
</template>

<script>
import { postComment } from '@/api/article'
export default {
  name: 'PostComment',
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data() {
    return {
      message: '' //文本框内容
    }
  },
  methods: {
    async onPostComment() {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true
      })

      const { data } = await postComment({
        target: this.target.toString(),
        content: this.message,
        art_id: this.articleId === null ? null : this.articleId.toString()
      })
      this.$emit('post-success', data.data.new_obj)
      this.$toast.success('发布成功')
      this.message = ''
    }
  },
}
</script>

<style scoped lang="less">
.post-comment {
  padding: 14px;
  display: flex;
  align-items: center;
  .commentContent {
  }
  .post-btn {
    width: 50px;
  }
}
</style>