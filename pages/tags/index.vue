<template>
  <NuxtLayout>
    <article class="tag-box">
      <div class="tag-item" v-for="it in tagList" :key="it.id" @click="handlerClick(it)">
        <span class="tag-punctuation">#</span>
        {{ it.name }}
        <span class="tag-total">{{ it.articles.length }}</span>
      </div>
    </article>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { getAllTag } from "~~/api";
import { Tag } from "~~/types";

const tagList = ref<Tag[]>([]);
const router = useRouter()

const getData = async () => {
  const { data: res } = await useAsyncData(() => getAllTag(1));
  console.log(res.value);
  tagList.value = res.value;
};
getData();

const handlerClick = (it: Tag) => {
  router.push(`/tags/${it.name}`)
}
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
    margin: 0 10px;
    background-color: var(--secondbg);
    border-radius: var(--md-radius);
    border: 1px solid var(--card-border);
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      background-color: var(--theme);
      color: var(--white);
      transform: scale(1.1);
    }
    &:hover .tag-total{
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
      min-width: 25px;
      padding: 4px;
      text-align: center;
      font-size: 1rem;
      border-radius: var(--md-radius);
    }
  }
}
</style>
