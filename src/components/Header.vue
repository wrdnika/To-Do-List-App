<template>
  <header class="h-16 flex items-center justify-between px-4 md:px-8 border-b border-white/5 backdrop-blur-md relative z-20">
    <div class="flex items-center gap-4">
      <!-- Hamburger Menu for Mobile -->
      <button 
        @click="$emit('toggle-sidebar')"
        class="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
        aria-label="Toggle Menu"
      >
        <Menu class="w-6 h-6" />
      </button>

      <h2 class="text-sm font-medium text-white/40 uppercase tracking-widest hidden sm:block">
        {{ $route.path === '/' ? $t('header.dashboard') : $t('header.tracker') }}
      </h2>
    </div>

    <div class="flex items-center gap-4">
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
              <span>{{ $t('header.settings') }}</span>
            </button>
            <button class="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors group">
              <Info class="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{{ $t('header.about') }}</span>
            </button>
            
            <div class="h-px bg-white/5 my-2"></div>

            <!-- Moved Language Switcher here -->
            <button @click="toggleLanguage" class="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors group">
              <Globe class="w-4 h-4 group-hover:scale-110 transition-transform" />
              <div class="flex-grow text-left">
                <span>{{ $t('header.language') }}</span>
              </div>
              <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/10 text-white/40">
                {{ locale === 'id' ? 'ID' : 'EN' }}
              </span>
            </button>

            <button @click="handleLogout" class="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
              <LogOut class="w-4 h-4" />
              {{ $t('header.signOut') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { Settings, Info, LogOut, Globe, Menu } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  session: Object,
  handleLogout: Function,
});

defineEmits(['toggle-sidebar']);

const { locale } = useI18n();
const isProfileOpen = ref(false);

const toggleProfile = () => {
  isProfileOpen.value = !isProfileOpen.value;
};

const closeProfile = () => {
  isProfileOpen.value = false;
};

const toggleLanguage = () => {
  locale.value = locale.value === 'id' ? 'en' : 'id';
  localStorage.setItem('language', locale.value);
};
</script>
