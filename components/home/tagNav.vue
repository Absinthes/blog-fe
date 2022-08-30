<template>
  <div class="tag-nav">
    <card class="tag-nav-wrapper">
      <div class="top">
        <div class="tag" v-for="tag in tags">
          {{tag.name}}
          <span>5</span>
        </div>
      </div>
      <hr>
      <div class="center">
        <div class="year-statistics">
          <div class="year">2022</div>
          <div class="number">76<span>篇</span></div>
        </div>
        <div class="year-statistics">
          <div class="year">2022</div>
          <div class="number">76<span>篇</span></div>
        </div>
        <div class="year-statistics">
          <div class="year">2022</div>
          <div class="number">76<span>篇</span></div>
        </div>
        <div class="year-statistics">
          <div class="year">2022</div>
          <div class="number">76<span>篇</span></div>
        </div>
      </div>
      <div class="bottom">
        
      </div>
      <hr>
    </card>
  </div>

</template>

<script setup lang="ts">
import { Tag } from '~~/types';
  const tags = ref<Tag[]>([
    {
      id:"1",
      name:"产品",
    },
    {
      id:"1",
      name:"狐狸"
    },
    {
      id:"1",
      name:"原神"
    },
    {
      id:"1",
      name:"是个的"
    },
    {
      id:"1",
      name:"是个的"
    },
    {
      id:"1",
      name:"是个的"
    },
  ])
</script>

<style lang="scss" scoped>
  .tag-nav{
    position: sticky;
    top: 70px;
    // width: 20%;
    .tag-nav-wrapper{
      padding: 1rem;
      .top{
        display: flex;
        flex-wrap: wrap;
        .tag{
          position: relative;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 5px;
          transition: transform .3s;
          span{
            position: relative;
            top: -0.5rem;
            // right: 0;
            // top: 0;
            font-size: 60%;
            color: rgba(54,54,54,.4);
          }
          &:hover{
            background: var(--theme);
            color: white;
            transform: scale(1.03);
            span{
              color: rgba($color: #FFF, $alpha: .4);
            }
          }
        }
      }
      hr{
        margin: 1rem 0.5rem;
        border: 1px dashed #4259ef23 ;
      }
      .center{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .year-statistics{
          cursor: pointer;
          border:1px solid var(--border-color);
          border-radius: 5px;
          padding: 0.5rem;
          width: 45%;
          margin-bottom: 0.5rem;
          box-sizing: border-box;
          transition: transform .3s;
          .year{
            color: rgba(54,54,54,.4);
            margin-bottom: 0.5rem;
          }
          .number{
            font-size: 1.5rem;
            font-weight: 700;
            span{
              font-size: 1rem;
            }
          }
          &:hover{
            background-color: var(--theme);
            transform: scale(1.03);
            color: #FFF;
            .year{
              color: rgba($color: #fff, $alpha: .4);
            }
          }
        }
      }
    }
  }
</style>