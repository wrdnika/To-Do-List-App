<template>
  <form @submit.prevent="addTask" class="space-y-4">
    <div class="relative">
      <input
        v-model="newTask"
        type="text"
        :placeholder="$t('todo.form.placeholder')"
        class="w-full p-3 bg-white/10 border border-white/20 text-white rounded-xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
        required
      />
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="relative">
        <input
          v-model="deadline"
          type="date"
          class="w-full p-3 bg-white/10 border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
          required
        />
      </div>
      <div class="relative">
        <select
          v-model="priority"
          class="w-full p-3 bg-white/10 border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 appearance-none pr-10"
        >
          <option value="High" class="bg-gray-800">{{ $t('todo.form.priorityHigh') }}</option>
          <option value="Medium" class="bg-gray-800">{{ $t('todo.form.priorityMedium') }}</option>
          <option value="Low" class="bg-gray-800">{{ $t('todo.form.priorityLow') }}</option>
        </select>
        <ChevronDown
          ref="dropdownIcon"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5 transition-transform duration-300"
          @click="toggleDropdown"
          :class="{ 'rotate-180': isDropdownOpen }"
        />
      </div>
    </div>
    <div class="relative flex gap-2">
      <div class="relative flex-grow">
        <select
          v-model="selectedCategoryId"
          class="w-full p-3 bg-white/10 border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 appearance-none pointer-events-auto"
        >
          <option value="" disabled class="bg-gray-800">{{ $t('todo.form.categories') }}</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id" class="bg-gray-800">
            {{ cat.name }}
          </option>
        </select>
         <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5 pointer-events-none" />
      </div>
      <button 
        type="button"
        @click="isCreatingCategory = !isCreatingCategory"
        class="p-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-colors"
        title="Add New Category"
      >
        <PlusIcon class="w-5 h-5" />
      </button>
    </div>

    <!-- Create Category Mini-Form -->
    <div v-if="isCreatingCategory" class="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3">
      <h3 class="text-sm font-medium text-white/80">New Category</h3>
      <div class="flex gap-2">
        <input 
          v-model="newCategoryName"
          type="text"
          placeholder="Category Name"
          class="flex-grow p-2 bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
        />
        <input 
          v-model="newCategoryColor"
          type="color"
          class="w-10 h-10 p-1 bg-white/10 border border-white/20 rounded-lg cursor-pointer"
          title="Category Color"
        />
        <button 
          type="button"
          @click="handleCreateCategory"
          class="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Save
        </button>
      </div>
    </div>

    <div class="relative">
      <textarea
        v-model="notes"
        :placeholder="$t('todo.form.notes')"
        class="w-full p-3 bg-white/10 border border-white/20 text-white rounded-xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
      ></textarea>
    </div>
    <button
      type="submit"
      class="w-full p-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold uppercase tracking-wider hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
    >
      <PlusIcon class="w-5 h-5" />
      {{ $t('todo.form.add') }}
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { PlusIcon, CalendarIcon, ChevronDown } from "lucide-vue-next";

const props = defineProps({
  categories: Array,
  addCategory: Function
});

const newTask = ref("");
const deadline = ref("");
const priority = ref("Medium");
const selectedCategoryId = ref("");
const notes = ref("");
const isDropdownOpen = ref(false);
const isCreatingCategory = ref(false);
const newCategoryName = ref("");
const newCategoryColor = ref("#3b82f6"); // Default blue

const dropdownIcon = ref(null);
const emit = defineEmits(["add"]);

const handleCreateCategory = async () => {
  if (newCategoryName.value.trim() && props.addCategory) {
    const newCat = await props.addCategory(newCategoryName.value, newCategoryColor.value);
    if (newCat) {
      selectedCategoryId.value = newCat.id; // Auto-select new category
      isCreatingCategory.value = false;
      newCategoryName.value = "";
      newCategoryColor.value = "#3b82f6";
    }
  }
};

const addTask = () => {
  if (newTask.value.trim() !== "" && deadline.value !== "") {
    emit("add", {
      text: newTask.value,
      deadline: deadline.value,
      priority: priority.value,
      category_id: selectedCategoryId.value || null, // Emit category_id
      notes: notes.value,
    });
    newTask.value = "";
    deadline.value = "";
    priority.value = "Medium";
    selectedCategoryId.value = "";
    notes.value = "";
  }
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
</script>

<style click>
select:focus + svg {
  transform: rotate(180deg) translateY(50%);
}
</style>
