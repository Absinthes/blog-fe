<template>
  <NuxtPage />
  <BackToTop />
  <MusicWidget />
</template>

<script setup lang="ts">
import { scrollHideShowControl } from "./utils/scrollHideShowControl";

onMounted(() => {
  scrollHideShowControl(window);
});
</script>
