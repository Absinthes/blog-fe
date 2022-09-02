<template>
  <NuxtLayout>
    <header class="header-box">
      <div class="header">
        <div class="hint-box">
          <h1 class="hint-title">DisCover Nice Articles Here</h1>
          <p class="hint-detail">
            All The Articles And Contents Of The Site Have Been
            <b>Updated Today</b> And You Can Find Your
            <b>Articles And Contents</b> Quickly And Without Any Problems.
          </p>
          <div class="link"></div>
        </div>
        <div class="searchAndMenu">
          <div class="search-box">
            <i class="iconfont icon-sousuo1"></i>
            <input type="text" placeholder="Search..." />
          </div>
          <div class="menu-box" @wheel.prevent="handleWheel" ref="menuBox">
            <div
              class="menu-item"
              v-for="menu in menuList"
              :class="{ active: currentClassify === menu.name }"
              @click="menuClick(menu)"
            >
              {{ menu.name }}
            </div>
          </div>
        </div>
      </div>
    </header>
    <nav class="nav-box">
      <swiper
        class="swiper"
        :modules="modules"
        :speed="600"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
        :pagination="{
          clickable: true,
        }"
        :space-between="20"
        loop
      >
        <swiper-slide v-for="it in swiperList">
          <div class="swiper-item">
            <img class="swiper-bg" :src="it.url" alt="" />
            <article class="swiper-item-content">
              <div class="author-box">
                <img src="/public/微信图片_20220824211856.jpg" alt="" />
                <span>Absinthe.</span>
              </div>
              <h1>Artificial Intelligence Beyond Imaginations</h1>
              <p>
                <span class="detail">
                  Artificial Intelligence Has Been Advancing Beyond What Humans
                  Have Imagined For Decades And Will Dominate Humans In The
                  Coming Years,But The Question Is,Why Will It Happen
                  Like...</span
                >
                <span class="readMore">Read More</span>
              </p>
            </article>
          </div>
        </swiper-slide>
      </swiper>
    </nav>
    <article class="content">
      <ClassifyList :article-list="articleList" />
    </article>
    <nav class="pagination">
      <Pagination v-bind="queryParams" />
    </nav>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { Navigation, Pagination as SwiperPagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getArticleList, getType } from "~~/api";
import { Type } from "~~/types";

const route = useRoute();
const router = useRouter();
const currentClassify = ref(route.params.name);
const modules = [Navigation, SwiperPagination];

const queryParams = reactive({
  pageSize: 10,
  currentPage: 1,
  pageNumber: 0,
  total: 0,
});

const { data: menuList } = await useAsyncData(async () => {
  let { nodes } = await getType();
  nodes.unshift({
    name: "All",
  });
  return nodes;
});
const menuBox = ref();
const swiperList = ref([
  {
    url: "/public/wallhaven-e7jj6r.jpg",
  },
  {
    url: "/public/wallhaven-l35jjp.jpg",
  },
  {
    url: "/public/wallhaven-z8dg9y.png",
  },
]);
const { data: articleList } = await useAsyncData(async () => {
  const { pageSize: limit, currentPage } = queryParams;
  if (currentClassify.value === "All") {
    const { nodes, totalCount } = await getArticleList(
      limit,
      limit * (currentPage - 1)
    );
    queryParams.total = totalCount;
    queryParams.pageNumber = Math.ceil(totalCount / limit)
    return nodes;
  }
  return [];
});

const handleWheel = (event) => {
  menuBox.value.scrollLeft += event.deltaY;
};
const menuClick = (menu: Type) => {
  router.push(`/classify/${menu.name}`);
};
</script>

<style lang="scss" scoped>
.header-box {
  position: relative;
  margin-top: 20px;
  color: var(--font-color);
  border-top: 2px solid var(--border-color);
  border-bottom: 2px solid var(--border-color);
  &::after {
    content: "Articles";
    position: absolute;
    bottom: -1ex;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    padding: 0px 3rem;
    text-align: center;
    color: var(--font-color);
    font-weight: 700;
    font-size: 1.4rem;
    background-color: var(--bg-color);
  }
  .header {
    border: 2px solid var(--border-color);
    padding: 3rem 3rem;
    clip-path: inset(2.3rem 0);
  }
}
.hint-box {
  .hint-title {
    margin-top: 0;
    font-size: 2.2rem;
  }
  .hint-detail {
    width: 55%;
    line-height: 2rem;
    color: var(--font-thin-color);
    b {
      color: #12153d;
    }
  }
}
.searchAndMenu {
  display: flex;
  align-items: center;
  margin-top: 2rem;
  .search-box {
    display: flex;
    flex: 3;
    padding: 13px 15px;
    border-radius: 2rem;
    background-color: #eff0f8;
    .iconfont {
      margin-right: 0.75rem;
      color: var(--font-color);
      font-size: 1.2rem;
      font-weight: 700;
    }
    input {
      width: 100%;
      display: block;
      outline: none;
      border: none;
      background-color: transparent;
    }
  }
  .menu-box {
    flex: 7;
    max-width: 70%;
    margin-left: 2rem;
    white-space: nowrap;
    overflow: hidden;
    .menu-item {
      display: inline-block;
      padding: 13px 1rem;
      margin: 0 10px;
      border-radius: 2rem;
      cursor: pointer;
      transition: color 0.3s, background-color 0.3s;
      &.active {
        color: white;
        background-color: var(--font-color);
      }
    }
  }
}
.nav-box {
  margin-top: 40px;
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 2.5rem;
  .swiper {
    position: relative;
    height: 100%;
    color: var(--font-color);
    &:deep(.swiper-pagination-bullet) {
      border: 1px solid var(--font-color);
      background-color: transparent;
      opacity: 1;
      transition: transform 0.3s;
    }
    &:deep(.swiper-pagination-bullet-active) {
      transform: scale(1.3);
      background-color: var(--font-color);
    }
    .swiper-item {
      cursor: grab;
      .swiper-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0.8;
        object-fit: cover;
      }
      .swiper-item-content {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 70%;
        text-align: center;
        transform: translate(-50%, -50%);
        .author-box {
          display: inline-flex;
          align-items: center;
          padding: 10px 15px;
          margin-top: 4rem;
          background-color: var(--card-bg);
          border-radius: 2rem;
          box-shadow: var(--card-shadow);
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
          }
          span {
            color: var(--font-color);
            font-weight: 600;
            opacity: 0.7;
          }
        }
        h1 {
          cursor: pointer;
        }
        .detail {
          line-height: 2rem;
          font-weight: 700;
          opacity: 0.6;
          cursor: pointer;
        }
        .readMore {
          margin-left: 5px;
          border-bottom: 2px solid var(--font-color);
          font-weight: 700;
          cursor: pointer;
        }
      }
    }
  }
}
.content {
  margin-top: 2rem;
}
.pagination{
  margin-top: 2rem;
}
</style>
