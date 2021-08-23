<template>
  <div
    id="q-app"
    class="initAppStyle"
  >
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.initAppStyle {
  background: #f8f8f8;
}
</style>
