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
        :date-mode="dateMode"
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
    data?: Article[];
    duration?:number;
    dateMode?: "time" | "text"
  }>(),
  {
    size: 2,
    data: [],
    duration:0.3,
<<<<<<< HEAD
    dateMode: "time"
=======
>>>>>>> 2d68d9389bfcc1b511bf2f3f43a6784e48c68b7a
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
  // grid-template-columns: repeat(v-bind(size), 1fr);
  margin-top: 0.5rem;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
}


</style>
