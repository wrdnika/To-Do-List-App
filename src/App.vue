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
            class="lg:col-span-3 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 h-full min-h-0 overflow-hidden"
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
import { ref, computed, onMounted } from "vue";
import Sidebar from "./components/Sidebar.vue";
import TodoList from "./components/TodoList.vue";
import Modal from "./components/Modal.vue";
import TodoForm from "./components/TodoForm.vue";
import LiquidBackground from "./components/LiquidBackground.vue";
import { supabase } from "./supabase"; 

const tasks = ref([]);
const showModal = ref(false);
const searchQuery = ref("");
const filterCriteria = ref({
  status: "all",
  priority: "all",
  category: "",
  date: "",
});
const sortBy = ref("deadline");


const fetchTasks = async () => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) console.error('Error fetching tasks:', error);
  else tasks.value = data;
};

onMounted(() => {
  fetchTasks();
});

const addTask = async ({ text, deadline, priority, categories, notes }) => {
  const newTask = {
    text,
    completed: false,
    deadline,
    priority,
    reminder: true, 
    categories, 
    notes,
  };

  const { data, error } = await supabase
    .from('todos')
    .insert([newTask])
    .select(); 

  if (error) {
    console.error('Error adding task:', error);
  } else {
    if (data && data.length > 0) {
      tasks.value.unshift(data[0]); 
    }
    showModal.value = false;
  }
};

const toggleTask = async (id) => {
  const taskIndex = tasks.value.findIndex((t) => t.id === id);
  if (taskIndex === -1) return;
  
  const newStatus = !tasks.value[taskIndex].completed;

  tasks.value[taskIndex].completed = newStatus;

  const { error } = await supabase
    .from('todos')
    .update({ completed: newStatus })
    .eq('id', id);

  if (error) {
    console.error('Error toggling task:', error);
    tasks.value[taskIndex].completed = !newStatus; 
  }
};

const removeTask = async (id) => {
  const previousTasks = [...tasks.value];
  tasks.value = tasks.value.filter((t) => t.id !== id);

  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error removing task:', error);
    tasks.value = previousTasks; 
  }
};

const updateTask = async (updatedTask) => {
  const index = tasks.value.findIndex((t) => t.id === updatedTask.id);
  if (index !== -1) {
    const oldTask = tasks.value[index];
    tasks.value[index] = updatedTask;

    const { error } = await supabase
      .from('todos')
      .update({
        text: updatedTask.text,
        deadline: updatedTask.deadline,
        priority: updatedTask.priority,
        categories: updatedTask.categories,
        notes: updatedTask.notes
      })
      .eq('id', updatedTask.id);

    if (error) {
      console.error('Error updating task:', error);
      tasks.value[index] = oldTask; 
    }
  }
};

const handleSearch = (query) => {
  searchQuery.value = query;
};

const handleFilter = (filters) => {
  filterCriteria.value = filters;
};

const handleSort = (criteria) => {
  sortBy.value = criteria;
};

const filteredTasks = computed(() => {
  let filtered = tasks.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((task) =>
      task.text.toLowerCase().includes(query)
    );
  }

  filtered = filtered.filter((task) => {
    const statusMatch =
      filterCriteria.value.status === "all"
        ? true
        : filterCriteria.value.status === "completed"
        ? task.completed
        : !task.completed;

    const priorityMatch =
      filterCriteria.value.priority === "all"
        ? true
        : task.priority === filterCriteria.value.priority;

    const categoryMatch = filterCriteria.value.category
      ? task.categories.some((cat) =>
          cat.toLowerCase().includes(filterCriteria.value.category.toLowerCase())
        )
      : true;

    const dateMatch = filterCriteria.value.date
      ? task.deadline === filterCriteria.value.date
      : true;

    return statusMatch && priorityMatch && categoryMatch && dateMatch;
  });

  let sorted = [...filtered]; 
  
  if (sortBy.value === "deadline") {
    sorted.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  } else if (sortBy.value === "priority") {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    sorted.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  } else if (sortBy.value === "createdDate") {
    sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  return sorted;
});
</script>