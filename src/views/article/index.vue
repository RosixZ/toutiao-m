<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-sticky>
      <van-nav-bar
        title="文章"
        right-text="。。。"
        left-arrow
        @click-left="$router.back()"
      >
      </van-nav-bar>
    </van-sticky>
    <!-- /导航栏 -->
    <!-- 文章内容 -->
    <div class="article-content">
      <h1 class="articleTitle">{{ articleContent.title }}</h1>

      <van-cell center class="user-info">
        <div slot="title" class="name">{{ articleContent.aut_name }}</div>
        <van-image
          slot="icon"
          round
          fit="cover"
          class="avatar"
          :src="articleContent.aut_photo"
        />
        <div slot="label" class="pubdate">
          {{ articleContent.pubdate | relativeTime }}
        </div>

        <van-button
          :icon="articleContent.is_followed ? '' : 'plus'"
          :type="articleContent.is_followed ? 'default' : 'danger'"
          round
          size="small"
          class="follow-btn"
          @click="onFollow"
          :loading="isFollowLoading"
          >{{ articleContent.is_followed ? '已关注' : '关注' }}</van-button
        >
      </van-cell>

      <div
        class="content markdown-body"
        ref="article-content"
        v-html="articleContent.content"
      ></div>

      <!-- /文章内容 -->
      <comment-list
        :source="articleId"
        :list="commentLists"
        @reply-click="onReplyClick"
      />
      <!-- 底部评论条 -->
    </div>

    <div class="buttom-cell">
      <van-button
        slot="title"
        class="comment-btn"
        icon="smile-comment-o"
        round
        @click="CommentPopupShow = true"
      >
        评论
      </van-button>
      <!-- 评论弹框 -->
      <van-popup
        v-model="CommentPopupShow"
        position="bottom"
        class="CommentPopup"
      >
        <post-comment @post-success="onPostSuccess" :target="articleId" />
      </van-popup>
      <!-- /评论弹框 -->
      <!-- 评论回复 -->
      <van-popup v-model="isReplyShow" position="bottom" class="reply-Popup">
        <comment-reply
          v-if="isReplyShow"
          :comment="replyComment"
          @close="isReplyShow = false"
          :article-id="articleId"
        />
      </van-popup>
      <!-- /评论回复 -->
      <div class="bottomIcons">
        <van-icon class="bottomIcon" name="chat-o" badge="9" />
        <van-icon
          class="bottomIcon"
          :color="articleContent.is_collected ? 'yellow' : ''"
          :name="articleContent.is_collected ? 'star' : 'star-o'"
          @click="onCollect"
        />
        <van-icon
          class="bottomIcon"
          :name="articleContent.attitude === 1 ? 'good-job' : 'good-job-o'"
          :color="articleContent.attitude === 1 ? 'red' : ''"
          @click="onGoodJob"
        />
      </div>
    </div>
    <!-- /底部评论条 -->
  </div>
</template>

<script>
import { getArticleById, collectArticle, removeCollectArticle, addLikingsArticle, removeLikingsArticle, postComment } from '@/api/article/'
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '@/api/user'
import './github-markdowm.css'
import CommentList from './components/comment-list'
import PostComment from './components/post-comment'
import CommentReply from './components/comment-reply'
// 在组件中获取动态路由的参数
// 1.this.$route.params.xx
// 2.props 传参
export default {
  name: 'ArticleIndex',
  data() {
    return {
      replyComment: {},
      commentLists: [],
      CommentPopupShow: false,
      articleContent: {},
      isFollowLoading: false, // Following 的Loading状态控制
      isCollectLoading: false, // Collecting 的Loading状态控制
      isReplyShow: false // 二级评论列表的展示状态
    }
  },
  components: {
    CommentList,
    PostComment,
    CommentReply
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },

  created() {
    this.loadArticleById()
    console.log(this.articleContent)
  },
  methods: {
    onReplyClick(comment) {

      // 展示回复内容
      this.isReplyShow = true
      this.replyComment = comment
    },
    onPostSuccess(comment) {
      this.commentLists.unshift(comment)
      this.CommentPopupShow = false
    },
    async onGoodJob() {
      this.$toast.loading({
        message: '操作中',
        forbidClick: true
      })

      if (this.articleContent.attitude === 1) {
        // 已点赞
        await removeLikingsArticle(this.articleContent.art_id)
        this.articleContent.attitude = -1
      } else {
        // 未点赞
        await addLikingsArticle(this.articleContent.art_id)
        this.articleContent.attitude = 1
      }

      this.$toast.success(`${this.articleContent.attitude === 1 ? '' : '取消'}点赞成功`)
    },
    async onCollect() {
      this.$toast.loading({
        message: '操作中',
        forbidClick: true
      })

      if (this.articleContent.is_collected) {
        // 已收藏
        this.isCollectLoading = true
        await removeCollectArticle(this.articleContent.art_id)
      } else {
        // 未收藏
        this.isCollectLoading = true
        await collectArticle(this.articleContent.art_id)
      }
      this.articleContent.is_collected = !this.articleContent.is_collected
      this.isCollectLoading = false
      this.$toast.success(`${this.articleContent.is_collected ? '' : '取消'}收藏成功`)
    },
    async onFollow() {
      if (this.articleContent.is_followed) {
        // 已关注
        this.isFollowLoading = true
        await deleteFollow(this.articleContent.aut_id)
      } else {
        // 未关注
        this.isFollowLoading = true
        await addFollow(this.articleContent.aut_id)
      }
      this.articleContent.is_followed = !this.articleContent.is_followed
      this.isFollowLoading = false
    },
    previewImage() {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          ImagePreview({
            images: imgPaths, startPosition: index
          })
        }
      })
    },
    async loadArticleById() {

      const { data } = await getArticleById(this.articleId)
      console.log(data)
      this.articleContent = data.data

      // 获取所有img标签存入数组
      // 如果需要在修改数据后马上操作视图dom，需要把代码放在$nextTick中
      this.$nextTick(() => {
        this.previewImage()
      })

    },
  }

}
</script>

<style scoped lang="less">
// 文章内容
.article-content {
  margin: 10px 10px auto 10px;
  position: fixed;
  right: 0;
  left: 0;
  top: 46px;
  bottom: 50px;
  overflow-y: auto;
  .articleTitle {
    font-size: 22px;
    line-height: 30px;
    padding: 20px;
    color: rgb(46, 45, 45);
    background-color: white;
  }

  .avatar {
    width: 35px;
    height: 35px;
    margin-right: 12px;
  }
  .name {
    font-size: 13px;
    color: #333333;
  }
  .pubdate {
    font-size: 11px;
    columns: #b4b4b4;
  }
  .follow-btn {
    width: 80px;
    height: 30px;
  }
  .content {
    padding: 14px;
    background-color: white;
    position: relative;
    overflow-y: auto;
  }
}
// 底部栏
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
  .reply-Popup {
    height: 60%;
    overflow-y: auto;
  }
  .bottomIcons {
    height: 30px;
    margin-left: 30px;
    .bottomIcon {
      height: 30px;
      margin-right: 15px;
    }
  }
  .comment-btn {
    width: 200px;
    height: 30px;
  }
}
</style>
