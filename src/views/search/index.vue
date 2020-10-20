<template>
  <div class="search-container">
    <!--搜索栏 -->
    <div>
      <form action="/">
        <van-search
          v-model="searchText"
          show-action
          placeholder="请输入搜索关键词"
          background="#ff3232"
          @focus="isResultShow = false"
          @search="onSearch(searchText)"
          @cancel="$router.back()"
        />
      </form>
    </div>
    <!--搜索栏 -->
    <!-- 搜索结果块 -->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    ></search-result>
    <!-- /搜索结果块 -->
    <!-- 联想块 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></search-suggestion>
    <!-- /联想块 -->
    <!-- 搜索历史-->
    <search-history
      v-else
      :search-histories="searchHistories"
      @search="onSearch"
      @update-histories="deleteAllhistory"
    ></search-history>
    <!-- /搜索历史-->
  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
import { getSearchHistories, delateAllHistories } from '@/api/search'
import { mapState } from 'vuex'

export default {
  name: 'searchIndex',
  data() {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果的状态
      searchHistories: [], // 记录搜索历史
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.loadSearchHistories()
  },
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult,
  },
  methods: {
    onSearch(searchText) {
      this.searchText = searchText
      // 记录搜索历史 因为要把最新的放在最上，且不重复，这里做法为：找出重复项索引，删除，然后用unshift重新添加
      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
        this.searchHistories.splice(index)
      }
      this.searchHistories.unshift(searchText)
      // 存储数据持久化
      // 没有登陆的情况下
      setItem('search-histroies', this.searchHistories)
      // 因后台数据太少，所以把后端与本地的搜索记录合并
      // 1.用Es6语法
      // 2.用js库
      this.isResultShow = true
    },
    deleteAllhistory() {
      this.$dialog
        .confirm({
          title: '删除确认',
          message: '是否删除所有历史记录？'
        })
        .then(() => {
          // 本地删除
          this.searchHistories = []
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
    async loadSearchHistories() {
      // 因后台数据太少，所以把后端与本地的搜索记录合并
      // 1.用Es6语法
      // 2.用lodash.js库
      let searchHistories = getItem('search-histroies') || []
      if (this.user) {
        const { data } = await getSearchHistories()
        searchHistories = [...new Set([
          ...searchHistories,
          ...data.data.keywords
        ])]
      }
      this.searchHistories = searchHistories
    },
  },
}
</script>

<style lang="less" scoped>
.search-container {
  .van-search__action {
    color: white;
    &:hover {
      background-color: #ff3232;
    }
  }
}
</style>