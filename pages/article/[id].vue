<template>
  <NuxtLayout>
    <template v-if="articleData">
      <header class="article-header">
        <div
          class="site-bg"
          v-if="articleData?.pic"
          :style="{ backgroundImage: `url(${IMG_ADDRESS + articleData.pic})` }"
        ></div>
        <h1 class="article-title">{{ articleData?.title }}</h1>
        <span v-if="articleData.type">
          <i class="iconfont icon-shanchushuqian"></i>
          <NuxtLink>{{ articleData.type?.name }}</NuxtLink>
        </span>
        <span class="tags-box">
          <NuxtLink
            class="tags-item"
            v-for="tag in articleData.tags"
            :to="`/tags/${tag.name}`"
          >
            <span class="sign">#</span>
            <span>{{ tag.name }}</span>
          </NuxtLink>
        </span>
        <div class="article-meta">
          <div class="meta-left">
            <div class="meta-box">
              <div class="title">创建时间</div>
              <div>
                <i class="iconfont icon-icon"></i>
                <span>{{
                  dayjs(+articleData.createTime).format("YYYY-MM-DD")
                }}</span>
              </div>
            </div>
            <div class="meta-box">
              <div class="title">热度</div>
              <div>
                <i class="iconfont icon-icon1"></i>
                <span>{{ articleData.viewNum }}°</span>
              </div>
            </div>
            <div class="meta-box">
              <div class="title">本文共计</div>
              <div>
                <i class="iconfont icon-wenzhang1"></i>
                <span>{{ articleData.contentNum }}字</span>
              </div>
            </div>
            <div class="meta-box">
              <div class="title">预计阅读</div>
              <div>
                <i class="iconfont icon-shijian1"></i>
                <span>{{ (articleData.contentNum / 700) >>> 0 }}分钟</span>
              </div>
            </div>
          </div>
          <div class="meta-right"></div>
        </div>
      </header>
      <Card class="card">
        <div class="article-box">
          <div class="content-box">
            <div class="article-content">
              <!-- <p class="group-box" v-if="filterGroup.length">
              <div>相关文章: </div>
              <NuxtLink v-for="it in filterGroup" :to="`/article/${it.id}`">{{it?.title}}</NuxtLink>
            </p> -->
              <div class="markdown-box">
                <div
                  class="markdown-body"
                  v-if="content"
                  v-html="content"
                  @click.stop="copyCode"
                ></div>
              </div>
            </div>
            <div class="directory-box">
              <div class="sticky">
                <Directory
                  :directory="directory"
                  @href-click="hrefClick"
                  class="directory"
                  @get-directory-dom="directoryDom = $event"
                />
                <div class="group-box">
                  <div class="group-item pointer" v-if="prevArticle">
                    <NuxtLink :to="`/article/${prevArticle.id}`">
                      <span>上一篇 / </span>
                      <span>{{ prevArticle.title }}</span>
                    </NuxtLink>
                  </div>
                  <div class="group-item pointer" v-if="nextArticle">
                    <NuxtLink :to="`/article/${nextArticle.id}`">
                      <span>下一篇 / </span>
                      <span>{{ nextArticle.title }}</span>
                    </NuxtLink>
                  </div>
                  <div class="group-item" v-if="!nextArticle">
                    本篇已是该专栏最新文章
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="comment-wrapper">
            <div class="hr">
              <i class="iconfont icon-pinglun" />
              <span>评论</span>
            </div>

            <div class="edit">
              <Edit :cancel="false" :hide="false" @confirm="handleComment" />
            </div>
            <div class="statistics">{{ PaginationProps.total || 0 }}条评论</div>
            <CommentCmp
              @confirm="handleConfirm"
              @handle-dian-zan="handleDianZan"
              :data="commentData"
            />
            <div
              class="loadMore"
              :class="{
                'hide':
                  PaginationProps.pageSize * PaginationProps.currentPage >=
                  PaginationProps.total,
              }"
              @click="handlePageChange"
            >
              More
            </div>
          </div>
        </div>
      </Card>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { Article, Comment, EditForm, Pagination } from "@/types";
import CommentCmp from "@/components/Comment/index.vue";
import { CommentTypeEnum } from "@/types";
import { addComment, getArticleById, getCommentByArticleId } from "~~/api";
import { getMarkdownIt, mdDirectory } from "~~/utils/hook/useMarkdown";
import Token from "markdown-it/lib/token";
import "github-markdown-css";
import "highlight.js/styles/atom-one-light.css";
import dayjs from "dayjs";
import Edit from "~~/components/Comment/edit.vue";
import { RefreshOptions } from "nuxt/dist/app/composables/asyncData";

