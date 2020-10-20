<template>
  <div class="search-history">
    <van-cell center title="搜索历史">
      <div>
        <span>一键清空</span>
        <!-- prop 数据如果是引用数据（对象，数组）可以修改，
        这个修改指：user.name=''、arr.push(123)、arr.splice(0,1)
        但然和prop 数据都不能重新赋值
        若要修改，要让父组件自己修改
        -->
        <van-icon
          name="delete"
          class="deleteIconImg"
          @click="$emit('update-histories')"
        />
      </div>
    </van-cell>
    <van-cell v-for="(history, index) in searchHistories" :key="index">
      <div slot="title" @click="search(history)">{{ history }}</div>
      <van-icon
        name="close"
        class="closeIconImg"
        @click="deleteHistory(index)"
      />
    </van-cell>
  </div>
</template>

<script>
import { setItem, getItem } from '@/utils/storage'
import { delateAllHistories } from '@/api/search'
import { mapState } from 'vuex'
export default {
  name: 'SearchHistory',
  computed: {
    ...mapState(['user'])
  },
  props: {
    searchHistories: {
      type: Array,
      required: true,
    },
  },
  methods: {
    deleteAllHistoriesIcon() {
      // 提示是否全部删除
      this.$dialog
        .confirm({
          title: '删除确认',
          message: '是否删除所有历史记录？'
        })
        .then(() => {
          // 本地删除
          this.searchHistories = ''
          setItem('search-histroies', this.searchHistories)
          // 当为登陆状态时，删除服务器的信息
          if (this.user) {
            delateAllHistories()
          }

          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    },
    deleteHistory(index) {
      this.searchHistories.splice(index, 1)
      // 删除本地
      setItem('search-histroies', this.searchHistories)
      // 删除服务器数据
    },
    search(history) {
      this.$emit('search', history)
    }
  },
}
</script>

<style scoped lang="less">
.search-history {
  .deleteIconImg {
    position: relative;
    width: 20px;
    top: 2px;
  }
  .closeIconImg {
    position: relative;
    width: 20px;
    top: 2px;
  }
}
</style>