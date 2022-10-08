<template>
  <NuxtLayout>
    <article class="tag-box">
      <EnterGroup v-for="(it, i) in tagList" :key="it.id" :i="i" :delay="0.1" :duration="1" direction="right">
        <NuxtLink class="tag-item" :to="`/tags/${it.name}`">
          <span class="tag-punctuation">#</span>
          {{ it.name }}
          <span class="tag-total">{{ it.articles.length }}</span>
        </NuxtLink>
      </EnterGroup>
    </article>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { getAllTag, getAllTag_hone } from "~~/api";
import { Tag } from "~~/types";
import EnterGroup from "~~/components/PostItems/enterGroup.vue";

const tagList = ref<Tag[]>([]);

const getData = async () => {
  const { data: res } = await useAsyncData(
    'allTag',
    async () => await getAllTag_hone()
  );
  console.log(res.value);
  tagList.value = res.value;
};
getData();
</script>

<style scoped lang="scss">
.tag-box {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  color: var(--font-color);
  margin: 10px 0;
  .tag-item {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    padding: 10px;
    margin: 0 10px 20px;
    background-color: var(--secondbg);
    border-radius: var(--md-radius);
    border: 1px solid var(--card-border);
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      background-color: var(--theme);
      color: var(--white);
      transform: scale(1.1);
    }
    &:hover .tag-total {
      color: var(--theme);
      transition: color 0.3s;
    }
    .tag-punctuation {
      opacity: 0.4;
      margin-right: 7px;
    }
    .tag-total {
      display: inline-block;
      margin-left: 7px;
      background-color: var(--white);
      min-width: 20px;
      padding: 4px;
      text-align: center;
      font-size: 1rem;
      border-radius: var(--normal-radius);
    }
  }
}
</style>
