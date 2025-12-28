<template>
  <div class="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4">
    <!-- Decorative Background Elements -->
    <!-- <div class="absolute top-1/4 -left-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"></div>
    <div class="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style="animation-delay: 1s;"></div> -->
    
    <!-- Language Switcher -->
    <div class="absolute top-6 right-6 z-20">
      <button 
        @click="toggleLanguage" 
        class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold transition-all duration-300 border border-white/10 backdrop-blur-md group"
      >
        <Globe class="w-4 h-4 group-hover:rotate-12 transition-transform" />
        <span>{{ locale === 'id' ? 'ID' : 'EN' }}</span>
      </button>
    </div>

    <!-- Login Card -->
    <div 
      class="relative z-10 w-full max-w-md transform transition-all duration-700 ease-out translate-y-0 opacity-100"
      :class="{ 'translate-y-4 opacity-0': !isMounted }"
    >
      <div class="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] text-center relative overflow-hidden group">
        <!-- Shine Effect -->
        <div class="absolute -inset-x-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover:animate-[shine_1.5s_ease-out]"></div>

        <!-- Logo Container -->
        <div class="relative inline-block mb-8">
          <!-- <div class="absolute inset-0 bg-cyan-400/20 blur-2xl rounded-full animate-pulse"></div> -->
          <img src="/wrdnika-new.png" alt="Logo" class="relative w-24 h-24 object-contain mx-auto rounded-3xl" />
        </div>

        <h1 class="text-4xl font-bold text-white mb-3 tracking-tight">
          Ingetinka
        </h1>
        <p class="text-white/40 mb-10 text-sm font-medium uppercase tracking-[0.2em]">
          {{ $t('login.subtitle') }}
        </p>
        
        <!-- Action Button -->
        <div class="space-y-4">
          <button 
            @click="handleLogin"
            class="group relative w-full flex items-center justify-center gap-4 bg-white text-gray-900 font-bold py-4 px-6 rounded-2xl hover:bg-white/90 transition-all duration-300 active:scale-[0.98] shadow-[0_10px_20px_-5px_rgba(255,255,255,0.2)]"
          >
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <svg class="w-6 h-6 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span class="text-base tracking-tight">Continue with Google</span>
          </button>
        </div>

        <!-- Progress/Footer -->
        <div class="mt-12 flex flex-col items-center gap-6">
          <div class="h-px w-12 bg-white/10"></div>
          <div class="flex items-center gap-4 text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
            <span>Productivity</span>
            <div class="w-1 h-1 bg-white/20 rounded-full"></div>
            <span>Organization</span>
            <div class="w-1 h-1 bg-white/20 rounded-full"></div>
            <span>Efficiency</span>
          </div>
        </div>
      </div>
      
      <!-- Bottom Branding -->
      <!-- <p class="mt-8 text-center text-white/20 text-[10px] font-medium uppercase tracking-[0.4em]">
        Design by wrdnika
      </p> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Globe } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';

defineProps({
  handleLogin: Function,
});

const { locale } = useI18n();
const isMounted = ref(false);

onMounted(() => {
  setTimeout(() => {
    isMounted.value = true;
  }, 100);
});

const toggleLanguage = () => {
  locale.value = locale.value === 'id' ? 'en' : 'id';
  localStorage.setItem('language', locale.value);
};
</script>

<style>
@keyframes shine {
  0% { left: -100%; top: 0; }
  100% { left: 100%; top: 0; }
}

@keyframes pulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}

.animate-pulse {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
