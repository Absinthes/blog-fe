<template>
  <div id="content-bar">
    <div class="content-bar-items" @wheel.prevent="handleWheel" ref="itemsRef">
      <div
        class="content-bar-item"
        v-for="item in items"
        @click="handleClick(item.to)"
      >
        <span>
          {{ item.name }}
        </span>
      </div>
    </div>
    <div class="content-bar-more" @click="emit('onMoreClick')">更多</div>
  </div>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from "vue-router";

const router = useRouter();
const handleClick = (to: RouteLocationRaw) => {
  router.push(to);
};
const itemsRef = ref();
const handleWheel = (event) => {
  itemsRef.value.scrollLeft += event.deltaY;
};
const props = withDefaults(
  defineProps<{
    items: {
      name: string;
      to?: RouteLocationRaw;
    }[];
  }>(),
  {
    items: [],
  }
);

const emit = defineEmits<{
  (e:"onMoreClick"):void
}>()

onMounted(() => {});
</script>

<style scoped lang="scss">
#content-bar {
  display: flex;
  white-space: nowrap;
  width: 100%;
  text-align: center;
  padding: 8px 20px 8px 10px;
  .content-bar-items {
    display: flex;
    flex: 1;
    overflow: hidden;

    .content-bar-item {
      span {
        display: inline-block;
        transition: background-color .3s,color .3s;
      }
      &:hover span {
        background-color: var(--theme);
        color: white;
      }
    }
  }

  .content-bar-more {
    &:hover {
      color: var(--theme);
    }
  }

  .content-bar-items .content-bar-item span,
  .content-bar-more {
    padding: 5px 10px;
    margin: 0 4px;
    cursor: pointer;
    border-radius: 5px;
    font-weight: 700;
  }
}
</style>
