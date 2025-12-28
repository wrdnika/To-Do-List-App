<template>
  <header class="bg-white/5 backdrop-blur-lg border-b border-white/20 shadow-lg w-full z-20">
    <div class=" mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-3">
          <img src="/wrdnika-new.png" alt="Logo" class="w-10 h-10 object-contain rounded-xl" />
          <div>
            <h1 class="text-2xl font-light text-white tracking-wide">Ingetinka</h1>
            <p class="text-xs text-gray-400">by: wrdnika</p>
          </div>
        </div>

        <div v-if="session" class="relative mr-1">
          <button @click="toggleProfile" class="flex items-center gap-3 focus:outline-none group">
            <div class="hidden md:block text-right">
              <p class="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                {{ session.user.user_metadata.full_name || 'User' }}
              </p>
            </div>
            <div class="relative">
              <img :src="session.user.user_metadata.avatar_url" alt="Avatar" class="w-10 h-10 rounded-full border-2 border-white/20 group-hover:border-cyan-400 transition-all object-cover" referrerpolicy="no-referrer" />
              <div class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-gray-900"></div>
            </div>
          </button>

          <div v-if="isProfileOpen" @mouseleave="closeProfile" class="absolute right-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-2 transform origin-top-right transition-all z-50">
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
              <button @click="handleLogout" class="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

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
