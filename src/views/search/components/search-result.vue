<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10,
    }
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      const { data } = await getSearchResult({
        page: this.page, // 页码
        per_page: this.per_page, // 每页大小
        q: this.searchText, // 搜索字符
      })

      const { results } = data.data
      this.list.push(...results)

      this.loading = false

      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    },
  },
}
</script>

<style scoped lang="less">
.search-result {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 54px;
  overflow-y: auto;
}
</style>