<template>
  <div v-if="show" class="fixed inset-0 bg-black/50 backdrop-blur-lg z-20 flex items-center justify-center">
    <div class="bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-6 w-full max-w-lg">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-white">Add New Task</h2>
        <button @click="close" class="text-white/80 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="mt-4">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};
</script>
