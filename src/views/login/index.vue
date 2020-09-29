<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="登陆"
      left-arrow
      @click-left="$router.back()"
    />
    <!--登陆表单 -->
    <van-form
      :show-error="false"
      :show-error-message="false"
      validate-first
      ref="login-form"
      @submit="onSubmit"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao touxiao-m"
        left-icon="shouji"
        right-icon="warning-o"
        placeholder="请输入手机/邮箱号"
        :rules="formRules.mobile"
        name="mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        left-icon="envelop-o"
        placeholder="请输入验证码"
        :rules="formRules.code"
        name="code"
      >
        <template #button>
          <van-button
            v-if="isCountShow"
            class="send-btn"
            size="small"
            round
            :loading="isSendMsg"
            @click.prevent="onSendCode"
            >获取验证码</van-button
          >
          <van-count-down
            v-else
            :time="1000 * 60"
            format="ss s"
            @finish="isCountShow = true"
          />
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button
          class="login-btn"
          v-bind:class="{ 'login-btn-on': user.mobile && user.code }"
          type="info"
          block
          >登陆</van-button
        >
      </div>
    </van-form>

    <!--登陆表单 /-->
  </div>
</template>

<script>
import { login, sendCode } from '@/api/user'
// import {
//     Toast
// } from 'vant'
export default {
  name: 'LoginIndex',
  data() {
    return {
      isCountShow: true,
      isSendMsg: false,
      user: {
        mobile: '', //
        code: ''
      },
      formRules: {
        mobile: [
          {
            required: true,
            message: '请输入手机号'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '输入有效手机号'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码'
          },
          {
            pattern: /\d{6}$/,
            message: '输入6位验证码'
          }
        ]
      }
    }
  },
  methods: {
    // Onlogin() 登陆按钮
    async onSubmit() {
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true,
        duration: 0
      })

      // 1.找数据接口
      // 2.封装请求方法
      // 3.请求调用登陆
      try {
        const res = await login(this.user)
        // 4.处理相应结果
        this.$toast.success('登陆成功')
        // 将后台返回的数据存入VueX中
        this.$store.commit('setUser', res.data.data)
        // 页面跳转
        this.$router.back() // 有缺点
      } catch (err) {
        console.log('', err)
        this.$toast.fail('登陆失败')
      }
    },
    // 表单验证失败时运用的方法
    onFailed(error) {
      this.$toast({
        message: error.errors[0].message,
        position: 'top'
      })
    },
    // 验证码功能
    async onSendCode() {
      try {
        await this.$refs['login-form'].validate('mobile')
        this.isSendMsg = true
        // 请求验证码操作
        const res = await sendCode(this.user.mobile)
        this.isCountShow = false
      } catch (err) {
        let ErrorMsg = ''
        if (err.response && err.response.status === 429) {
          ErrorMsg = '发送过于频繁，请稍后重试'
        } else if (err.name === 'mobile') {
          ErrorMsg = err.message
        } else if (err.response && err.response.status === 404) {
          ErrorMsg = '手机号码不正确，请检查'
        } else {
          ErrorMsg = '发生未知错误，请检联系客服'
        }

        this.$toast({
          message: ErrorMsg,
          position: 'top'
        })
      }
      this.isSendMsg = false
    }
  }
}
</script>

<style lang="less" scoped>
.login-btn-on {
  background-color: #ff3232 !important;
}

.login-container {
  .send-btn {
    width: 80px;
    height: 26px;
    background-color: #ededed;

    .van-button__text {
      font-size: 11px;
      color: #666666;
    }
  }

  .login-btn-wrap {
    padding: 26px 16px;

    .login-btn {
      background-color: #f17979;
      border: none;
      border-radius: 5px;

      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
