<template>
  <div>
    <div class="web_bg"></div>
    <header>
      <NavBar />
    </header>
    <main class="container">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.web_bg {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: -99;
  background-color: var(--bg-color);
}
.container {
  max-width: var(--max-width);
  margin: 60px auto 0;
  padding: 10px 0;
}
</style>
