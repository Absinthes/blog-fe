<template>
  <NuxtLayout name="list-layout">
    <template #aside>
      <div class="aside">
        <TagNav />
      </div>
    </template>
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
          <!-- <div class="post-item new" v-for="article in articleData"> -->
          <!-- <post-item ></post-item> -->
          <!-- </div> -->
          <div class="post-item" v-for="article in articleData">
            <post-item :article="article"> </post-item>
          </div>
        </div>
        <nav id="pagination">
          <Pagination
            v-bind="paginationProps"
            :page-number="
              Math.ceil(paginationProps.total / paginationProps.pageSize)
            "
            @page-change="handlePageChange"
          />
        </nav>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from "vue-router";
import ContentBar from "~~/components/contentBar.vue";
import TagNav from "~~/components/home/tagNav.vue";
import postItem from "~~/components/home/postItem.vue";
import { getArticleList } from "~~/api";
import { Article } from "~~/types";

const route = useRoute();
const router = useRouter();
const paginationProps = reactive({
  pageSize: +route.query.limit! || 10,
  currentPage: +route.query.page! || 1,
  total: 0,
});
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
const articleData = ref<Article[]>([]);

const handleMoreClick = () => {
  console.log("更多");
};

let articleRefe;

useAsyncData("articleList", async () => {
  let articleList = await getArticleList(
    paginationProps.pageSize,
    paginationProps.currentPage
  );
  articleData.value = articleList.nodes;
  return articleList;
}).then(({ data, refresh }) => {
  articleRefe = refresh;
  articleData.value = data.value.nodes;
  paginationProps.total = data.value.totalCount
});

const unWatch = watch(
  () => [paginationProps.pageSize, paginationProps.currentPage],
  async ([limit, page]) => {
    articleRefe && (await articleRefe());
    router.push({
      query: {
        limit: limit,
        page: page,
      },
    });
  }
);

watch(route, () => {
  console.log(route);
  console.log(paginationProps);
});

const handlePageChange = (val: number) => {
  paginationProps.currentPage = val;
};

// onUnmounted(() => {
//   unWatch();
// });
</script>

<style scoped lang="scss">
.default {
  padding-right: 0.5rem;
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

.aside {
  width: 100%;
  height: 100%;
  padding-left: 0.5rem;
}
#pagination {
  margin-top: 1rem;
}
</style>
