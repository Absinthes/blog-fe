<template>
  <div class="post-items">
    <div
      class="post-item"
      v-for="(article,i) in data"
      :key="article.id"
      :style="{
        ...style,
        'animation':`opacity-transition 1.5s ${i * duration}s forwards,
    translateY-transition 1.5s ${i * duration}s forwards`
      }"
    >
      <PostItem
        :article="article"
        @article-click="emit('articleClick', $event)"
        @tag-click="emit('tagClick', $event)"
      ></PostItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StyleValue } from "vue";
import { Article, Tag } from "~~/types";
import PostItem from "./postItem.vue";
const props = withDefaults(
  defineProps<{
    size?: number;
    style: StyleValue;
    data: Article[];
    duration?:number
  }>(),
  {
    size: 2,
    data: [],
    duration:0.3
  }
);

const emit = defineEmits<{
  (e: "articleClick", article: Article);
  (e: "tagClick", tag: Tag);
}>();
</script>

<style scoped lang="scss">
.post-items {
  display: grid;
  grid-template-columns: repeat(v-bind(size), 1fr);
  margin-top: 0.5rem;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
}
.post-item {
  opacity:0;
  transition: opacity 1.5s, transform 1.5s;
}

@keyframes translateY-top {
  0% {
    transform: translateY(-30px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
