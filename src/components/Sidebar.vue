<template>
  <aside 
    class="flex flex-col h-screen w-64 bg-gray-900/40 backdrop-blur-md border-r border-white/10 transition-all duration-300 relative z-30"
  >
    <!-- Branding Section -->
    <div class="p-6">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 flex items-center justify-center">
          <img src="/wrdnika-new.png" alt="Logo" class="w-7 h-7 object-contain" />
        </div>
        <div>
          <h1 class="text-xl font-bold text-white tracking-tight leading-none">Ingetinka</h1>
          <p class="text-[10px] text-white/40 uppercase tracking-widest mt-1">by wrdnika</p>
        </div>
      </div>
    </div>

    <!-- Navigation Section -->
    <nav class="flex-grow px-4 space-y-2 mt-4">
      <router-link
        to="/"
        class="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300 group"
        active-class="bg-white/10 text-white !text-cyan-400"
      >
        <ListTodo class="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span class="font-medium">Todo List</span>
      </router-link>

      <router-link
        to="/subscriptions"
        class="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300 group"
        active-class="bg-white/10 text-white !text-cyan-400"
      >
        <CreditCard class="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span class="font-medium">Subscriptions</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import { ListTodo, CreditCard } from 'lucide-vue-next';

defineProps({
  session: Object
});
</script>

<style scoped>
.router-link-active {
  background: rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.05);
}
</style>
