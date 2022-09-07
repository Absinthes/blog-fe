<template>
  <div class="friendItem" v-if="data">
    <card class="card">
      <div class="wrapper">
        <div class="top">
          <img :src="IMG_ADDRESS + data.imgSrc" alt="" />
        </div>
        <div class="bottom">
          <div class="thumbnail">
            <div class="thumbnail-wrapper">
              <img :src="IMG_ADDRESS + data.imgSrc" alt="" />
            </div>
          </div>
          <div class="text">
            <div class="name">
              {{ data.name }}
            </div>
            <div class="introduction">
              {{ data.introduction }}
            </div>
          </div>
        </div>
      </div>
    </card>
  </div>
</template>

<script setup lang="ts">
import { FriendsChain } from "~~/types";

const IMG_ADDRESS = import.meta.env.VITE_BASE_IMG_ADDRESS

const { data } = defineProps<{
  data?: FriendsChain;
}>();
</script>

<style scoped lang="scss">
.friendItem {
  border-radius: 1rem;
  overflow: hidden;
  max-width: 180px;
  min-width: 150px;
  border: 1px solid #e3e8f7;
  cursor: pointer;
  transition: border-color .7s,transform .7s;
  overflow: hidden;
  color: var(--font-color);
  box-sizing: border-box;
  &:hover {
    border-color: transparent;
    transform: scale(1.03);
    .card {
      .wrapper {
        .top {
          height: 90px;
          img {
            transform: scale(1.2);
            filter: brightness(.5);
          }
        }
        .bottom{
          padding: 1rem;
          .thumbnail{
            width: 0;
            img{
              width: 0;
              transform: translate(-10px,-10px);
            }
          }
          color:#e3e8f7;
          height: 120px;
          background: var(--theme);
        }
      }
    }
  }
  .card {
    .wrapper {
      .top {
        height: 120px;
        overflow: hidden;
        transition: height .7s;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s,filter .5s;
        }
      }
      .bottom{
        display: flex;
        height: 90px;
        box-sizing: border-box;
        padding: 0.8rem 0.5rem;
        transition: height .7s;
        .thumbnail{
          transition: width .5s;
          width: 25%;
          display: flex;
          justify-content: center;
          .thumbnail-wrapper{
            width: 30px;
            height: 30px;
            border-radius: 50%;
            overflow: hidden;
            img{
              width: 100%;
              transition: height .5s,transform .5s;
              object-fit: cover;
            }
          }
        }
        .text{
          flex: 1;
          .name{
            font-size: 1.1rem;
            font-weight: 500;
          }
          .introduction{
            opacity: .7;
            font-size: 0.9rem;
          }
        }
      }
    }
  }
}
</style>
