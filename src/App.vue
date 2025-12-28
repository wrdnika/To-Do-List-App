<template>
  <div class="absolute top-0 left-0 w-full h-full z-0 bg-gray-900">
    <DotGrid
      :dot-size="2"
      :gap="16"
      base-color="#111827"
      active-color="#3B82F6"
      :proximity="100"
      :speed-trigger="100"
      :shock-radius="250"
      :shock-strength="5"
      :max-speed="5000"
      :resistance="750"
      :return-duration="1.5"
      class-name="custom-dot-grid"
    />
  </div>

  <div v-if="!session" class="h-screen flex items-center justify-center">
    <Login :handleLogin="handleLogin" />
  </div>

  <div v-else id="app-container" class="relative h-screen flex overflow-hidden">
    <!-- Mobile Overlay -->
    <div 
      v-if="isSidebarOpen" 
      @click="isSidebarOpen = false"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
    ></div>

    <!-- Sidebar -->
    <Sidebar 
      :session="session" 
      :is-open="isSidebarOpen"
      @close="isSidebarOpen = false"
    />

    <!-- Main Content Area -->
    <div class="flex-grow flex flex-col min-w-0 bg-gray-900/20 relative z-10 transition-all duration-300">
      <Header 
        :session="session" 
        :handleLogout="handleLogout" 
        @toggle-sidebar="isSidebarOpen = !isSidebarOpen"
      />
      
      <main class="flex-grow overflow-y-auto custom-scrollbar">
        <div class="h-full">
          <router-view :session="session" />
        </div>
      </main>
    </div>
  </div>
</template>

<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>

<script setup>
import { ref } from 'vue';
import { useAuth } from './composables/useAuth';
import Login from './components/Login.vue';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import DotGrid from './components/DotGrid.vue';

const { session, handleLogin, handleLogout } = useAuth();
const isSidebarOpen = ref(false);
</script>
