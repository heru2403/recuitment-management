<template>
    <div class="otp-container">
      <input 
        v-for="(digit, index) in otpDigits" 
        :key="index"
        v-model="otpDigits[index]"
        maxlength="1"
        @input="handleOtpInput(index, $event)"
      >
      <button :disabled="!isOtpComplete" @click="verifyOtp">
        Verifikasi
      </button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        otpDigits: ['', '', '', '', '', '']
      }
    },
    computed: {
      isOtpComplete() {
        return this.otpDigits.every(d => d !== '')
      }
    },
    methods: {
      handleOtpInput(index, event) {
        if (event.data && index < 5) {
          this.$refs[`input-${index + 1}`][0].focus()
        }
      },
      async verifyOtp() {
        const otpCode = this.otpDigits.join('')
        try {
          await this.$axios.post('/auth/otp-verify', {
            code: otpCode,
            email: this.$route.query.email
          })
          this.$emit('verified')
        } catch (error) {
          this.$toast.error('Kode OTP salah atau kadaluarsa')
        }
      }
    }
  }
  </script>
  