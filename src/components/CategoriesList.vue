<template>
  <div>
    <h2>Категории</h2>
    <ul>
      <li
        v-for="cat in categories"
        :key="cat.name"
        @click="$emit('openCategory', cat.name)"
        style="cursor:pointer; margin:5px 0;"
      >
        {{ cat.name }} — {{ cat.count }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["categories"],
};
</script>