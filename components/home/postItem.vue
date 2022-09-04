<template>
  <card hover-border-color="var(--theme)">
    <div class="post">
      <div class="left">
        <img :src="article.pic" alt="" />
      </div>
      <div class="right">
        <div class="title">
          <h3>{{article.title}}</h3>
        </div>
        <div class="meta">
          <div class="tags" ref="tagsRef" @wheel.prevent="handleWheel">
            <div class="tag" v-for="tag in article.tags"><span>#</span>{{tag.name}}</div>
          </div>
          <div class="time">
            {{dayjs(+article.createTime).format("YYYY/MM/DD")}}
          </div>
        </div>
      </div>
    </div>
  </card>
</template>

<script setup lang="ts">
import { Article } from '~~/types';
import dayjs  from "dayjs"

const {article} = withDefaults(
  defineProps<{
    article:Article
  }>(),
  {
    src: "/public/崩坏星穹铁道 黑塔 - QuAn_的插画small.jpg",
  }
);
const tagsRef = ref();
const handleWheel = (event) => {
  tagsRef.value.scrollLeft += event.deltaY;
};
</script>

<style scoped lang="scss">
.post {
  display: flex;
  height: 100%;
  width: 100%;
  &:hover {
    .left {
      img {
        transform: scale(1.1);
      }
    }
  }
  .left {
    height: 100%;
    width: 45%;
    overflow: hidden;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }
  }
  .right {
    width: 55%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding:0 5%;
    .title{
      cursor: pointer;
    }
    .meta {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      .tags {
        display: flex;
        max-width: 80%;
        overflow: hidden;
        white-space: nowrap;
        .tag {
          cursor: pointer;
          margin-right: 0.5rem;
          &:hover {
            color: var(--theme);
          }
          span {
            opacity: 0.4;
          }
        }
      }
      .time{
        opacity: .4;
        cursor:default;
      }
    }
  }
}
</style>
