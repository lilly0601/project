<template>
  <div>
    <!-- Если категория выбрана — показываем товары, иначе — список категорий -->
    <CategoriesList
      v-if="!selectedCategory"
      :categories="categories"
      @openCategory="openCategory"
    />

    <CategoryItems
      v-else
      :category="selectedCategory"
      :items="itemsByCategory[selectedCategory] || []"
      @back="selectedCategory = null"
    />
  </div>
</template>

<script>
import CategoriesList from './CategoriesList.vue';
import CategoryItems from './CategoriesItems.vue';

export default {
  components: { CategoriesList, CategoryItems },
  data() {
    return {
      selectedCategory: null,
      categories: [], // массив категорий { name: 'Обувь', count: 5 }
      itemsByCategory: {}, // { 'Обувь': [{id, productId}, ...], ... }
    };
  },
  created() {
    // Пример: загрузка данных из локального хранилища или бэкенда
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Считаем категории
    const categoriesCount = {};
    const itemsByCategory = {};
    wishlist.forEach((item) => {
      const cat = item.category || 'Без категории';
      if (!categoriesCount[cat]) categoriesCount[cat] = 0;
      categoriesCount[cat]++;

      if (!itemsByCategory[cat]) itemsByCategory[cat] = [];
      itemsByCategory[cat].push(item);
    });

    this.categories = Object.keys(categoriesCount).map((name) => ({
      name,
      count: categoriesCount[name],
    }));

    this.itemsByCategory = itemsByCategory;
  },
  methods: {
    openCategory(name) {
      this.selectedCategory = name;
    },
  },
};
</script>