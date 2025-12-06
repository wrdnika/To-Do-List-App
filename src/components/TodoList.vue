<template>
  <div>
    <div class="p-2 border-b border-white/10">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div class="relative flex-grow sm:w-auto w-full">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search tasks..."
            @input="applySearch"
            class="w-full p-3 bg-white/10 border border-white/20 text-white rounded-xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
          />
        </div>
        <div class="flex gap-2">
          <AddTaskButton @open-modal="openModal" />
          <div class="relative">
            <button @click="showFilterOptions = !showFilterOptions" class="p-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors" data-testid="filter-button">
              <Filter class="h-5 w-5" />
            </button>
            <div v-if="showFilterOptions" class="absolute right-0 mt-2 w-72 bg-gray-800/90 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl z-10 p-4 space-y-4">
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
          <div class="relative">
            <button
              @click="showSortOptions = !showSortOptions"
              class="p-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors"
              data-testid="sort-button"
            >
              <ArrowUpDown class="h-5 w-5" />
            </button>
          <div
            v-if="showSortOptions"
            class="absolute right-0 mt-2 w-48 bg-gray-800/90 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl z-10"
          >
            <a
              href="#"
              @click.prevent="applySort('deadline')"
              class="block px-4 py-2 text-white hover:bg-white/10"
              >Deadline</a
            >
            <a
              href="#"
              @click.prevent="applySort('priority')"
              class="block px-4 py-2 text-white hover:bg-white/10"
              >Priority</a
            >
            <a
              href="#"
              @click.prevent="applySort('createdDate')"
              class="block px-4 py-2 text-white hover:bg-white/10"
              >Created Date</a
            >
          </div>
        </div>
        </div>
      </div>
    </div>
    <h2
      class="text-2xl font-semibold text-white py-2 px-4 border-b border-white/10"
    >
      Tasks List
    </h2>
    <div v-if="tasks.length === 0" class="text-center text-white/50 p-8">
      <p class="mb-4">No tasks match your current filters.</p>
      <p class="text-sm">
        Try adjusting your search or filter settings, or add a new task!
      </p>
    </div>
    <TransitionGroup
      v-else
      name="list"
      tag="div"
      class="divide-y divide-white/10"
    >
      <TodoItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="toggleTask"
        @remove="removeTask"
        @update="updateTask"
      />
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ArrowUpDown, Filter } from "lucide-vue-next";
import TodoItem from "./TodoItem.vue";
import AddTaskButton from "./AddTaskButton.vue";

const props = defineProps(["tasks"]);
const emit = defineEmits([
  "toggle",
  "remove",
  "update",
  "search",
  "filter",
  "sort",
  "open-modal",
]);

const openModal = () => {
  emit("open-modal");
};

const searchQuery = ref("");
const applySearch = () => {
  emit("search", searchQuery.value);
};

const filters = reactive({
  status: "all",
  priority: "all",
  category: "",
  date: "",
});
const applyFilters = () => {
  emit("filter", { ...filters });
};

const sortBy = ref("deadline");
const showSortOptions = ref(false);
const showFilterOptions = ref(false);
const applySort = (criteria) => {
  sortBy.value = criteria;
  emit("sort", sortBy.value);
  showSortOptions.value = false; 
};

const updateTask = (updatedTask) => {
  emit("update", updatedTask);
};

const toggleTask = (id) => emit("toggle", id);
const removeTask = (id) => emit("remove", id);
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
