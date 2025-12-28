<template>
  <div class="h-full flex flex-col gap-4">
    <!-- Header with Action Button -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-white tracking-tight">{{ $t('subscription.title') }}</h1>
      <button
        @click="openAddModal"
        class="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition-all shadow-lg hover:shadow-cyan-500/20"
      >
        <Plus class="w-5 h-5" />
        <span class="hidden sm:inline">{{ $t('subscription.add') }}</span>
      </button>
    </div>

    <!-- Main Content: Subscription List -->
    <div class="flex-grow overflow-hidden relative z-0">
      <SubscriptionList 
        ref="subListRef" 
        :session="session" 
        @edit="handleEdit" 
        @delete="handleDelete" 
      />
    </div>

    <!-- Form Modal (Add/Edit) -->
    <Modal 
      :show="showFormModal" 
      :title="editingSubscription ? $t('subscription.edit') : $t('subscription.add')"
      @close="closeModal"
    >
      <SubscriptionForm 
        :session="session" 
        :subscription="editingSubscription"
        @added="handleSuccess" 
        @updated="handleSuccess"
      />
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Plus } from 'lucide-vue-next';
import { supabase } from '../supabase';
import SubscriptionList from '../components/SubscriptionList.vue';
import SubscriptionForm from '../components/SubscriptionForm.vue';
import Modal from '../components/Modal.vue';

const props = defineProps({
  session: Object
});

const showFormModal = ref(false);
const editingSubscription = ref(null);
const subListRef = ref(null);

const openAddModal = () => {
  editingSubscription.value = null;
  showFormModal.value = true;
};

const handleEdit = (sub) => {
  editingSubscription.value = sub;
  showFormModal.value = true;
};

const handleDelete = async (sub) => {
  if (!confirm(`Are you sure you want to delete ${sub.name}?`)) return;

  try {
    const { error } = await supabase
      .from('subscriptions')
      .delete()
      .eq('id', sub.id);
    
    if (error) throw error;
    
    // Refresh list
    if (subListRef.value) {
      subListRef.value.refresh();
    }
  } catch (error) {
    alert('Error deleting subscription: ' + error.message);
  }
};

const handleSuccess = () => {
  closeModal();
  // Refresh list
  if (subListRef.value) {
    subListRef.value.refresh();
  }
};

const closeModal = () => {
  showFormModal.value = false;
  editingSubscription.value = null;
};
</script>
