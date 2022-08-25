<template>
  <div id="list-layout">
    <header>
      <nav-bar />
    </header>

    <main>
      <div class="top">
        <slot name="header"></slot>
      </div>
      <div class="content">
        <slot></slot>
      </div>
      <div class="aside">
        <slot name="aside"></slot>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
#list-layout {
  main {
    margin-top: 60px;
    max-width: var(--max-width);
    width: var(--max-width);
    padding: 10px 30px;
    box-sizing: border-box;
    margin: 60px auto 0;
    display: flex;
    .content {
      width: 80%;
      box-sizing: border-box;
    }
    .aside {
      width: 20%;
      box-sizing: border-box;
    }
  }
}
</style>
