<template>
  <NuxtLayout>
    <div class="container">
      <div class="flink">
        <Flink :data="lifeData"/>
      </div>
      <div class="life">
        <h2>生活(45)</h2>
        <p>这年头，谁还没个生活呢，综合排序</p>
        <FriendLink :data="lifeData" />
      </div>
      <div class="technology">
        <h2>技术(45)</h2>
        <p>技术知识为主的博客，综合排序</p>
        <FriendLink :data="lifeData" />
      </div>
      <div class="loseContract">
        <h2>失联(45)</h2>
        <p>近期无法访问</p>
        <FriendLink :data="lifeData" />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { FriendsChain } from "~~/types";
import FriendIitem from "~~/components/friendsChain/FriendIitem.vue";
import FriendLink from "~~/components/friendsChain/FriendLink.vue";
import Flink from "../../components/friendsChain/Flink.vue";

const lifeData = ref<FriendsChain[]>([
  {
    id: "1",
    name: "测试",
    link: "sdgdsgdsg",
    imgSrc: "/public/崩坏星穹铁道 黑塔 - QuAn_的插画small.jpg",
    introduction: "崩坏星穹铁道 黑塔",
  },
  {
    id: "2",
    name: "测试",
    link: "sdgdsgdsg",
    imgSrc: "/public/崩坏星穹铁道 黑塔 - QuAn_的插画small.jpg",
    introduction: "崩坏星穹铁道 黑塔",
  },
  {
    id: "3",
    name: "测试",
    link: "sdgdsgdsg",
    imgSrc: "/public/崩坏星穹铁道 黑塔 - QuAn_的插画small.jpg",
    introduction: "崩坏星穹铁道 黑塔",
  },
  {
    id: "4",
    name: "测试",
    link: "sdgdsgdsg",
    imgSrc: "/public/崩坏星穹铁道 黑塔 - QuAn_的插画small.jpg",
    introduction: "崩坏星穹铁道 黑塔",
  },
  {
    id: "5",
    name: "测试",
    link: "sdgdsgdsg",
    imgSrc: "/public/崩坏星穹铁道 黑塔 - QuAn_的插画small.jpg",
    introduction: "崩坏星穹铁道 黑塔",
  },
  {
    id: "6",
    name: "测试",
    link: "sdgdsgdsg",
    imgSrc: "/public/崩坏星穹铁道 黑塔 - QuAn_的插画small.jpg",
    introduction: "崩坏星穹铁道 黑塔",
  },
  {
    id: "7",
    name: "测试",
    link: "sdgdsgdsg",
    imgSrc: "/public/崩坏星穹铁道 黑塔 - QuAn_的插画small.jpg",
    introduction: "崩坏星穹铁道 黑塔",
  },
  {
    id: "8",
    name: "测试",
    link: "sdgdsgdsg",
    imgSrc: "/public/崩坏星穹铁道 黑塔 - QuAn_的插画small.jpg",
    introduction: "崩坏星穹铁道 黑塔",
  },
  {
    id: "9",
    name: "测试",
    link: "sdgdsgdsg",
    imgSrc: "/public/崩坏星穹铁道 黑塔 - QuAn_的插画small.jpg",
    introduction: "崩坏星穹铁道 黑塔",
  },
  {
    id: "10",
    name: "测试",
    link: "sdgdsgdsg",
    imgSrc: "/public/崩坏星穹铁道 黑塔 - QuAn_的插画small.jpg",
    introduction: "崩坏星穹铁道 黑塔",
  },
  {
    id: "11",
    name: "测试",
    link: "sdgdsgdsg",
    imgSrc: "/public/崩坏星穹铁道 黑塔 - QuAn_的插画small.jpg",
    introduction: "崩坏星穹铁道 黑塔",
  },
  {
    id: "12",
    name: "测试",
    link: "sdgdsgdsg",
    imgSrc: "/public/崩坏星穹铁道 黑塔 - QuAn_的插画small.jpg",
    introduction: "崩坏星穹铁道 黑塔",
  },
  {
    id: "13",
    name: "测试",
    link: "sdgdsgdsg",
    imgSrc: "/public/崩坏星穹铁道 黑塔 - QuAn_的插画small.jpg",
    introduction: "崩坏星穹铁道 黑塔",
  },
  {
    id: "14",
    name: "测试",
    link: "sdgdsgdsg",
    imgSrc: "/public/崩坏星穹铁道 黑塔 - QuAn_的插画small.jpg",
    introduction: "崩坏星穹铁道 黑塔",
  },
  {
    id: "15",
    name: "测试",
    link: "sdgdsgdsg",
    imgSrc: "/public/崩坏星穹铁道 黑塔 - QuAn_的插画small.jpg",
    introduction: "崩坏星穹铁道 黑塔",
  },
  {
    id: "16",
    name: "测试",
    link: "sdgdsgdsg",
    imgSrc: "/public/崩坏星穹铁道 黑塔 - QuAn_的插画small.jpg",
    introduction: "崩坏星穹铁道 黑塔",
  },
  {
    id: "17",
    name: "测试",
    link: "sdgdsgdsg",
    imgSrc: "/public/崩坏星穹铁道 黑塔 - QuAn_的插画small.jpg",
    introduction: "崩坏星穹铁道 黑塔",
  },
  {
    id: "18",
    name: "测试",
    link: "sdgdsgdsg",
    imgSrc: "/public/崩坏星穹铁道 黑塔 - QuAn_的插画small.jpg",
    introduction: "崩坏星穹铁道 黑塔",
  },
  {
    id: "19",
    name: "测试",
    link: "sdgdsgdsg",
    imgSrc: "/public/崩坏星穹铁道 黑塔 - QuAn_的插画small.jpg",
    introduction: "崩坏星穹铁道 黑塔",
  },
  {
    id: "20",
    name: "测试",
    link: "sdgdsgdsg",
    imgSrc: "/public/崩坏星穹铁道 黑塔 - QuAn_的插画small.jpg",
    introduction: "崩坏星穹铁道 黑塔",
  },
]);
</script>

<style scoped lang="scss">
.container{
  .flink{
    // height: 450px;
  }
  .life,.technology,.loseContract{
    h2{
      font-weight: 600;
    }
    p{
      margin-bottom: 2rem;
    }
  }
}
</style>
