<template>
  <van-cell
    class="article-item"
    :to="{ name: 'article', params: { articleId: article.art_id } }"
  >
    <div slot="title" class="title van-multi-ellipsis--l3">
      {{ article.title }}
    </div>
    <div slot="label">
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div
          class="cover-wrap-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image
            class="bottom-cover"
            height="75"
            fit="cover"
            :src="img"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div class="label-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image
      v-if="article.cover.type === 1"
      fit="cover"
      class="right-cover"
      :src="article.cover.images[0]"
      referrerPolicy="no-referrer"
    />
  </van-cell>
</template>
<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: { type: Object, required: true },
  },
  data() {
    return {}
  },
}
</script>
<style lang="less">
.article-item {
  .title {
    font-size: 20px;
    color: rgb(66, 59, 59);
    font-weight: 700;
  }
  .cover-wrap {
    display: flex;
    flex-wrap: nowrap;
    padding: 15px 0;
    .cover-wrap-item {
      flex: 1;
      &:not(:last-child) {
        padding-right: 4px;
      }
    }
    .bottom-cover {
      width: 100%;
      height: 150px;
    }
  }
  /deep/ .van-cell__value {
    flex: unset;
    width: 120px;
    height: 75px;
    margin-left: 12px;
  }
  .right-cover {
    width: 120px;
    height: 75px;
  }
  .label-wrap {
    font-size: 15px;
  }
  .label-wrap span {
    margin-right: 12px;
  }
}
</style>