definePageMeta({
  keepalive: false,
});
const IMG_ADDRESS = import.meta.env.VITE_BASE_IMG_ADDRESS;
const route = useRoute();
const router = useRouter();
const directoryDom = ref<Element>();
const content = ref("");
const md = getMarkdownIt(getDirectory);
const directory = reactive<mdDirectory[]>([]);
const articleData = ref<Article>();
const prevArticle = ref<Article>();
const nextArticle = ref<Article>();
const isNextGroup = ref(false);
const commentData = ref<Comment[]>([]);
let commentRefresh: (opts?: RefreshOptions) => Promise<void>;
const PaginationProps = reactive({
  total: 0,
  pageSize: 1,
  currentPage: 1,
});

let clientHeight: number;
let navHeight: number;
let rootTag: number;

useAsyncData(`article.${route.params.id}`, async () => {
  console.log("request");
  let article = await getArticleById(route.params.id as string);
  return article;
}).then(async ({ data }) => {
  articleData.value = data.value;
});

useAsyncData(`article.${route.params.id}.comment`, async () => {
  const { currentPage: page, pageSize: limit } = PaginationProps;
  let res = await getCommentByArticleId(route.params.id as string, page, limit);
  commentData.value.push(...res.nodes);
  PaginationProps.total = res.totalCount;
  res.nodes = commentData.value;
  return res;
}).then(({ data, refresh }) => {
  commentRefresh = refresh;
  commentData.value = data.value.nodes;
  PaginationProps.currentPage = Math.floor(
    data.value.nodes.length / PaginationProps.pageSize
  );
  PaginationProps.total = data.value.totalCount;
});

const handlePageChange = () => {
  PaginationProps.currentPage = PaginationProps.currentPage + 1;
  commentRefresh && commentRefresh();
};

const handleConfirm = async (
  form: EditForm,
  reset: () => void,
  rootComment: Comment,
  parentComment: Comment
) => {
  try {
    const res = await addComment(
      CommentTypeEnum.article,
      form,
      route.params.id as string,
      rootComment.id,
      parentComment.id
    );
    reset();
  } finally {
    commentRefresh && commentRefresh();
  }
};

const handleDianZan = (b: boolean, data: Comment) => {
  console.log(b, data);
};

const handleComment = async (form: EditForm, reset: () => void) => {
  //文章的评论
  try {
    const res = await addComment(
      CommentTypeEnum.article,
      form,
      route.params.id as string
    );
    reset();
  } finally {
    commentRefresh && commentRefresh();
  }
};

watch(articleData, (newVal) => {
  content.value = md.render(newVal.content);
  const articleCreate = articleData.value?.createTime;
  const groups = articleData.value?.groups;
  if (groups.length == 0) return;
  prevArticle.value = groups[0].articles
    .filter((it) => it.createTime < articleCreate)
    .pop();
  nextArticle.value = groups[0].articles
    .filter((it) => it.createTime > articleCreate)
    .shift();
});

onMounted(() => {
  clientHeight = document.documentElement.clientHeight;
  navHeight = parseInt(
    getComputedStyle(document.body).getPropertyValue("--top-nav-height")
  );
  window.scrollTo({
    top: 0,
  });
});

function getDirectory(token: Token, { title }: { title: string }) {
  const id = token.attrs![0][1];
  const tag = token.tag as string;
  if (/h[1-6]/.test(tag)) {
    let n = Number(tag.charAt(1));
    if (!rootTag) rootTag = n - 1;
    if (Number.isNaN(n)) return;
    let target: mdDirectory[] = directory;
    for (let i = rootTag; i < n - 1; i++) {
      target = target[target.length - 1].children;
    }
    target.push({
      id,
      tag,
      title,
      children: [],
    });
  }
}

const copyCode = (e: Event) => {
  navigator.clipboard
    .writeText(e.target.dataset.copy)
    .then(console.log)
    .catch(console.log);
};

const hrefClick = (e: Event, directory: mdDirectory) => {
  //@ts-ignore
  const top = e.target.offsetTop - (clientHeight * 0.7) / 2;
  const { id } = directory;
  const element = document.getElementById(id);
  router.push({
    hash: "#" + id,
  });
  directoryDom.value.scrollTo({
    top,
    behavior: "smooth",
  });
  window.scrollTo({
    top: element.offsetTop + clientHeight * 0.5 + navHeight,
    behavior: "smooth",
  });
  e.preventDefault();
};
</script>

