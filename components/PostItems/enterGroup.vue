<template>
  <div
    class="group-item"
    :style="{
      ...style,
      animation: `opacity-transition ${duration}s ${i * delay}s forwards,
      translate-${direction} ${duration}s ${i * delay}s forwards`,
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { StyleValue } from 'vue';

const props = withDefaults(
  defineProps<{
    i: number;
    delay?: number;
    duration?:number
    style?: StyleValue;
    direction?:"top"|"bottom"|"left"|"right"
  }>(),
  {
    delay:0.3,
    duration:0.8,
    style:{},
    direction:"bottom"
  }
);
</script>

<style scoped lang="scss">
.group-item {
  opacity: 0;
  transition: opacity v-bind(duration)s, transform v-bind(duration)s;
}
</style>
