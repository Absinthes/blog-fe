<template>
  <NuxtLayout>
    <template v-if="articleData">
      <header class="article-header">
      <div class="site-bg" v-if="articleData?.pic" :style="{backgroundImage: `url(${IMG_ADDRESS + articleData.pic})`}"></div>
      <h1 class="article-title">{{articleData?.title}}</h1>
      <span v-if="articleData.type">
        <i class="iconfont icon-shanchushuqian"></i>
        <NuxtLink>{{articleData.type?.name}}</NuxtLink>
      </span>
      <span class="tags-box">
        <NuxtLink class="tags-item" v-for="tag in articleData.tags" :to="`/tags/${tag.name}`">
          <span class="sign">#</span>
          <span>{{tag.name}}</span>
        </NuxtLink>
      </span>
      <div class="article-meta">
        <div class="meta-left">
          <div class="meta-box">
          <div class="title">创建时间</div>
          <div>
            <i class="iconfont icon-icon"></i>
            <span>{{dayjs(+articleData.createTime).format("YYYY-MM-DD")}}</span>
          </div>
        </div>
        <div class="meta-box">
          <div class="title">热度</div>
          <div>
            <i class="iconfont icon-icon1"></i>
            <span>{{articleData.viewNum}}°</span>
          </div>
        </div>
        <div class="meta-box">
          <div class="title">本文共计</div>
          <div>
            <i class="iconfont icon-wenzhang1"></i>
            <span>{{articleData.contentNum}}字</span>
          </div>
        </div>
        <div class="meta-box">
          <div class="title">预计阅读</div>
          <div>
            <i class="iconfont icon-shijian1"></i>
            <span>{{articleData.contentNum / 700 >>> 0}}分钟</span>
          </div>
        </div>
        </div>
        <div class="meta-right">

        </div>
      </div>
    </header>
    <Card>
      <div class="article-box">
        <div class="content-box">
          <div class="article-content">
            <p class="group-box" v-if="filterGroup.length">
              <div>相关文章: </div>
              <NuxtLink v-for="it in filterGroup" :to="`/article/${it.id}`">{{it?.title}}</NuxtLink>
            </p>
            <div class="markdown-box">
              <div class="markdown-body" v-if="content" v-html="content"></div>
            </div>
          </div>
          <div class="directory-box">
            <Directory :directory="directory" @href-click="hrefClick" class="directory" @get-directory-dom="directoryDom = $event" />
          </div>
        </div>
      </div>
    </Card>
    </template>
  </NuxtLayout>
</template> 

<script lang="ts" setup>
import { getArticleById } from "~~/api";
import { getMarkdownIt, mdDirectory } from "~~/utils/hook/useMarkdown";
import Token from "markdown-it/lib/token";
import "github-markdown-css";
import "highlight.js/styles/atom-one-light.css";
import { Article } from "~~/types";
import dayjs from "dayjs";

definePageMeta({
  keepalive: false,
});

const IMG_ADDRESS = import.meta.env.VITE_BASE_IMG_ADDRESS
const route = useRoute();
const router = useRouter();
const directoryDom = ref<Element>()
const content = ref("");
const md = getMarkdownIt(getDirectory);
const directory = reactive<mdDirectory[]>([]);
const articleData = ref<Article>();
let clientHeight;
let navHeight;
let rootTag: number;

useAsyncData(`article.${route.params.id}`, async () => {
  console.log("request");
  let res = await getArticleById(route.params.id as string);
  return res;
}).then(({ data }) => {
  articleData.value = data.value;
});

watch(articleData, (newVal) => {
  content.value = md.render(newVal.content);
});

onMounted(() => {
  clientHeight = document.documentElement.clientHeight;
  navHeight = parseInt(getComputedStyle(document.body).getPropertyValue('--top-nav-height'))
  window.scrollTo({
    top: 0,
  })
  const hash = location.hash.slice(1)
  
})

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

const filterGroup = computed(() => {
  const articleList: Article[] = []
  if(!articleData.value) return []
  articleData.value.groups.forEach(group => {
    group.articles.forEach(article => {
      if(article.id !== route.params.id as string){
        articleList.push(article)
      }
    })
  })
  return articleList
})

const hrefClick = (e: Event, directory: mdDirectory) => {
  //@ts-ignore
  const top = e.target.offsetTop - clientHeight * 0.7 / 2;
  const {id}  = directory;
  const element = document.getElementById(id);
  router.push({
    hash: '#' + id
  })
  directoryDom.value.scrollTo({
    top,
    behavior: "smooth",
  })
  window.scrollTo({
    top: element.offsetTop + clientHeight * 0.5 + navHeight,
    behavior: "smooth"
  })
  e.preventDefault()
}
</script>

<style lang="scss" scoped>
.article-header{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 50vh;
  padding-bottom: 2rem;
  color: var(--white);
  box-sizing: border-box;
  a{
    background: linear-gradient(var(--color-red) 0 0) no-repeat;
    background-position: 0% 90%;
    background-size: var(--p, 0%) 3%;
    transition: 0.4s;
    &:hover {
      --p: 100%;
      color: var(--color-red);
    }
  }
  .site-bg{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
    animation: bg-animation 30s infinite alternate;
  }
  .article-title{
    color: var(--white);
    letter-spacing: 0.1rem;
    font-size: 2.3rem;
    margin-bottom: 0.8rem;
  }
  .tags-item{
    margin-right: 1rem;
    .sign{
      margin-right: 5px;
    }
  }
  .article-meta{
    display: flex;
    justify-content: space-between;
    margin: 3rem 0 0;
    .meta-left{
      display: flex;
      align-items: center;
      .meta-box{
        padding: 1.2rem;
        margin-right: 1rem;
        border-radius: 1rem;
        backdrop-filter: blur(10px);
        overflow: hidden;
        .title{
          font-size: 0.8rem;
          margin-bottom: 5px;
        }
        .iconfont{
          margin-right: 5px;
        }
      }
    }
    .meta-right{
      display: flex;
    }
  }
}
.article-box {
  padding: 3rem 1.5rem;
}
.content-box {
  position: relative;
  display: flex;
  justify-content: center;
  .article-content{
    width: 75%;
    display: inline-block;
    
  }
  .markdown-body{
    font: inherit;
    .copyCode{
      position: absolute;
      right: 0;
    }
  }
}
.directory-box {
  .directory {
    position: sticky;
    top: calc(var(--top-nav-height, 60px) + 1rem);
    width: 12rem;
    margin-left: 2rem;
  }
}

@keyframes bg-animation{
  from{
    transform: scale(1);
  }
  to{
    transform: scale(1.2);
  }
}
</style>

<style lang="scss">
  .markdown-body{
    .highlight pre, pre {
      position: relative;
    }
    .copyCode{
      position: absolute;
      right: 1rem;
      top: 1rem;
      color: #a0a1a7;
      transition: color 0.3s;
      cursor: pointer;
      &:hover{
        color: inherit;
      }
    }
  }
</style>