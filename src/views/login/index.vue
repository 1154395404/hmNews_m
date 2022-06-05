<template>
  <div class="container">
    <van-nav-bar
      title="登录"
      class="nav-bar"
    />
    <van-form @submit="goLogin" ref="userFrom">
      <van-cell-group>
        <van-field
          name="mobileField"
          v-model=" loginData.mobile"
          icon="question-o"
          placeholder="请输入手机号"
          type="number"
          maxlength="11"
          :rules="userRules.mobile"
        >
          <template #left-icon>
            <i class="iconfont icon-shouji"></i>
          </template>

        </van-field>

        <van-field
          v-model="loginData.code"
          placeholder="获取验证码"
          :border="false"
          class="psw-filed"
          type="number"
          maxlength="6"
          :rules="userRules.code"
        >
          <template #left-icon>
            <i class="iconfont icon-yanzhengma"></i>
          </template>
          <template #button>
            <div class="line"></div>

            <van-count-down v-if="!isEnableSend" :time="1000 * 60" format="ss s" @finish="isEnableSend=true"/>
            <van-button v-else class="get-valid" @click="getCode" size="small" round type="primary"
                        native-type="button">
              获取验证码
            </van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div class="btn-wrap">
        <van-button type="primary" block native-type="submit">登录</van-button>
      </div>
    </van-form>

  </div>
</template>

<script>

import login from '../../api/user/login'
import sendCode from '../../api/user/sendCode'

export default {
  name: 'login',
  components: {},
  props: [],
  data () {
    return {
      isEnableSend: true,
      loginData: {
        mobile: 17692455655,
        code: 246810
      },
      userRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码格式' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码码格式' }
        ]
      }
    }
  },
  methods: {
    async goLogin () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await login(this.loginData)
        this.$toast.success('登录成功')
        this.$store.commit('setUserToken', data.data)
      } catch (e) {
        if (e.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
          // console.log('手机号或验证码错误')
        } else {
          this.$toast.fail('登录错误，请稍后再试')
          // console.log('登录错误，请稍后再试')
        }
      }
    },
    async getCode () {
      try {
        await this.$refs.userFrom.validate('mobileField')
        this.isEnableSend = false
        this.$toast.loading({
          message: '发送中...',
          forbidClick: true,
          duration: 0
        })
        try {
          await sendCode(this.loginData.mobile)
          this.$toast.success('发送成功')
        } catch (e) {
          this.isEnableSend = true
          if (e.response.status === 404) {
            this.$toast.fail('手机号不正确')
          } else if (e.response.status === 429) {
            this.$toast.fail('请等待一段时后发送')
          } else {
            this.$toast.fail('未知错误')
          }
        }
      } catch (e) {

      }
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  }
}
</script>

<style scoped lang="less">
.container {

  .iconfont {
    font-size: 44px;
  }

  //get-valid
  /deep/ .van-field__button {
    display: flex;
  }

  .get-valid {
    width: 152px;
    height: 46px;

    background: #ededed;
    border: none;
    font-size: 24px;
    line-height: 24px;
    color: #666;

  }

  .line {

    transform: translateX(-10px);
    border-right: 1px solid #ededed;
  }

  .btn-wrap {
    padding: 60px 30px;

    .van-button {
      background-color: #6db4fb;
      border: none;
    }
  }

}
</style>
