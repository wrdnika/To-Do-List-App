<template>
  <div class="h-full flex flex-col">
    <!-- Summary Header -->
    <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
      <h2 class="text-sm font-medium text-white/70 uppercase tracking-widest mb-1">Total Monthly Expense</h2>
      <div class="flex items-baseline gap-2">
        <span class="text-4xl font-bold text-white tracking-tight">
          {{ formatPrice(totalMonthlyExpense) }}
        </span>
        <span class="text-white/50 text-sm">/ month</span>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex-grow flex items-center justify-center">
      <Loader2 class="w-10 h-10 text-cyan-400 animate-spin" />
    </div>

    <!-- Empty State -->
    <div v-else-if="subscriptions.length === 0" class="flex-grow flex flex-col items-center justify-center text-white/50">
      <CreditCard class="w-16 h-16 mb-4 opacity-50" />
      <p class="text-lg">No active subscriptions found.</p>
    </div>

    <!-- Subscription Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pb-20 custom-scrollbar pr-2">
      <div
        v-for="sub in subscriptions"
        :key="sub.id"
        class="group relative bg-gray-900/40 backdrop-blur-sm border border-white/10 hover:border-cyan-500/50 rounded-2xl p-4 transition-all duration-300 hover:bg-gray-800/60 transition-colors"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <SubscriptionLogo :name="sub.name" size="md" />
            <div>
              <h3 class="font-bold text-white text-lg leading-tight">{{ sub.name }}</h3>
              <span class="text-xs text-cyan-400 font-medium px-2 py-0.5 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                {{ sub.categories?.name || 'Uncategorized' }}
              </span>
            </div>
          </div>
          <div class="text-right">
            <p class="font-bold text-white">{{ formatPrice(sub.price) }}</p>
            <p class="text-xs text-white/50 capitalize">{{ sub.cycle }}</p>
          </div>
        </div>

        <div class="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
          <div class="flex items-center gap-1.5 text-white/60">
            <Calendar class="w-3.5 h-3.5" />
            <span>Next: {{ formatDate(sub.next_payment_date || sub.first_payment_date) }}</span>
          </div>
          
          <div class="flex items-center gap-3">
            <!-- Card Actions (Visible on hover) -->
            <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button 
                @click.stop="$emit('edit', sub)" 
                class="text-white/40 hover:text-cyan-400 transition-colors"
                title="Edit"
              >
                <Edit2 class="w-3.5 h-3.5" />
              </button>
              <button 
                @click.stop="$emit('delete', sub)" 
                class="text-white/40 hover:text-red-400 transition-colors"
                title="Delete"
              >
                <Trash2 class="w-3.5 h-3.5" />
              </button>
            </div>

            <!-- Status -->
            <div v-if="sub.status === 'active'" class="flex items-center gap-1.5 text-green-400">
              <div class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span>Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { supabase } from '../supabase';
import { Loader2, Calendar, CreditCard, Edit2, Trash2 } from 'lucide-vue-next';
import SubscriptionLogo from './SubscriptionLogo.vue';

const props = defineProps({
  session: Object
});

const emit = defineEmits(['edit', 'delete']);

const subscriptions = ref([]);
const loading = ref(true);

const fetchSubscriptions = async () => {
  if (!props.session) return;
  
  loading.value = true;
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select(`
        *,
        categories (name, color)
      `)
      .eq('user_id', props.session.user.id)
      .eq('status', 'active') // Only showing active ones for now
      .order('price', { ascending: false });

    if (error) throw error;
    subscriptions.value = data || [];
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
  } finally {
    loading.value = false;
  }
};

const totalMonthlyExpense = computed(() => {
  return subscriptions.value.reduce((total, sub) => {
    let price = Number(sub.price);
    if (sub.cycle === 'yearly') price = price / 12;
    if (sub.cycle === 'weekly') price = price * 4;
    return total + price;
  }, 0);
});

const formatPrice = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

onMounted(() => {
  fetchSubscriptions();
});

defineExpose({
  refresh: fetchSubscriptions
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}
</style>
