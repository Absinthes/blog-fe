<template>
  <div
    class="markdown-body"
    v-html="content"
    :class="{ [props.slefClass]: true }"
  ></div>
</template>

<script setup lang="ts">
import { getMarkdownIt } from "~~/utils/hook/useMarkdown";

const md = getMarkdownIt();
const content = ref("");
const props = defineProps<{
  mdData: string;
  slefClass?: string;
}>();

content.value = md.render(props.mdData);
</script>
