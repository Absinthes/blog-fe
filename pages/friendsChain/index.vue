<template>
  <NuxtLayout>
    <div class="container">
      <div class="flink">
        <Flink :data="allFriendsChian"/>
      </div>
      <div v-for="item in data">
        <h2>{{item.name}}</h2>
        <p>这年头，谁还没个生活呢，综合排序</p>
        <FriendLink :data="item.friendsChains" />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { FriendsChain, FriendsChianType } from "~~/types";
import FriendIitem from "~~/components/friendsChain/FriendIitem.vue";
import FriendLink from "~~/components/friendsChain/FriendLink.vue";
import Flink from "../../components/friendsChain/Flink.vue";
import { getFirendsTypeList } from "~~/api";

const data = ref<FriendsChianType[]>([])

const allFriendsChian = computed(() => {
  const res = data.value.flatMap((item) => {
    return item.friendsChains
  })
  return res
})

watchEffect(() => {
  console.log(allFriendsChian)
})

useAsyncData(`flink`,async () => {
  let res = await getFirendsTypeList();
  return res;
}).then(({data:d}) => {
  data.value = d.value
})
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
