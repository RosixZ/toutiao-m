<template>
  <div class="comment-item">
    <van-cell>
      <van-image
        class="avatar"
        slot="icon"
        fit="cover"
        round
        :src="comment.aut_photo"
      />

      <div slot="title">
        <div class="title-wrap">
          <div class="name">{{ comment.aut_name }}</div>
          <div class="like-wrap" @click="onCommentLike">
            <van-icon
              class="like-icon"
              :color="comment.is_liking ? '#ff69b4' : '#ff69b4'"
              :name="comment.is_liking ? 'good-job' : 'good-job-o'"
            />
            <span class="like-count">{{ comment.like_count }}</span>
          </div>
        </div>

        <div class="content">{{ comment.content }}</div>
        <div>
          <span class="pubdate"
            >{{ comment.pubdate | dateTime('MM:DD HH:mm') }}
          </span>
          <van-button
            class="reply-btn"
            round
            size="mini"
            @click="$emit('reply-click', comment)"
          >
            {{ comment.reply_count }}回复</van-button
          >
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { deleteLikingComment, addLikingComment } from '@/api/article'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {

    async onCommentLike() {
      const commentId = this.comment.com_id.toString()
      if (this.comment.is_liking) {
        await deleteLikingComment(commentId)
        this.comment.like_count--
      } else {
        await addLikingComment(commentId)
        this.comment.like_count++
      }
      // 更新视图
      this.comment.is_liking = !this.comment.is_liking
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 40px;
    height: 40px;
    margin-right: 13px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    .name {
      font-size: 14px;
      color: rgb(245, 151, 151);
    }
    .like-wrap {
      .like-icon {
      }
    }
  }

  .content {
    font-size: 16px;
    color: rgb(26, 25, 25);
  }
  .pubdate {
    font-size: 12px;
    margin-right: 12px;
  }
}
</style>
