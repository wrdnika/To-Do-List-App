<template>
  <div>
    <h3 class="text-lg font-semibold text-white mb-4">Search Tasks</h3>
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search tasks..."
        @input="applySearch"
        class="w-full p-3 bg-white/10 border border-white/20 text-white rounded-xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(['search']);

const searchQuery = ref('');

const applySearch = () => {
  emit('search', searchQuery.value);
};
</script>
