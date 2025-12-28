<template>
  <div v-if="show" class="fixed inset-0 bg-black/60 backdrop-blur-xl z-50 flex items-center justify-center p-4">
    <div class="bg-gray-900/90 rounded-3xl shadow-2xl border border-white/10 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300">
      <div class="flex items-center justify-between p-6 border-b border-white/5">
        <h2 class="text-xl font-bold text-white tracking-tight">{{ title || 'Modal Title' }}</h2>
        <button @click="close" class="p-2 hover:bg-white/5 rounded-full text-white/50 hover:text-white transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="p-6">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  title: String,
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};
</script>
