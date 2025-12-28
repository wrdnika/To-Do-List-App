<template>
  <div class="h-full flex flex-col gap-4">
    <!-- Header with Action Button -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-white tracking-tight">Subscriptions</h1>
      <button
        @click="showFormModal = true"
        class="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition-all shadow-lg hover:shadow-cyan-500/20"
      >
        <Plus class="w-5 h-5" />
        <span class="hidden sm:inline">Add Subscription</span>
      </button>
    </div>

    <!-- Main Content: Subscription List -->
    <div class="flex-grow overflow-hidden relative z-0">
      <SubscriptionList ref="subListRef" :session="session" />
    </div>

    <!-- Add Form Modal -->
    <Modal :show="showFormModal" @close="showFormModal = false">
      <div class="p-6">
        <h2 class="text-xl font-bold text-white mb-6">Add New Subscription</h2>
        <SubscriptionForm :session="session" @added="handleSubAdded" />
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Plus } from 'lucide-vue-next';
import SubscriptionList from '../components/SubscriptionList.vue';
import SubscriptionForm from '../components/SubscriptionForm.vue';
import Modal from '../components/Modal.vue';

const props = defineProps({
  session: Object
});

const showFormModal = ref(false);
const subListRef = ref(null);

const handleSubAdded = () => {
  showFormModal.value = false;
  // Refresh list
  if (subListRef.value) {
    subListRef.value.refresh();
  }
};
</script>
