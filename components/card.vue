<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    hoverBorderColor?: string;
  }>(),
  {
    hoverBorderColor: "var(--card-border)",
  }
);
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 16px -4px #2c2d300c;
  background-color: white;
  border: 1px solid var(--card-border);
  transition: border-color 0.3s;
  &:hover {
    border-color: v-bind(hoverBorderColor);
  }
}
</style>
