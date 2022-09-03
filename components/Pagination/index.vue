<template>
  <div class="pagination">
    <div class="prev">
      <card
        v-show="curPage > 1"
        class="card"
        hover-border-color="var(--theme)"
        @click="handleClick(curPage - 1)"
      >
        <div>
          <i class="iconfont icon-xiangzuo"></i>
          <span>上页</span>
        </div>
      </card>
    </div>
    <div class="page-numbers">
      <div class="page-number" @click="handleClick(1)" v-show="start > 1">
        <card class="card" hover-border-color="var(--theme)">1</card>
      </div>
      <span class="space" v-show="start > 1">...</span>
      <div
        class="page-number"
        v-for="item in end - start + 1"
        @click="handleClick(start + item - 1)"
        :class="{ active: start + item - 1 == curPage }"
      >
        <card class="card" hover-border-color="var(--theme)">
          {{ start + item - 1 }}
        </card>
      </div>
      <span class="space" v-show="end < maxPage">...</span>
      <div class="page-number" @click="handleClick(maxPage)">
        <card
          class="card"
          hover-border-color="var(--theme)"
          v-show="end < maxPage"
          >{{ maxPage }}</card
        >
      </div>
    </div>
    <div class="next">
      <card
        v-show="curPage < maxPage"
        class="card"
        @click="handleClick(curPage + 1)"
        hover-border-color="var(--theme)"
      >
        <div>
          <span>下页</span>
          <i class="iconfont icon-xiangyou"></i>
        </div>
      </card>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    total?: number;
    pageSize?: number;
    pageNumber?: number;
    currentPage?: number;
  }>(),
  {
    total: 100,
    pageSize: 10,
    pageNumber: 5,
    currentPage: 1,
  }
);
const emit = defineEmits<{
  (e: "pageChange", page: number): void;
}>();
const curPage = ref(props.currentPage);
const maxPage = computed(() => {
  return Math.ceil(props.total / props.pageSize);
});
const half = Math.floor(props.pageNumber / 2);
const start = computed(() => {
  let res ;
  if (curPage.value == maxPage.value) {
    res =  curPage.value - props.pageNumber + 1 ;
  } else {
    res =  curPage.value - half 
  }
  return res > 1 ? res : 1;
});
const end = computed(() => {
  let res = props.pageNumber + start.value - 1;
  return res < maxPage.value ? res : maxPage.value;
});
const handleClick = (index: number) => {
  if (index == curPage.value) return;
  curPage.value = index;
  emit("pageChange", index);
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  .prev,
  .next {
    width: 4rem;
    height: 2rem;
    text-align: center;
    line-height: 2rem;

    .card {
      justify-content: center;
      align-items: center;
      cursor: pointer;
      padding: 0.2rem 0.5rem;
      div {
        transition: transform 0.3s;
        i {
          font-size: 1.2rem;
          vertical-align: middle;
        }
        span {
          transition: opacity 0.3s;
          opacity: 0;
        }
      }
    }
    &:hover {
      .card {
        div {
          transform: translate(0);
          span {
            opacity: 1;
          }
        }
      }
    }
  }

  .prev {
    .card {
      div {
        transform: translate(15px);
      }
    }
  }

  .next {
    .card {
      div {
        transform: translate(-15px);
      }
    }
  }

  .page-numbers {
    display: flex;
    height: 2rem;
    text-align: center;

    .page-number {
      cursor: pointer;
      margin: 0 0.8rem;
      .card {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.2rem 0.5rem;
      }
    }

    .space {
      margin-left: 1rem;
    }
  }

  .active {
    .card {
      background-color: var(--theme);
      color: white;
    }
  }

  .hide {
    opacity: 0;
  }
}
</style>
