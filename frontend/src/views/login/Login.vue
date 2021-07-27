<template>
  <div class="login">
    <canvas id="cav"></canvas>
    <el-card class="card" shadow="always">
      <h3>XBrother前端监控</h3>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="68px"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="confirmCode">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-input v-model="confirmCode"></el-input>
            </el-col>
            <el-col :span="12">
              <div class="code-text">123</div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="">
          <el-button
            type="primary"
            class="btn"
            @click="loginClick"
            :loading="loading"
            >登陆</el-button
          >
        </el-form-item>
      </el-form>
      <div class="footer">Copyright by jason-xiewenqiang@xbrother</div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue';
import { useCanvas } from './useCanvas';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
export default defineComponent({
  setup() {
    useCanvas('cav');
    const ruleForm = reactive({
      account: '',
      password: '',
      confirmCode: '',
    });
    const rules = {
      account: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 12 个字符', trigger: 'blur' },
      ],
      password: [{ required: true, message: '请输入密码', trigger: 'change' }],
      confirmCode: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
      ],
    };
    const loading = ref(false);
    const router = useRouter();
    const loginClick = () => {
      loading.value = true;
      if (ruleForm.account && ruleForm.password && ruleForm.confirmCode) {
        setTimeout(() => {
          loading.value = false;
          router.push({ path: '/' });
        }, 1500);
      } else {
        ElMessage({
          type: 'error',
          message: '请填写完成登陆信息再进行登陆！',
        });
        setTimeout(() => {
          loading.value = false;
        }, 1500);
      }
    };
    return {
      ruleForm,
      ...toRefs(ruleForm),
      rules,
      loginClick,
      loading,
    };
  },
});
</script>
<style lang="less">
@cardHeight: 560px;
.login {
  width: 100%;
  height: 100%;
  position: relative;
  background: url(../../assets/air.jpeg) center center no-repeat;
  canvas {
    width: 100%;
    height: 100%;
  }
  .card {
    width: 350px;
    height: @cardHeight;
    position: absolute;
    right: 40px;
    top: calc(50% - @cardHeight / 2);
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.6);
    border-color: transparent;
    .el-card__body {
      height: 100%;
    }
    .el-form {
      margin-top: 20%;
      margin-bottom: 20%;
    }
    h3 {
      font-size: 24px;
      color: #fff;
      text-align: center;
    }
    .btn {
      width: 100%;
    }
    .footer {
      font-size: 12px;
      color: #fff;
      text-align: center;
    }
    .code-text {
      background-color: #fff;
      color: thistle;
    }
  }
}
</style>
