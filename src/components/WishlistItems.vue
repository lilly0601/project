<template>
  <div>
    <button @click="$emit('back')">← Назад</button>
    <h2>{{ category }}</h2>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.productId }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["category", "items"],
};
</script>