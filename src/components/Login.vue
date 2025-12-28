<template>
  <div class="relative h-screen flex flex-col items-center justify-center z-10 px-4">
    <!-- Language Switcher -->
    <div class="absolute top-6 right-6">
      <button 
        @click="toggleLanguage" 
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-xs font-medium transition-colors border border-white/10 backdrop-blur-md"
      >
        <Globe class="w-3.5 h-3.5" />
        <span>{{ locale === 'id' ? 'ID' : 'EN' }}</span>
      </button>
    </div>

    <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl text-center max-w-md w-full">
      <img src="/wrdnika-white.png" alt="Logo" class="w-20 h-20 object-contain mx-auto mb-6 rounded-2xl" />
      <h1 class="text-3xl font-light text-white mb-2">{{ $t('login.title') }}</h1>
      <p class="text-gray-400 mb-8">{{ $t('login.subtitle') }}</p>
      
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
</template>

<script setup>
import { Globe } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';

defineProps({
  handleLogin: Function,
});

const { locale } = useI18n();

const toggleLanguage = () => {
  locale.value = locale.value === 'id' ? 'en' : 'id';
  localStorage.setItem('language', locale.value);
};
</script>
