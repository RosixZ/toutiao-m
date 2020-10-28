<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ !isEdit ? '编辑' : '完成' }}</van-button
      >
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        :class="{ active: index === active }"
        :icon="isEdit && index !== 0 ? 'clear' : ''"
        v-for="(channel, index) in userChannels"
        :key="index + 1"
        :text="channel.name"
        @click="onMyChannelClick(channel, index)"
      />
    </van-grid>
    <!-- 添加频道 -->
    <van-cell center :border="false">
      <div slot="title" class="channel-title">推荐频道</div>
      <div slot="label">点击进行添加</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="`${channel.name}`"
        @click="addChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannels, deleteUserChannels } from '@/api/user'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  data() {
    return {
      allChannels: [],
      isEdit: false, // 控制是否为编辑状态
    }
  },
  computed: {
    ...mapState(['user']),
    // 计算出推荐列表
    recommendChannels() {
      return this.allChannels.filter((channel) => {
        return !this.userChannels.find((myChannel) => {
          return myChannel.id === channel.id
        })
      })
    },
  },
  created() {
    this.loadAllChannels()
  },
  props: {
    userChannels: { type: Array, required: true },
    active: { type: Number, required: true },
  },
  methods: {
    async loadAllChannels() {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    async addChannel(channel) {
      this.userChannels.push(channel)

      //  数据持久化
      if (this.user) {
        await addUserChannels({
          channels: [{ id: channel.id, seq: this.userChannels.length }],
        })
      } else {
        // 存在本地
        setItem('user-channels', this.userChannels)
      }
    },
    onMyChannelClick(channel, index) {
      if (this.isEdit) {
        // 编辑状态
        this.deleteChannel(channel, index)
      } else {
        // 非编辑状态
        this.switchChannel(index)
      }
    },
    async deleteChannel(channel, index) {
      if (index === 0) {
        return
      }
      if (index <= this.active) {
        this.$emit('update-active', this.active - 1)
      }
      this.userChannels.splice(index, 1)

      if (this.user) {
        await deleteUserChannels(channel.id)
      } else {
        // 存在本地
        this.userChannels.splice(index, 1)
        setItem('user-channels', this.userChannels)
      }
    },
    switchChannel(index) {
      this.$emit('update-active', index)
      this.$emit('channelEditClose')
    },
  },
}
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 50px;
  .channel-title {
    color: #333333;
    font-size: 20px;
    font-weight: 600;
  }
  .channel-item {
    width: 80px;
    height: 43px;

    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 13px;
        color: #222;
        margin-top: 0;
        font-weight: 700;
      }
    }

    /deep/ .van-grid-item__icon {
      position: absolute;
      right: -9px;
      top: -9px;
      font-size: 20px;
      color: #cccccc;
    }
  }
  .active {
    /deep/ .van-grid-item__text {
      color: rgb(255, 104, 44) !important;
    }
  }
}
</style>
