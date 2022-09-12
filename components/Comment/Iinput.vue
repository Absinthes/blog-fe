<template>
  <div class="input">
    <label>
      <div class="input-name">{{props.name}}</div>
      <input type="text" placeholder="请输入" @blur="emit('blur')" autocomplete="on" :value="props.inputValue" @input="handleInput"/>
    </label>
  </div>
</template>

<script setup lang="ts">
  const props = withDefaults(defineProps<{
    name:string,
    inputValue:string
  }>(),{
    inputValue:"",
    name:"昵称"
  })
  const attrs = useAttrs()

  const emit = defineEmits<{
    (e:"update:inputValue",val:string):void
    (e:"blur"):void
  }>()
  const handleInput = (e:any) => {
    emit('update:inputValue',e.target.value)
  }
</script>

<style scoped lang="scss">
.input {
  label {
    display: flex;
  }
  flex: 1;
  .input-name {
    padding: 0.5rem 1rem;
    background: rgba($color: #000000, $alpha: 0.1);
    color: #000000;
    font-weight: 500;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border: 1px solid rgba($color: #000000, $alpha: 0.1);;
    border-right: none;
    transition: border 0.3s;
  }
  input {
    outline: 0;
    border: 1px solid rgba($color: #000000, $alpha: 0.1);
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-left: none;
    padding: 0.5rem;
    flex: 1;
    transition: border 0.3s;
    &:focus {
      border-color: #409eff;
    }
  }
}
</style>
