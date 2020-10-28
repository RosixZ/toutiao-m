<template>
  <div class="comment-list">
    <van-cell title="所有回复:" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
        v-for="(comment, index) in list"
        :key="index"
        :comment="comment"
        @reply-click="$emit('reply-click', $event)"
      />

      <!-- <van-cell
        v-for="(comment, index) in list"
        :key="index"
        :title="comment.content"
      /> -->
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/article'
import CommentItem from './comment-item'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    type: {
      type: String,
      default: 'a'
    },
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      // 数组或对象的默认值比需由函数返回
      default: () => []
    }
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },

  methods: {
    async onLoad() {
      const { data } = await getComments({
        type: this.type,
        source: this.source.toString(),
        offset: this.offset,
        limit: this.limit
      })

      const { results } = data.data
      this.list.push(...results)

      this.loading = false
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }

    }
  }
}
</script>
<style>
</style>