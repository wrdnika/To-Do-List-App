<template>
      <LiquidBackground class="absolute top-0 left-0 w-full h-full z-0" />

  <div id="app-container" class="relative h-screen flex flex-col">
    <header
      class="bg-white/5 backdrop-blur-lg border-b border-white/20 shadow-lg w-full z-10"
    >
      <div class="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-start h-16">
          <div class="flex items-center gap-3">
            <img
              src="/wrdnika-white.png"
              alt="Logo"
              class="w-10 h-10 object-contain rounded-xl"
            />
            <div>
              <h1 class="text-2xl font-light text-white tracking-wide">
                Wrdnika
              </h1>
              <p class="text-xs text-gray-400">Todo List App</p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-screen relative z-10 flex-grow overflow-hidden">
      <div class="h-full p-2">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-2 h-full">
          <div class="lg:col-span-1 space-y-6">
            <Sidebar />
          </div>
          <Modal :show="showModal" @close="showModal = false">
            <TodoForm @add="addTask" />
          </Modal>
          <div
            class="lg:col-span-3 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 h-full"
          >
            <TodoList
              :tasks="filteredTasks"
              @toggle="toggleTask"
              @remove="removeTask"
              @update="updateTask"
              @search="handleSearch"
              @filter="handleFilter"
              @sort="handleSort"
              @open-modal="showModal = true"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { ClipboardList } from "lucide-vue-next";
import Sidebar from "./components/Sidebar.vue";
import TodoList from "./components/TodoList.vue";
import Modal from "./components/Modal.vue";
import TodoForm from "./components/TodoForm.vue";
import LiquidBackground from "./components/LiquidBackground.vue";

const showModal = ref(false);

const tasks = ref([
  {
    id: 1,
    text: "Design new project",
    completed: false,
    priority: "High",
    deadline: "2025-04-01",
    reminder: true,
    categories: ["Work"],
    notes: "This is a note for the task.",
  },
]);

onMounted(() => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks);
  }

  reminderInterval = setInterval(checkReminders, 60000);
});

watch(
  tasks,
  (newTasks) => {
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  },
  { deep: true }
);

const filters = ref({
  status: 'all',
  priority: 'all',
  category: '',
  date: ''
});

const handleFilter = (newFilters) => {
  filters.value = newFilters;
};

const sortBy = ref('deadline');

const handleSort = (newSortBy) => {
  sortBy.value = newSortBy;
};

const searchQuery = ref('');

const handleSearch = (newSearchQuery) => {
  searchQuery.value = newSearchQuery;
};

const filteredTasks = computed(() => {
  let filtered = tasks.value.filter(task => {
    const searchMatch = searchQuery.value === '' ||
      task.text.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      task.notes.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      task.categories.some(cat => cat.toLowerCase().includes(searchQuery.value.toLowerCase()));

    const statusMatch = filters.value.status === 'all' || (filters.value.status === 'completed' && task.completed) || (filters.value.status === 'active' && !task.completed);
    const priorityMatch = filters.value.priority === 'all' || task.priority === filters.value.priority;
    const categoryMatch = filters.value.category === '' || task.categories.includes(filters.value.category);
    const dateMatch = filters.value.date === '' || task.deadline === filters.value.date;
    return searchMatch && statusMatch && priorityMatch && categoryMatch && dateMatch;
  });

  if (sortBy.value === 'deadline') {
    filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  } else if (sortBy.value === 'priority') {
    const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
    filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  } else if (sortBy.value === 'createdDate') {
    filtered.sort((a, b) => b.id - a.id);
  }

  return filtered;
});

const addTask = ({ text, deadline, priority, categories, notes }) => {
  tasks.value.push({
    id: Date.now(),
    text,
    completed: false,
    deadline,
    priority,
    reminder: true,
    categories,
    notes,
  });
  showModal.value = false;
};

const toggleTask = (id) => {
  const task = tasks.value.find((t) => t.id === id);
  if (task) task.completed = !task.completed;
};

const removeTask = (id) => {
  tasks.value = tasks.value.filter((t) => t.id !== id);
};

const updateTask = (updatedTask) => {
  const index = tasks.value.findIndex((t) => t.id === updatedTask.id);
  if (index !== -1) tasks.value[index] = updatedTask;
};

let reminderInterval;

const checkReminders = () => {
  tasks.value.forEach((task) => {
    if (task.reminder && new Date(task.deadline) <= new Date()) {
      console.log(`Reminder: ${task.text} is due!`);
    }
  });
};

onUnmounted(() => {
  clearInterval(reminderInterval);
});
</script>
