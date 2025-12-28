<template>
  <header class="h-16 flex items-center justify-between px-8 border-b border-white/5 backdrop-blur-md relative z-20">
    <div class="flex items-center gap-4">
      <h2 class="text-sm font-medium text-white/40 uppercase tracking-widest">
        {{ $route.path === '/' ? 'Tasks Dashboard' : 'Subscription Tracker' }}
      </h2>
    </div>

    <div v-if="session" class="relative">
      <button @click="toggleProfile" class="flex items-center gap-3 focus:outline-none group">
        <div class="hidden md:block text-right">
          <p class="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
            {{ session.user.user_metadata.full_name || 'User' }}
          </p>
        </div>
        <div class="relative">
          <img :src="session.user.user_metadata.avatar_url" alt="Avatar" class="w-9 h-9 rounded-full border border-white/10 group-hover:border-cyan-400 transition-all object-cover" referrerpolicy="no-referrer" />
          <div class="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-gray-900"></div>
        </div>
      </button>

      <div v-if="isProfileOpen" @mouseleave="closeProfile" class="absolute right-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-2 transform origin-top-right transition-all z-50 overflow-hidden">
        <div class="p-2 space-y-1">
          <button class="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors group">
            <Settings class="w-4 h-4 group-hover:rotate-45 transition-transform" />
            <span>Settings</span>
          </button>
          <button class="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors group">
            <Info class="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>About Ingetinka</span>
          </button>
          <div class="h-px bg-white/5 my-2"></div>
          <button @click="handleLogout" class="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <LogOut class="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { Settings, Info, LogOut } from 'lucide-vue-next';

const props = defineProps({
  session: Object,
  handleLogout: Function,
});

const isProfileOpen = ref(false);

const toggleProfile = () => {
  isProfileOpen.value = !isProfileOpen.value;
};

const closeProfile = () => {
  isProfileOpen.value = false;
};
</script>
