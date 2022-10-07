<template>
  <NuxtLayout name="list-layout">
    <div class="groupList-box">
      <EnterGroup :i="i" v-for="(it, i) in groupList" :key="it.id">
      <GroupItem
        class="specialColumn"
        :style="{
          animation: `opacity-transition 1.5s ${i * duration}s forwards,
    translateY-transition 1.5s ${i * duration}s forwards`,
        }"
        v-for="(it, i) in groupList"
        :group="it"
        :len="5"
        ref="groupListRefs"
        @img-onload="handlerImgLoad"
      />
      </EnterGroup>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { getGroupList } from "~~/api";
import EnterGroup from "~~/components/PostItems/enterGroup.vue";
import { Group } from "~~/types";

definePageMeta({
  keepalive: true,
});

const duration = 0.2
const title = useNavTitle();
title.value = "专栏";
const groupList = ref<Group[]>();
const queryParams = reactive({
  pageSize: 10,
  currentPage: 1,
  pageNumber: 0,
  total: 0,
});
const groupListRefs = ref([]);

useAsyncData(() => {
  const { pageSize: limit, currentPage } = queryParams;
  return getGroupList(limit, limit * (currentPage - 1));
}).then(({ data }) => {
  groupList.value = data.value.nodes;
  queryParams.total = data.value.totalCount;
});

let oneFlag = ref(false);
const baseRow = 8;

const computedSpan = () => {
  try {
    const doms = document.querySelectorAll(".specialColumn");
    for (let i = 0; i < doms.length; i++) {
      const dom = doms[i];
      let articleLen = groupList.value[i].articles.length;
      dom.style.gridRowEnd = `span ${baseRow + 2 * articleLen}`;
    }
  } catch (error) {}
};

const handlerImgLoad = async () => {
  if (oneFlag.value) return;
  await nextTick();
  computedSpan();
  oneFlag.value = true;
};

onActivated(() => {
  computedSpan();
});
</script>

<style lang="scss" scoped>
.groupList-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 1rem;
  row-gap: 1rem;
  .specialColumn {
    grid-row-start: auto;
    opacity: 0;
  }
}
</style>
