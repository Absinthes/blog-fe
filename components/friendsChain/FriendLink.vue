<template>
  <div class="friendLinks">
      <FriendItem v-for="item in data" :key="item.id" :data="item" />
  </div>
</template>

<script setup lang="ts">
import { FriendsChain } from "~~/types";
import FriendItem from "./FriendItem.vue";

const { data } = defineProps<{
  data?: FriendsChain[];
}>();
console.log(data)
</script>

<style scoped lang="scss">
  .friendLinks{
    width: 100%;
    display: inline-grid;;
    grid-template-columns: repeat(auto-fill,minmax(150px,180px));
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
  }
</style>
