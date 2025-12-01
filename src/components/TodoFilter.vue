<template>
  <div>
    <h3 class="text-lg font-semibold text-white mb-4">Filter Tasks</h3>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label for="status-filter" class="block text-sm font-medium text-white/80 mb-1">Status</label>
        <select id="status-filter" v-model="filters.status" @change="applyFilters" class="w-full p-2 bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400">
          <option value="all" class="bg-gray-800">All</option>
          <option value="active" class="bg-gray-800">Active</option>
          <option value="completed" class="bg-gray-800">Completed</option>
        </select>
      </div>
      <div>
        <label for="priority-filter" class="block text-sm font-medium text-white/80 mb-1">Priority</label>
        <select id="priority-filter" v-model="filters.priority" @change="applyFilters" class="w-full p-2 bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400">
          <option value="all" class="bg-gray-800">All</option>
          <option value="High" class="bg-gray-800">High</option>
          <option value="Medium" class="bg-gray-800">Medium</option>
          <option value="Low" class="bg-gray-800">Low</option>
        </select>
      </div>
      <div>
        <label for="category-filter" class="block text-sm font-medium text-white/80 mb-1">Category</label>
        <input id="category-filter" type="text" v-model="filters.category" @input="applyFilters" placeholder="Enter category" class="w-full p-2 bg-white/10 border border-white/20 text-white rounded-lg placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400">
      </div>
      <div>
        <label for="date-filter" class="block text-sm font-medium text-white/80 mb-1">Date</label>
        <input id="date-filter" type="date" v-model="filters.date" @change="applyFilters" class="w-full p-2 bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const emit = defineEmits(['filter']);

const filters = reactive({
  status: 'all',
  priority: 'all',
  category: '',
  date: ''
});

const applyFilters = () => {
  emit('filter', { ...filters });
};
</script>
