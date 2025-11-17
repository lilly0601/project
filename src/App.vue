<template>
  <div>
    <CategoriesList
      v-if="view === 'categories'"
      :categories="categories"
      @openCategory="openCategory"
    />

    <WishlistItems
      v-if="view === 'items'"
      :category="currentCategory"
      :items="filteredItems"
      @back="view = 'categories'"
    />
  </div>
</template>

<script>

import CategoriesList from "./components/CategoriesList.vue";
import WishlistItems from "./components/WishlistItems.vue";


export default {
  components: { CategoriesList, WishlistItems },

  data() {
    return {
      wishlist: [],
      categories: [],
      view: "categories",
      currentCategory: null,
    };
  },

  async mounted() {
    this.wishlist = await new Promise(resolve => {
      chrome.runtime.sendMessage({ action: "getWishlist" }, resolve);
    });

    this.buildCategories();
  },

  methods: {
    buildCategories() {
      const map = {};

      this.wishlist.forEach(item => {
        if (!map[item.category]) map[item.category] = 0;
        map[item.category]++;
      });

      this.categories = Object.keys(map).map(key => ({
        name: key,
        count: map[key],
      }));
    },

    openCategory(name) {
      this.currentCategory = name;
      this.view = "items";
    },
  },

  computed: {
    filteredItems() {
      return this.wishlist.filter(i => i.category === this.currentCategory);
    }
  }
};
</script>