<template>
  <div>
    <h3 class="text-lg font-semibold text-white mb-4">Sort Tasks</h3>
    <div class="grid grid-cols-1">
      <div>
        <label for="sort-by" class="block text-sm font-medium text-white/80 mb-1">Sort By</label>
        <select id="sort-by" v-model="sortBy" @change="applySort" class="w-full p-2 bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400">
          <option value="deadline" class="bg-gray-800">Deadline</option>
          <option value="priority" class="bg-gray-800">Priority</option>
          <option value="createdDate" class="bg-gray-800">Created Date</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(['sort']);

const sortBy = ref('deadline');

const applySort = () => {
  emit('sort', sortBy.value);
};
</script>
