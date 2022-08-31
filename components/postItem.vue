<template>
  <card hover-border-color="var(--theme)">
    <div class="post">
      <div class="left">
        <img :src="src" alt="" />
      </div>
      <div class="right">
        <div class="title">
          <h3>预测一波苹果2022秋季发布会</h3>
        </div>
        <div class="meta">
          <div class="tags" ref="tags" @wheel.prevent="handleWheel">
            <div class="tag"><span>#</span>iOS</div>
            <div class="tag"><span>#</span>闲聊</div>
            <div class="tag"><span>#</span>iOS</div>
            <div class="tag"><span>#</span>闲聊</div>
            <div class="tag"><span>#</span>iOS</div>
            <div class="tag"><span>#</span>闲聊</div>
            <div class="tag"><span>#</span>iOS</div>
            <div class="tag"><span>#</span>闲聊</div>
            <div class="tag"><span>#</span>iOS</div>
            <div class="tag"><span>#</span>闲聊</div>
            <div class="tag"><span>#</span>iOS</div>
            <div class="tag"><span>#</span>闲聊</div>
          </div>
          <div class="time">
            8/16
          </div>
        </div>
      </div>
    </div>
  </card>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src?: string;
  }>(),
  {
    src: "/public/微信图片_20220824211856.jpg",
  }
);
const tags = ref();
const handleWheel = (event) => {
  tags.value.scrollLeft += event.deltaY;
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
