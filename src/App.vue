<template>
      <LiquidBackground class="absolute top-0 left-0 w-full h-full z-0" />
<div v-if="!session" class="relative h-screen flex flex-col items-center justify-center z-10 px-4">
    <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl text-center max-w-md w-full">
      <img src="/wrdnika-white.png" alt="Logo" class="w-20 h-20 object-contain mx-auto mb-6 rounded-2xl" />
      <h1 class="text-3xl font-light text-white mb-2">Welcome Back</h1>
      <p class="text-gray-400 mb-8">Sign in to sync your tasks across devices.</p>
      
      <button 
        @click="handleLogin"
        class="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-medium py-3 px-4 rounded-xl hover:bg-gray-100 transition-all duration-300"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" />
          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Continue with Google
      </button>
    </div>
  </div>

  <div v-else id="app-container" class="relative h-screen flex flex-col">
    <header class="bg-white/5 backdrop-blur-lg border-b border-white/20 shadow-lg w-full z-20">
  <div class="max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      
      <div class="flex items-center gap-3">
        <img src="/wrdnika-white.png" alt="Logo" class="w-10 h-10 object-contain rounded-xl" />
        <div>
          <h1 class="text-2xl font-light text-white tracking-wide">Ingetinka</h1>
          <p class="text-xs text-gray-400">by: wrdnika</p>
        </div>
      </div>

      <div v-if="session" class="relative mr-1">
        <button 
          @click="isProfileOpen = !isProfileOpen"
          class="flex items-center gap-3 focus:outline-none group"
        >
          <div class="hidden md:block text-right">
            <p class="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
              {{ session.user.user_metadata.full_name || 'User' }}
            </p>
            <!-- <p class="text-xs text-gray-400">
              {{ session.user.email }}
            </p> -->
          </div>

          <div class="relative">
            <img 
              :src="session.user.user_metadata.avatar_url" 
              alt="Avatar" 
              class="w-10 h-10 rounded-full border-2 border-white/20 group-hover:border-cyan-400 transition-all object-cover"
              referrerpolicy="no-referrer" 
            />
            <div class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-gray-900"></div>
          </div>
        </button>

        <div 
          v-if="isProfileOpen" 
          class="absolute right-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-2 transform origin-top-right transition-all z-50"
          @mouseleave="isProfileOpen = false" 
        >
          <div class="px-4 py-3 border-b border-white/10 md:hidden">
            <p class="text-sm font-medium text-white">{{ session.user.user_metadata.full_name }}</p>
            <p class="text-xs text-gray-400 truncate">{{ session.user.email }}</p>
          </div>

          <div class="px-2 py-1">
             <a href="#" class="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-white/10 rounded-lg transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              Settings
            </a>
            
            <div class="h-px bg-white/10 my-1"></div>
            
            <button 
              @click="handleLogout"
              class="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            >
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
               Sign Out
            </button>
          </div>
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
          <div class="lg:col-span-3 h-full overflow-hidden">
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
    
    <Modal :show="showModal" @close="showModal = false">
      <TodoForm @add="addTask" />
    </Modal>
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

const session = ref(null);
const isProfileOpen = ref(false);
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
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
    if (data.session) fetchTasks();
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
    if (_session) fetchTasks();
    else tasks.value = []; 
  });
});

const handleLogin = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin // Redirect balik ke halaman ini
    }
  });
};

// Fungsi Logout
const handleLogout = async () => {
  await supabase.auth.signOut();
};

onMounted(() => {
  fetchTasks();
});

const addTask = async ({ text, deadline, priority, categories, notes }) => {
  const newTask = {
    user_id: session.value.user.id,
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