<style lang="scss" scoped>
.article-header {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 50vh;
  padding-bottom: 2rem;
  color: var(--white);
  box-sizing: border-box;
  a {
    background: linear-gradient(var(--color-red) 0 0) no-repeat;
    background-position: 0% 90%;
    background-size: var(--p, 0%) 3%;
    transition: 0.4s;
    &:hover {
      --p: 100%;
      color: var(--color-red);
    }
  }
  .site-bg {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    transition: background 1.5s;
    z-index: -1;
    animation: bg-transition 1.5s backwards, bg-animation 30s 1.5s infinite alternate;
  }
  .article-title {
    animation: opacity-transition 1.5s 0.5s backwards;
    transition: opacity 1.5s;
    color: var(--white);
    letter-spacing: 0.1rem;
    font-size: 2.3rem;
    margin-bottom: 0.8rem;
    text-shadow: 0 1px 10px rgb(0 0 0 / 30%);
    font-family: "阿里妈妈数黑体";
  }
  .tags-box {
    animation: opacity-transition 1.5s 1s backwards;
    transition: opacity 1.5s;
    text-shadow: 0 1px 10px rgb(0 0 0 / 30%);
    .tags-item {
      margin-right: 1rem;
      .sign {
        margin-right: 5px;
      }
    }
  }

  .article-meta {
    display: flex;
    justify-content: space-between;
    margin: 3rem 0 0;
    color: rgb(255 255 255 / 90%);
    .meta-left {
      display: flex;
      align-items: center;
      .meta-box {
        padding: 1.2rem;
        margin-right: 1rem;
        border-radius: 1rem;
        backdrop-filter: blur(10px);
        overflow: hidden;
        transition: opacity 1.5s,transform 1s;
        text-shadow: 0 1px 10px rgb(0 0 0 / 30%);
        box-shadow: var(--card-shadow);
        &:nth-of-type(1){
          animation: opacity-transition 1.5s 0.4s backwards,translate-bottom 1s 0.4s backwards;
        }
        &:nth-of-type(2){
          animation: opacity-transition 1.5s 0.8s backwards,translate-bottom 1s 0.8s backwards;
        }
        &:nth-of-type(3){
          animation: opacity-transition 1.5s 1.2s backwards,translate-bottom 1s 1.2s backwards;
        }
        &:nth-of-type(4){
          animation: opacity-transition 1.5s 1.6s backwards,translate-bottom 1s 1.6s backwards;
        }
        .title {
          font-size: 0.8rem;
          margin-bottom: 5px;
        }
        .iconfont {
          margin-right: 5px;
        }
      }
    }
    .meta-right {
      display: flex;
    }
  }
}
.card {
  animation: opacity-transition 2s 0.5s backwards,translate-bottom 2s 0.5s backwards;
  transition: opacity 2s,transform 2s;
  .article-box {
    animation: opacity-transition 1s 1.5s backwards;
    transition: opacity 1s;
    padding: 3rem 1.5rem;
    .comment-wrapper {
      margin-top: 2rem;
      padding: 0 0.8rem 0 2.2rem;
      .hr {
        display: flex;
        text-align: center;
        margin: 1rem 0;
        i {
          font-size: 1.5rem;
          margin-right: 0.5rem;
        }
        span {
          font-size: 1.2rem;
          font-weight: 500;
        }
      }
      .statistics {
        font-size: 1.3rem;
        font-weight: 700;
      }
    }
  }
}

.content-box {
  position: relative;
  display: flex;
  justify-content: center;
  .article-content {
    width: 75%;
    display: inline-block;
  }
  .markdown-body {
    font: inherit;
    .copyCode {
      position: absolute;
      right: 0;
    }
  }
}
.directory-box {
  .sticky {
    position: sticky;
    top: calc(var(--top-nav-height, 60px) + 1rem);
    margin-left: 2rem;
  }
  .directory {
    width: 12rem;
  }
  .group-box {
    margin-top: 1rem;
    .group-item {
      width: 100%;
      padding: 1.2rem 1rem;
      margin-bottom: 1rem;
      border-radius: 1rem;
      background-color: var(--secondbg);
      // box-shadow: var(--card-shadow);
      transition: color 0.3s, background-color 0.3s;
      &:hover {
        color: var(--white);
        background-color: rgb(var(--color-orange) / 80%);
      }
    }
  }
}

.loadMore {
  padding: 1rem 0;
  text-align: center;
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow);
  border-radius: 10px;
  background: linear-gradient(var(--theme) 0 0) no-repeat;
  background-size: var(--p, 0%);
  background-position: calc(100% - var(--p, 0%));
  transition: 0.4s, background-position 0s;
  cursor: pointer;
  &:hover {
    --p: 100%;
    color: var(--white);
    border-color: var(--theme);
  }
  &.hide{
    opacity: 0;
    cursor: initial;
    pointer-events: none;
  }
}

@keyframes bg-animation {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.2);
  }
}

@keyframes bg-transition {
  0% {
    background-position-y: 0%;
  }
}



@keyframes translate-bottom{
  0%{
    transform: translateY(30px);
  }
  100%{
    transform: translateY(0px);
  }
}
</style>

<style lang="scss">
@import "~~/assets/markdown.scss";
.markdown-body {
  &::before {
    content: none;
  }
  &::after {
    content: none;
  }
  .highlight pre,
  pre {
    position: relative;
  }
  .copyCode {
    position: absolute;
    right: 1rem;
    top: 1rem;
    color: #a0a1a7;
    transition: color 0.3s;
    cursor: pointer;
    &:hover {
      color: inherit;
    }
  }
}
</style>
