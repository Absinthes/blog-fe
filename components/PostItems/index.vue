<template>
  <div class="post-items">
    <EnterGroup
      v-for="(article,i) in data"
      :key="article.id"
      :style="style"
      :i="i"
    >
      <PostItem 
        :data="article"
        @article-click="emit('articleClick', $event)"
        @tag-click="emit('tagClick', $event)"
      ></PostItem>
    </EnterGroup>
  </div>
</template>

<script setup lang="ts">
import { StyleValue } from "vue";
import { Article, Tag } from "~~/types";
import PostItem from "./postItem.vue";
import EnterGroup from "./enterGroup.vue";
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
    duration:0.3,
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


</style>
