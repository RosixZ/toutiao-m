<template>
  <div class="personal-container">
    <van-cell-group class="my-info" v-if="user">
      <van-cell
        title="单元格"
        value="内容"
        center
        class="base-info"
        :border="false"
      >
        <van-image
          class="avatar"
          round
          slot="icon"
          fit="cover"
          :src="currentUser.photo"
        />
        <div class="name" slot="title">{{ currentUser.name }}</div>
        <van-button class="update-btn" size="small" round to="/user/profile"
          >编辑资料</van-button
        >
      </van-cell>

      <van-grid :border="false" class="data-info">
        <van-grid-item class="data-info-item" text="文章">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.art_count }}</div>
            <div class="text">文章</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item" text="文章">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item" text="文章">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item" text="文章">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!-- 未登录状态下 -->
    <div class="not-login" v-else>
      <div class="i-icon" @click="$router.push('./login')">
        <img class="i-icon-img" src="./i-icon.png" alt="" />
      </div>
      <div class="text">登陆/注册</div>
    </div>

    <van-grid :column-num="2" class="nav-grid mb-4">
      <van-grid-item class="nav-grid-item" icon="star-o" text="收藏" />
      <van-grid-item
        class="nav-grid-item"
        icon="browsing-history-o"
        text="历史"
      />
    </van-grid>

    <van-cell title="消息通知" is-link url="/vant/mobile.html" />
    <van-cell v-if="user" title="智能客服" is-link to="index" class="mb-4" />

    <van-cell
      v-if="user"
      class="logout-cell"
      title="退出登陆"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'
export default {
  name: 'PersonalIndex',
  data() {
    return {
      currentUser: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.loadCurrentUser()
  },
  methods: {
    async loadCurrentUser() {
      const { data } = await getCurrentUser()
      this.currentUser = data.data
    },

    onLogout() {
      // 提示用户退出
      this.$dialog
        .confirm({
          title: '退出提示',
          message: '确认退出吗'
        })
        .then(() => {
          this.$store.commit('setUser', null)
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style scoped lang="less">
.personal-container {
  .not-login {
    height: 180px;
    background: url('https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4273030465,3087404844&fm=26&gp=0.jpg')
      no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .i-icon {
      border-bottom: 1px solid snow;
      .i-icon-img {
        height: 80px;
        width: 80px;
      }
    }

    .text {
      font-size: 20px;
      color: snow;
    }
  }
  .my-info {
    background: url('https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4273030465,3087404844&fm=26&gp=0.jpg')
      no-repeat;
    background-size: cover;

    .base-info {
      box-sizing: border-box;
      background-color: unset;
      height: 115px;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        width: 68px;
        height: 68px;
        border: 1px solid snow;
        margin-right: 15px;
      }
      .name {
        font-size: 15px;
        color: snow;
      }
      .update-btn {
        height: 20px;
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }

    .data-info {
      .data-info-item {
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 20px;
          }
          .text {
            font-size: 13px;
          }
        }

        height: 65px;
        color: snow;
      }
    }
  }
  .nav-grid {
    .nav-grid-item {
      height: 70px;
      /deep/ .van-icon {
        font-size: 20px;
      }
      /deep/ .van-icon-star-o {
        color: #eb5253;
      }
      /deep/ .van-icon-browsing-history-o {
        color: rgb(241, 106, 43);
      }
      /deep/ .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>
