new Vue({
    el: '#app',
    data() {
      const validateUsername = function(rule, value, callback) {
        if (!value) {
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }
      const validatePass = function(rule, value, callback) {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: 'admin',
          password: 'admin'
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePass }]
        },
        loading: false,
        pwdType: 'password'
      }
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(function(valid) {
          if (valid) {
            this.loading = true
            axios.post('Login', this.loginForm).then(function() {
              this.loading = false
              location.href = 'teacher.html'
            }).catch(function() {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    mounted: function() {
    }
});