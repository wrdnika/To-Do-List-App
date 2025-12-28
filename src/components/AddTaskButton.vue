<template>
  <button
    @click="openModal"
    class="flex items-center gap-2 px-3 sm:px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all duration-300 group"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
    <span class="hidden sm:inline">{{ $t('todo.create') }}</span>
  </button>
</template>

<script setup>
const emit = defineEmits(['open-modal']);

const openModal = () => {
  emit('open-modal');
};
</script>
