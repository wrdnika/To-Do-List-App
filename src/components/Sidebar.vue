<template>
  <aside class="w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6">
    <h2 class="text-xl font-semibold text-white mb-4">Menu</h2>
    <ul class="space-y-2">
      <li>
        <router-link
          to="/"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300"
          active-class="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-500/30"
        >
          <ListTodo class="w-6 h-6" />
          <span class="font-medium">Todo List</span>
        </router-link>
      </li>
      <li>
        <router-link
          to="/subscriptions"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300"
          active-class="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-500/30"
        >
          <CreditCard class="w-6 h-6" />
          <span class="font-medium">Subscriptions</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { ListTodo, CreditCard } from 'lucide-vue-next';
</script>
