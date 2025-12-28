<template>
  <aside 
    class="fixed lg:relative h-screen w-64 bg-gray-900/40 backdrop-blur-md border-r border-white/10 transition-all duration-300 z-30 flex flex-col"
    :class="[
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <!-- Branding Section -->
    <div class="p-3">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 flex items-center justify-center">
          <img src="/wrdnika-new.png" alt="Logo" class="w-7 h-7 object-contain" />
        </div>
        <div>
          <h1 class="text-xl font-bold text-white tracking-tight leading-none">Ingetinka</h1>
          <!-- <p class="text-[10px] text-white/40 uppercase tracking-widest mt-1">by wrdnika</p> -->
        </div>
      </div>
    </div>

    <div class="h-px bg-white/10"></div>

    <!-- Navigation Section -->
    <nav class="flex-grow px-1 space-y-2 mt-2">
      <router-link
        to="/"
        @click="$emit('close')"
        class="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300 group"
        active-class="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border border-cyan-500/20"
      >
        <ListTodo class="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span class="font-medium">{{ $t('sidebar.todoList') }}</span>
      </router-link>

      <router-link
        to="/subscriptions"
        @click="$emit('close')"
        class="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300 group"
        active-class="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border border-cyan-500/20"
      >
        <CreditCard class="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span class="font-medium">{{ $t('sidebar.subscriptions') }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import { ListTodo, CreditCard } from 'lucide-vue-next';

defineProps({
  session: Object,
  isOpen: Boolean
});

defineEmits(['close']);
</script>

<style scoped>
.router-link-active {
  background: rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.05);
}
</style>
