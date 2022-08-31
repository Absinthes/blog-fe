<template>
  <NuxtLayout>
    <Card>
      <div class="tag">
        <aside class="tags-box">
          <div
            class="tags-item"
            v-for="it in tagList"
            @click="tagClick(it)"
            :class="{ active: currentTag.name == it.name }"
          >
            <span class="label">#</span>
            <span class="title">{{ it.name }}</span>
            <span class="num">{{ it.articles.length }}</span>
          </div>
        </aside>
        <article class="content">
          <h1 class="tag-name">{{ currentTag.name }}</h1>
          <div class="article-box">
            <div v-for="(it, key) in articleList" class="article-group-box">
              <p class="time">{{ key }}</p>
              <div class="article-box">
                <div v-for="ele in it" class="article-item">
                  <img
                    :src="IMG_ADDRESS + ele.pic"
                    :alt="IMG_ADDRESS + ele.pic"
                  />
                  <div class="info">
                    <p class="article-title">{{ ele.title }}</p>
                    <div v-for="tag in ele.tags" class="tags">
                      <span class="tag">
                        <span class="sign">#</span>
                        <span>{{ tag.name }}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </Card>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { getAllTag, getArticleByTagId } from "~~/api";
import { Article, Tag } from "~~/types";

definePageMeta({
  keepalive: false
})

type ArticleListByTimeType = {
  [T in string]: Article[];
};
console.log(1111);

const route = useRoute();
const router = useRouter();
const queryParams = reactive({
  limit: 10,
  currentPage: 1,
  total: 0,
});

const IMG_ADDRESS = import.meta.env.VITE_BASE_IMG_ADDRESS;

const { data: tagList } = await useAsyncData(() => getAllTag(1));
const currentTag = ref<Tag>(
  tagList.value.find((it) => it?.name === route.params.name)
);

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

const { data: articleList, refresh: articleRefresh } = await useAsyncData(
  "article",
  async () => {
    let { nodes, totalCount } = await getArticleByTagId(currentTag.value.id);
    queryParams.total = totalCount;
    return filterArticle(nodes);
  }
);

const tagClick = async (tag: Tag) => {
  currentTag.value = tag;
  await articleRefresh();
  router.push(`/tags/${tag.name}`);
};
</script>

<style lang="scss" scoped>
.tag {
  padding: 1.5rem 1.5rem;
  color: var(--font-color);
}
.tags-box {
  display: flex;
  color: var(--font-color);
  .tags-item {
    padding: 5px 10px;
    border: 1px solid var(--card-border);
    border-radius: var(--normal-radius);
    margin-right: 7px;
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

.content{
  .article-box{
    .article-group-box{
      margin: 5px 0;
      .time{
        color: #c3c3c3;
      }
      .article-item{
        display: flex;
        img{
          width: 150px;
          height: 90px;
          object-fit: cover;
          border-radius: var(--xl-radius);
        }
        .info{
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 1rem;
        }
        .article-title{
          margin: 0;
          font-weight: 700;
          line-height: 2.5rem;
          font-size: 1.2rem;
        }
        .tags{
          display: flex;
          font-size: 0.9rem;
          line-height: 2.5rem;
          color: #242424;
        }
        .tag{
          margin-right: 10px;
          padding: 0;
        }
        .sign{
          margin-right: 3px;
        }
      }
    }

  }
}
</style>
