<template>
  <div id="list-layout">
    <header>
      <nav-bar />
    </header>

    <main>
      <div class="main-wrapper">
        <div class="top">
          <slot name="header"></slot>
        </div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
      <aside>
        <TagNav v-if="!slots.aside" />
        <slot name="aside"></slot>
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">
import TagNav from "~~/components/home/tagNav.vue";
const slots = useSlots();
</script>

<style scoped lang="scss">
#list-layout {
  header {
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
    .main-wrapper {
      width: 80%;
      .content {
        box-sizing: border-box;
        // padding-right: 0.5rem;
      }

      .top {
        animation: opacity-transition 1.5s forwards, translate-top 1.5s forwards;
        transition: opacity 1.5s, transform 1.5s;
      }
    }

    aside {
      width: 20%;
      box-sizing: border-box;
      padding: 0 0.8rem;
    }
  }
}
</style>
