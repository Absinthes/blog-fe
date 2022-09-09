<template>
  <NuxtLayout name="list-layout">
    <template #aside>
      <TagNav />
    </template>
    <template #default v-if="group">
      <nav class="nav-box">
        <div
          class="nav-bg"
          :style="{ backgroundImage: `url(${IMG_ADDRESS + group.pic})` }"
        ></div>
        <!-- <img :src="IMG_ADDRESS + group.pic" alt="" /> -->
        <div class="nav-content">
          <h1>{{ group.name }}</h1>
          <div class="nav-describe">{{ group.describe }}</div>
          <div class="meta-box">
            <div class="meta-item">
              <div class="title">创建时间</div>
              <div>
                <i class="iconfont icon-icon"></i>
                <span>{{ dayjs(+group.createTime).format("YYYY-MM-DD") }}</span>
              </div>
            </div>
            <div class="meta-item">
              <div class="title">热度</div>
              <div>
                <i class="iconfont icon-icon1"></i>
                <span>{{ 0 }}°</span>
              </div>
            </div>
            <div class="meta-item">
              <div class="title">总计</div>
              <div>
                <i class="iconfont icon-icon1"></i>
                <span>{{ group.articles.length }}篇</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <article class="content-box">
        <div class="post-items">
          <div class="post-item" v-for="article in group.articles">
            <PostItem
              :article="article"
              @article-click="router.push(`/article/${$event.id}`)"
              @tag-click="router.push(`/tags/${$event.name}`)"
            />
          </div>
        </div>
      </article>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { getGroupById } from "~~/api";
import TagNav from "~~/components/home/tagNav.vue";
import { Group } from "~~/types";
import PostItem from "~~/components/home/postItem.vue";

const route = useRoute();
const router = useRouter();
const group = ref<Group>();
const id = route.params.id;
const IMG_ADDRESS = import.meta.env.VITE_BASE_IMG_ADDRESS;

useAsyncData(`Group.${id}`, () => getGroupById(Number(id))).then(({ data }) => {
  group.value = data.value;
});
</script>

<style lang="scss" scoped>
.nav-box {
  position: relative;
  height: 450px;
  border-radius: 1rem;
  overflow: hidden;
  .nav-bg {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center 25%;
    object-fit: cover;
    filter: brightness(0.8);
    animation: img-anmition 40s infinite alternate;
  }
  .nav-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 2rem;
    color: white;
  }
  .meta-box {
    display: flex;
    margin-top: 3rem;
    .meta-item {
      padding: 1.2rem;
      margin-right: 1rem;
      border-radius: 1rem;
      backdrop-filter: blur(10px);
      overflow: hidden;
      font-size: 0.9rem;
      .title {
        font-size: 0.8rem;
        margin-bottom: 5px;
      }
      .iconfont {
        margin-right: 5px;
      }
    }
  }
}

.content-box {
  margin-top: 1rem;
  .post-items {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 0.5rem;
    grid-column-gap: 1rem;
  }
  .post-item {
    height: 12rem;
    margin-bottom: 1rem;
  }
}

@keyframes img-anmition {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.2);
  }
}
</style>
