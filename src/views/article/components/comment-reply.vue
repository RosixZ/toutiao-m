<template>
  <div class="comment-reply">
    <!-- 头部内容 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon slot="right" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <!-- /头部内容 -->
    <!-- 当前评论项目 -->
    <comment-item :comment="comment" />
    <!-- /当前评论项目 -->

    <!-- 所有评论回复 -->
    <van-cell title="所有回复" />
    <comment-list :source="comment.com_id" type="c" :list="commentList" />
    <!-- /所有评论回复 -->
    <!-- 底部区域 -->
    <div class="buttom-cell">
      <van-button
        slot="title"
        class="comment-btn"
        icon="smile-comment-o"
        round
        @click="isPostShow = true"
      >
        评论
      </van-button>
    </div>
    <!-- /底部区域 -->
    <!-- 发布评论 -->
    <van-popup position="bottom" v-model="isPostShow">
      <post-comment
        :target="comment.com_id"
        :article-id="articleId"
        @post-success="onPostSuccess"
      />
    </van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>

import CommentItem from './comment-item'
import CommentList from './comment-list'
import PostComment from './post-comment'
export default {
  name: 'CommentReply',
  data() {
    return {
      isPostShow: false,
      commentList: []
    }
  },
  components: {
    CommentItem,
    CommentList,
    PostComment
  },
  props: {
    // 当前评论项目
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    onPostSuccess(comment) {
      this.isPostShow = false
      // 更新视图
      this.commentList.unshift(comment)
      // 更新回复数量
      this.comment.reply_count++
    }
  },
}
</script>

<style scoped lang="less">
.comment-reply {
  .buttom-cell {
    background-color: #e7dede;
    width: 100%;
    height: 30px;
    padding: 10px;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .comment-btn {
      width: 200px;
      height: 30px;
    }
  }
}
</style>
