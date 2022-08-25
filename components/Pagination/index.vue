<template>
  <div class="pagination">
    <div class="prev">
      <card class="card" hover-border-color="var(--theme)">
        <div>
          <i class="iconfont icon-xiangzuo"></i>
          <span>上页</span>
        </div>
      </card>
    </div>
    <div class="page-numbers">
      <div class="page-number active">
        <card class="card" hover-border-color="var(--theme)"> 1 </card>
      </div>
      <div class="page-number">
        <card class="card" hover-border-color="var(--theme)"> 2 </card>
      </div>
      <div class="page-number">
        <card class="card" hover-border-color="var(--theme)"> 3 </card>
      </div>
      <div class="page-number">
        <card class="card" hover-border-color="var(--theme)"> 4 </card>
      </div>
      <span class="space">...</span>
      <div class="page-number">
        <card class="card" hover-border-color="var(--theme)"> 30</card>
      </div>
    </div>
    <div class="next">
      <card class="card" hover-border-color="var(--theme)">
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
    total: number;
    pageSize: number;
    pageNumber:number
  }>(),
  {
    total:100,
    pageSize:10,
    pageNumber:5
  }
);
const currentPage = ref(1)
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  .prev,
  .next {
    cursor: pointer;
    width: 4rem;
    height: 2rem;
    text-align: center;
    line-height: 2rem;

    .card {
      justify-content: center;
      align-items: center;
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
    line-height: 2rem;
    text-align: center;

    .page-number {
      cursor: pointer;
      margin: 0 0.8rem;
      .card {
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
}
</style>
