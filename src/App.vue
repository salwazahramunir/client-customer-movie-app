<script>
import { mapActions, mapWritableState } from 'pinia'
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/useAuthStore'

export default {
  computed: {
    ...mapWritableState(useAuthStore, ["isLogin"])
  },
  created() {
    if (localStorage.access_token) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  }
}
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>