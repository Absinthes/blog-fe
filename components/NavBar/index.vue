<template>
  <nav class="nav-contanier" :class="{ 'bg-show': prevScrollTop > 0 }">
    <div class="nav-group">
      <NuxtLink to="/">
        <div class="back-home pointer">
          <i class="iconfont icon-shouyetianchong"></i>
        </div>
      </NuxtLink>
      <div class="menu-box" :class="{ hide: direction === 'bottom' }">
        <span
          v-for="it in navMenu"
          class="menu-item pointer"
          @click.stop="handlerClick(it)"
        >
          {{ it.title }}
          <ul
            class="menu-item-children"
            v-if="it.children && it.children.length"
          >
            <li v-for="ele in it.children">
              <NuxtLink :to="ele.url">
                <i class="iconfont"></i>
                <span>{{ ele.title }}</span>
              </NuxtLink>
            </li>
          </ul>
        </span>
      </div>
      <div class="function">
        <i class="iconfont icon-sousuo pointer"></i>
        <i class="iconfont icon-icon_yejianqingtian pointer"></i>
      </div>
    </div>
    <div class="now-title">
      <span :class="{ show: direction === 'bottom' }" @click="backTop">{{
        route.meta.title
      }}</span>
    </div>
  </nav>
</template>

<script setup lang="ts">
import _ from "lodash";
type MenuItem = {
  title: string;
  url: string;
  icon?: string;
  children?: MenuItem[];
};
const route = useRoute();
const router = useRouter();
const navMenu: MenuItem[] = [
  {
    title: "文库",
    url: "",
    children: [
      {
        title: "文章列表",
        url: "",
        icon: "",
      },
      {
        title: "全部分类",
        url: "",
        icon: "",
      },
      {
        title: "全部标签",
        url: "/tags",
        icon: "",
      },
      {
        title: "即刻短文",
        url: "",
        icon: "",
      },
    ],
  },
  {
    title: "专栏",
    url: "",
  },
  {
    title: "友链",
    url: "",
  },
  {
    title: "我的",
    url: "",
  },
];
const direction = ref<"top" | "bottom">("top");

let prevScrollTop = ref(0);
const handlerScroll = (e: Event) => {
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop - prevScrollTop.value > 0) {
    direction.value = "bottom";
  } else {
    direction.value = "top";
  }
  prevScrollTop.value = scrollTop;  
};
const throttleHandleScroll = _.throttle(handlerScroll, 300);
onMounted(() => {
  window.addEventListener("scroll", throttleHandleScroll, false);
});

const backTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const handlerClick = (it: MenuItem) => {
  router.push(it.url)
}
</script>

<style scoped lang="scss">
.nav-contanier {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-bottom: 1px solid transparent;
  color: var(--font-color);
  backdrop-filter: saturate(180%) blur(20px);
  transition: background 0.3s ease-in-out;
  z-index: 99;
  a {
    text-decoration: none;
    color: currentColor;
  }
  // overflow: hidden;
  &.bg-show {
    background-color: var(--maskbgdeep);
    border-color: var(--card-border);
  }
  .nav-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    height: 60px;
    max-width: var(--max-width, 1400px);
    padding: 0 30px;
    box-sizing: border-box;
  }
}

.back-home {
  padding: 5px 30px;
  background-color: var(--theme, #425aef);
  text-align: center;
  border-radius: var(--md-radius, 8px);
  i {
    color: var(--font-color);
    font-size: 1.4rem;
    color: var(--white, #fff);
  }
}

.menu-box {
  display: flex;
  align-items: center;
  transition: transform 0.3s ease-in-out;
  .menu-item {
    position: relative;
    padding: 8px 20px;
    margin: 0 7px;
    border-radius: var(--normal-radius);
    transition: all 0.3s ease-in-out;
    &:hover {
      background-color: var(--theme);
      color: var(--white);
      font-weight: 700;
    }
    &:hover .menu-item-children {
      border: 1px solid var(--theme);
      display: block;
      &::before {
        content: "";
        position: absolute;
        display: block;
        top: -10px;
        width: 100%;
        height: 10px;
      }
    }
    .menu-item-children {
      position: absolute;
      display: none;
      left: 50%;
      transform: translate(-50%);
      top: 35px;
      padding: 6px 4px 8px;
      margin-top: 8px;
      border: 1px solid transparent;
      border-radius: var(--md-radius);
      white-space: nowrap;
      color: var(--font-color);
      font-weight: 500;
      background-color: var(--card-bg);
      list-style-type: none;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      transition: border 0.3s ease-in-out;
      animation: menuShow 0.3s;
      z-index: 99;
      li {
        display: inline-flex;
        padding: 10px 15px;
        margin: 0 4px;
        border-radius: var(--normal-radius);
        transition: all 0.3s ease-in-out;
        &:hover {
          background-color: var(--theme);
          color: var(--white);
          font-weight: 700;
        }
      }
    }
  }
  &.hide {
    transform: translateY(-60px);
  }
}

.function {
  i {
    padding: 7px;
    margin: 0 10px;
    font-size: var(--md-size);
    border-radius: var(--md-radius);
    color: var(--font-color);
    transition: all 0.3s ease-in-out;
    &:hover {
      background-color: var(--theme);
      color: var(--white);
    }
  }
}

.now-title {
  position: absolute;
  top: 0;
  left: 50%;
  height: 100%;
  transform: translateX(-50%);
  overflow: hidden;
  span {
    display: inline-block;
    padding: 0px 10px;
    text-align: center;
    line-height: 60px;
    min-width: calc(4 * var(--noraml-size));
    transform: translateY(100%);
    transition: transform 0.3s;
  }
  span.show {
    transform: translateY(0);
  }
  &:hover span::after {
    display: flex;
  }
  & span::after {
    content: "回到顶部";
    display: none;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 5px;
    bottom: 5px;
    color: var(--white);
    font-weight: 700;
    background-color: var(--theme);
    border-radius: var(--normal-radius);
    cursor: pointer;
    animation: show 0.3s;
  }
}

@keyframes menuShow {
  from {
    opacity: 0;
    transform: translate(-50%, -10px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0px);
  }
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
