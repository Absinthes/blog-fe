<template>
  <NuxtLayout>
    <Card>
      <div class="tag">
        <aside class="tags-box">
          <div
            class="tags-item"
            v-for="it in tagList"
            @click="tagClick(it)"
            :class="{ active: currentTag == it.name }"
          >
            <span class="label">#</span>
            <span class="title">{{ it.name }}</span>
            <span class="num">{{ it.articles.length }}</span>
          </div>
        </aside>
        <article>
          <h1>{{ currentTag.name }}</h1>
          <div></div>
        </article>
      </div>
    </Card>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { getAllTag, getArticleByTagId } from "~~/api";
import { Article, Tag } from "~~/types";

type ArticleListByTimeType = {
  [T in string]: Article[];
};

const route = useRoute();
const router = useRouter();
const queryParams = reactive({
  limit: 10,
  currentPage: 1,
  total: 0,
});

const tagList = ref<Tag[]>([]);
const currentTag = ref<Tag>({});
const articleList = ref<ArticleListByTimeType>({});
const IMG_ADDRESS = import.meta.env.VITE_BASE_IMG_ADDRESS;

const filterArticle = (list: Article[]) => {
  let res: ArticleListByTimeType = {};
  list.forEach((it) => {
    const year = new Date(+it.createTime).getFullYear();
    if (year in res) {
      res[year].push(it);
    } else {
      res[year] = [it];
    }
  });
  return res;
};

const getTagAll = async () => {
  const { data: res } = await useAsyncData(() => getAllTag(1));
  tagList.value = res.value || [];
  currentTag.value = tagList.value.find((it) => it?.name === route.params.name);
};
const getArticle = async () => {
  console.log(currentTag.value.name)
  const { data: res } = await useAsyncData(() =>
    getArticleByTagId(currentTag.value.id)
  );
  articleList.value = filterArticle(res.value.nodes);
  queryParams.total = res.value.totalCount;
  console.log(articleList.value, res.value);
};
getTagAll().then(getArticle)


const tagClick = async (tag: Tag) => {
  currentTag.value = tag;
  articleList.value = {}
  await getArticle()
  router.replace(`/tags/${tag.name}`);
};
</script>

<style lang="scss" scoped>
.tag {
  padding: 1.5rem 1.5rem;
}
.tags-box {
  display: flex;
  color: var(--font-color);
  .tags-item {
    padding: 5px 10px;
    border: 1px solid var(--card-border);
    border-radius: var(--normal-radius);
    margin: 0 7px;
    cursor: pointer;
    transition: border-color 0.3s, background-color 0.3s, color 0.3s,
      transform 0.3s;
    &.active {
      border-color: var(--theme);
      background-color: var(--theme);
      color: var(--white);
      & .num {
        background-color: var(--card-bg);
        color: var(--theme);
      }
    }

    &:hover {
      border-color: var(--theme);
      background-color: var(--theme);
      color: var(--white);
      transform: scale(1.1);
      & .num {
        background-color: var(--card-bg);
        color: var(--theme);
      }
    }
    .label {
      opacity: 0.4;
    }
    .title {
      margin-right: 4px;
    }
    .num {
      display: inline-block;
      padding: 1px 0px;
      text-align: center;
      min-width: 22px;
      font-size: 0.9rem;
      background-color: var(--secondbg);
      border-radius: 4px;
      transition: background-color 0.3s, color 0.3s;
    }
  }
}
</style>
