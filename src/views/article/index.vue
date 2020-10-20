<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="文章"
      right-text="。。。"
      left-arrow
      @click-left="$router.back()"
    >
    </van-nav-bar>
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
          >关注</van-button
        >
      </van-cell>
      <div class="content markdown-body" v-html="articleContent.content"></div>
    </div>
    <!-- /文章内容 -->
  </div>
</template>

<script>
import { getArticleById } from '@/api/article/'
import { followingUser } from '@/api/user'
import './github-markdowm.css'
// 在组件中获取动态路由的参数
// 1.this.$route.params.xx
// 2.props 传参
export default {
  name: 'ArticleIndex',
  data() {
    return {
      articleContent: {}
    }
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },

  created() {
    this.loadArticleById()
  },
  methods: {
    async loadArticleById() {
      const { data } = await getArticleById(this.articleId)
      console.log(data)
      this.articleContent = data.data
    }
  },
}
</script>

<style scoped lang="less">
.article-content {
  .articleTitle {
    margin: 0 0 4px 0;
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
    width: 85px;
    height: 30px;
  }
  .content {
    padding: 14px;
    background-color: white;
    position: fixed;
    left: 0;
    right: 0;
    top: 190px;
    bottom: 0;
    overflow-y: auto;
  }
}
</style>