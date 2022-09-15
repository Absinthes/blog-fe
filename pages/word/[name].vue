<template>
  <NuxtLayout>
    <nav class="nav-box">
      <div class="nav-left">
        <h1>{{currentType?.name}}</h1>
        <p>
          {{currentType?.describe}}
        </p>
      </div>
      <div class="nav-right">
        <div class="typeList-box">
          <NuxtLink
            :to="`/word/${it.nameEn}`"
            v-for="it in typeList?.childType"
            class="type-item underline-red-hover"
          >
            {{ it.name }}
          </NuxtLink>
        </div>
      </div>
    </nav>
    <article class="articleList-box">
      <div class="post-item" v-for="article in articleList">
        <PostItem
          :article="article"
          :date-mode="'text'"
          @article-click="router.push(`/article/${$event.id}`)"
          @tag-click="router.push(`/tags/${$event.name}`)"
        >
        </PostItem>
      </div>
    </article>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { getArticleByTypeName, getTypeByName } from "~~/api";
import { Article, Type } from "~~/types";
import PostItem from "~~/components/PostItems/postItem.vue";

const router = useRouter();
const route = useRoute();
const queryParams = reactive({
  pageSize: 10,
  currentPage: 1,
  pageNumber: 0,
  total: 0,
});

const typeList = ref<Type>();
const articleList = ref<Article[]>([]);
const currentType = ref<Type>();
let articleListRefresh;

useAsyncData("word", () => getTypeByName("word")).then(({ data }) => {
  typeList.value = data.value;
  currentType.value = typeList.value.childType.find(
    (it) => it.nameEn === (route.params.name as string)
  );
});

useAsyncData(`type.article.${route.params.name}`, async () => {
  const { pageSize: limit, currentPage } = queryParams;
  let articleList = await getArticleByTypeName(
    route.params.name as string,
    false,
    limit,
    limit * (currentPage - 1)
  );
  return articleList;
}).then(({ data, refresh }) => {
  articleList.value = data.value.nodes;
  queryParams.total = data.value.totalCount;
  articleListRefresh = refresh;
});
</script>

<style lang="scss" scoped>
.nav-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .nav-left {
    h1 {
      color: var(--color-red);
    }
    p {
      margin-top: 1.5rem;
      margin-bottom: 0;
      font-size: 0.9rem;
      color: var(--font-thin-color);
    }
  }
  .nav-right {
    font-size: 0.9rem;
    .typeList-box {
      margin-right: -1rem;
      .type-item {
        margin: 0 1.5rem;
        padding-bottom: 5px;
        cursor: pointer;
      }
    }
  }
}

.articleList-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 0.5rem;
  grid-column-gap: 1rem;
  margin-top: 2rem;
  .post-item {
    height: 12rem;
    margin-bottom: 1rem;
  }
}
</style>
