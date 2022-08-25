<template>
  <NuxtLayout name="list-layout">
    <template #aside> </template>
    <template #default>
      <div class="default">
        <div class="contetn-bar">
          <card hover-border-color="var(--theme)">
            <ContentBar
              :items="contentNavData"
              @on-more-click="handleMoreClick"
            />
          </card>
        </div>
        <div class="post-items">
          <div class="post-item new">
            <post-item> </post-item>
          </div>
          <div class="post-item">
            <post-item> </post-item>
          </div>
        </div>
        <nav id="pagination">
          <Pagination/>
        </nav>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from "vue-router";
import ContentBar from "~~/components/contentBar.vue";
const contentNavData = ref<
  {
    name: string;
    to?: RouteLocationRaw;
  }[]
>([
  {
    name: "首页",
  },
  {
    name: "我的项目",
  },
  {
    name: "经验分享",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
  {
    name: "生活日常",
  },
]);

const handleMoreClick = () => {
  console.log("更多");
};
</script>

<style scoped lang="scss">
.default {
  .content-bar {
    width: 100%;
    display: flex;
  }
  .post-items {
    display: grid;
    grid-template-columns: 50% 50%;
    margin-top: 0.5rem;
    grid-column-gap: 0.5rem;
    .new {
      grid-column-start: 1;
      grid-column-end: 3;
    }
    .post-item {
      height: 12rem;
      margin-bottom: 0.5rem;
    }
  }
}
</style>
