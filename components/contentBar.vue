<template>
  <div id="content-bar">
    <div class="content-bar-items" @wheel.prevent="handleWheel" ref="itemsRef">
      <div
        class="content-bar-item"
        :class="{
          active: item.nameEn === activeMenu || item.name === activeMenu
        }"
        v-for="item in items"
        @click="emit('update:activeMenu', item.nameEn)"
      >
        <span>
          {{ item.name }}
        </span>
      </div>
    </div>
    <div class="content-bar-more" @click="emit('onMoreClick')">更多</div>
  </div>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from "vue-router";
import { Type } from "~~/types";

const itemsRef = ref();
const handleWheel = (event) => {
  itemsRef.value.scrollLeft += event.deltaY;
};
const props = withDefaults(
  defineProps<{
    items?: Type[];
    activeMenu: string
  }>(),
  {
    items: [],
  }
);

const emit = defineEmits<{
  (e: "onMoreClick"): void;
  (e: "update:activeMenu", name: string): void;
}>();

onMounted(() => {});
</script>

<style scoped lang="scss">
#content-bar {
  display: flex;
  white-space: nowrap;
  width: 100%;
  text-align: center;
  padding: 8px 20px 8px 10px;
  .content-bar-items {
    display: flex;
    flex: 1;
    overflow: hidden;

    .content-bar-item {
      span {
        display: inline-block;
        transition: background-color 0.3s, color 0.3s;
      }
      &:hover span {
        background-color: var(--theme);
        color: white;
      }
      &.active span{
        background-color: var(--theme);
        color: white;
      }
    }
  }

  .content-bar-more {
    padding: 5px 10px;
    margin-right: 1rem;
    margin-left: 1rem;
    cursor: pointer;
    border-radius: 5px;
    font-weight: 700;
    &:hover {
      color: var(--theme);
    }
  }

  .content-bar-items .content-bar-item span {
    padding: 5px 10px;
    margin: 0 4px;
    cursor: pointer;
    border-radius: 5px;
    font-weight: 700;
  }
}
</style>
