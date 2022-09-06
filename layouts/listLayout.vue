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
      <aside>
        <slot name="aside"></slot>
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
#list-layout {
  header{
    height: var(--top-nav-height);
  }
  main {
    position: relative;
    display: flex;
    padding: 10px 30px;
    margin: 0 auto 0;
    max-width: var(--max-width);
    width: var(--max-width);
    box-sizing: border-box;
    .content {
      width: 80%;
      box-sizing: border-box;
      padding-right: 0.5rem;
    }
    aside {
      width: 20%;
      box-sizing: border-box;
      padding: 0 0.8rem;
    }
  }
}
</style>
