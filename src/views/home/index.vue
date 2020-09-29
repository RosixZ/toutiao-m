<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        class="serach-btn"
        icon="search"
        type="info"
        size="small"
        round
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <!--频道列表 -->
    <van-tabs v-model="active" sticky>
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <article-list :channel="channel" />
      </van-tab>
    </van-tabs>
    <!--频道列表 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
export default {
  name: 'HomeIndex',
  data() {
    return {
      active: 0,
      channels: []
    }
  },
  created() {
    this.loadChannels()
  },
  components: {
    ArticleList
  },
  methods: {
    // 请求频道数据的方法
    async loadChannels() {
      const { data } = await getUserChannels()
      this.channels = data.data.channels
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .serach-btn {
    width: 277px;
    height: 32px;
    background-color: #a3c3e4;
    border: none;
    .van-icon {
      font-size: 16px;
    }
  }
}
</style>
