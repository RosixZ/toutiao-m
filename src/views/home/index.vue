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
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <!--频道列表 -->
    <van-tabs v-model="active" sticky swipeable class="channel-tabs">
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <article-list :channel="channel" />
      </van-tab>
      <div slot="nav-right" class="wap-nav-placeholder"></div>
      <div
        slot="nav-right"
        @click="isChannelEditShow = true"
        class="wap-nav-wrap"
      >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!--频道列表 -->
    <!-- 弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      class="channel-edit"
      closeable
      get-container="body"
      style="height: 100%"
    >
      <channel-edit
        :user-channels="channels"
        :active="active"
        @channelEditClose="isChannelEditShow = false"
        @update-active="OnUpdateActive"
      ></channel-edit>
      <!-- 此处也可以用事件参数$event -->
    </van-popup>
    <!-- 弹出层 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  data() {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false, //true 为开启
    }
  },
  computed: {
    ...mapState(['user']),
  },
  created() {
    this.loadChannels()
  },
  components: {
    ArticleList,
    ChannelEdit,
  },
  methods: {
    // 请求频道数据的方法
    async loadChannels() {
      let channels = []
      if (this.user) {
        const { data } = await getUserChannels()
        channels = data.data.channels
      } else {
        const loacalChannels = getItem('user-channels')
        if (loacalChannels) {
          channels = loacalChannels
        } else {
          // 获取默认列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
      }
      this.channels = channels
    },
    OnUpdateActive(index) {
      this.active = index
    },
  },
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
    background-color: #dda7a7a1;
    border: none;
    .van-icon {
      font-size: 16px;
    }
  }
  .channel-tabs {
    /deep/ .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line {
      width: 25px;
      height: 3px;
      bottom: 20px;
    }
  }
  .wap-nav-placeholder {
    width: 30px;
    flex-shrink: 0;
  }
  .wap-nav-wrap {
    position: fixed;
    width: 30px;
    height: 43px;
    right: 0;
    background-color: #fff;
    opacity: 0.9;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
