<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->
    <!-- 填写选项 -->
    <van-cell title="头像" is-link center>
      <van-image round width="50" height="50" fit="cover" :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isEditShow = true"
    ></van-cell>
    <van-cell
      title="性别"
      is-link
      @click="isEditGenderShow = true"
      :value="user.gender === 0 ? '男' : '女'"
    ></van-cell>
    <van-cell
      title="生日"
      is-link
      @click="isEditBirthdayShow = true"
      :value="user.birthday || '2020-01-01'"
    ></van-cell>
    <!-- /填写选项 -->
    <!-- 昵称弹出层 -->
    <van-popup
      v-model="isEditShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name
        v-if="isEditShow"
        @close="isEditShow = false"
        :name="user.name"
        @upadate-name="user.name = $event"
      />
    </van-popup>
    <!-- 昵称弹出层 -->

    <!-- 性别弹出层 -->
    <van-popup v-model="isEditGenderShow" position="bottom">
      <update-gender @close="isEditGenderShow = false" v-model="user.gender" />
    </van-popup>
    <!-- /性别弹出层 -->

    <!-- 生日弹出层 -->
    <van-popup v-model="isEditBirthdayShow" position="bottom">
      <update-birthday
        @close="isEditBirthdayShow = false"
        v-model="user.birthday"
      />
    </van-popup>
    <!-- /生日弹出层 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
export default {

  name: 'UserProfile',
  data() {
    return {
      user: {},
      isEditShow: false, //修改昵称的弹出层展示
      isEditGenderShow: false,
      isEditBirthdayShow: false
    }
  },
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday
  },
  created() {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile() {
      const { data } = await getUserProfile()
      this.user = data.data
      console.log('user', this.user)
    }
  },
}
</script>

<style scoped lang='less'>
.van-popup {
  background-color: #f5f7f9;
}
</style>