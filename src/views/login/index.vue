<template>
<div class="login-container">
    <van-nav-bar class="app-nav-bar" title="登陆" left-arrow @click-left="$router.back()" />
    <!--登陆表单 -->
    <van-cell-group>
        <van-field v-model="user.mobile" icon-prefix="toutiao touxiao-m" left-icon="shouji" right-icon="warning-o" placeholder="请输入手机/邮箱号" />
        <van-field v-model="user.code" clearable left-icon="envelop-o" placeholder="请输入验证码">
            <template #button>
                <van-button class="send-btn" size="small" round>获取验证码</van-button>
            </template>
        </van-field>
    </van-cell-group>
    <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block @click="onLogin">登陆</van-button>
    </div>

    <!--登陆表单 /-->
</div>
</template>

<script>
import {
    login
} from "@/api/user";

export default {
    name: "LoginIndex",
    data() {
        return {
            user: {
                mobile: "", //
                code: ""
            }
        };
    },
    methods: {
        async onLogin() {
            //1.找数据接口
            //2.封装请求方法
            //3.请求调用登陆
            try {
                const res = await login(this.user);
                //4.处理相应结果
                console.log(res);
            } catch (err) {
                console.log("登陆失败", err);
            }
        }
    }
};
</script>

<style lang="less" scoped>
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
            background-color: #6db4fb;
            border: none;
            border-radius: 5px;

            .van-button__text {
                font-size: 15px;
            }
        }
    }
}
</style>
