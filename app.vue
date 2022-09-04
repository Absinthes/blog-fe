<template>
  <NuxtPage />
  <BackToTop />
</template>

<script setup lang="ts">
import { scrollHideShowControl } from "./utils/scrollHideShowControl";

onMounted(() => {
  scrollHideShowControl(window);
});
</script>
