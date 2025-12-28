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

  <div v-else id="app-container" class="relative h-screen flex flex-col">
    <Header :session="session" :handleLogout="handleLogout" />
    <main class="max-w-screen relative z-10 flex-grow overflow-hidden">
      <div class="h-full p-2">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-2 h-full">
          <div class="lg:col-span-1 space-y-6">
            <Sidebar />
          </div>
          <div class="lg:col-span-3 h-full overflow-hidden">
            <router-view :session="session" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useAuth } from './composables/useAuth';
import Login from './components/Login.vue';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import DotGrid from './components/DotGrid.vue';

const { session, handleLogin, handleLogout } = useAuth();
</script>
