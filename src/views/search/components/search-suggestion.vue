<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(suggestion, index) in SearchSuggestions"
      :key="index"
      @click="$emit('search', suggestion)"
    >
      <div slot="title" v-html="hightLight(suggestion)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
// 当异步加载慢时不能占用输入框，引入防抖函数
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  data() {
    return {
      SearchSuggestions: [],
    }
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  methods: {
    // 让搜索结果中的关键字高亮
    hightLight(suggestion) {
      return suggestion.replace(
        new RegExp(this.searchText, 'gi'),
        `<span style="color:red">${this.searchText}</span>`
      )
    },
  },

  watch: {
    // 监视props或data里的数据
    // searchText() {
    //这样写第一次因为组件还没渲染而无法监听到第一个输入
    // },
    // 当异步加载慢时不能占用输入框，引入防抖函数
    //     searchText: {
    //   async handler() {
    //     // 发生变化时执行的函数
    //     const { data } = await getSearchSuggestions(this.searchText)
    //     this.SearchSuggestions = data.data.options
    //   },
    searchText: {
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchText)
        this.SearchSuggestions = data.data.options
      }, 200),
      immediate: true,
    },
  },
}
</script>

<style>
</style>