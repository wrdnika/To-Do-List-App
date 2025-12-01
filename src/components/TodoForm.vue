<template>
  <form @submit.prevent="addTask" class="space-y-4">
    <div class="relative">
      <input
        v-model="newTask"
        type="text"
        placeholder="What needs to be done?"
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
          <option value="High" class="bg-gray-800">High Priority</option>
          <option value="Medium" class="bg-gray-800">Medium Priority</option>
          <option value="Low" class="bg-gray-800">Low Priority</option>
        </select>
        <ChevronDown
          ref="dropdownIcon"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5 transition-transform duration-300"
          @click="toggleDropdown"
          :class="{ 'rotate-180': isDropdownOpen }"
        />
      </div>
    </div>
    <div class="relative">
      <input
        v-model="categories"
        type="text"
        placeholder="Categories (comma-separated)"
        class="w-full p-3 bg-white/10 border border-white/20 text-white rounded-xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
      />
    </div>
    <div class="relative">
      <textarea
        v-model="notes"
        placeholder="Notes"
        class="w-full p-3 bg-white/10 border border-white/20 text-white rounded-xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
      ></textarea>
    </div>
    <button
      type="submit"
      class="w-full p-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold uppercase tracking-wider hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
    >
      <PlusIcon class="w-5 h-5" />
      Add Task
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { PlusIcon, CalendarIcon, ChevronDown } from "lucide-vue-next";

const newTask = ref("");
const deadline = ref("");
const priority = ref("Medium");
const categories = ref("");
const notes = ref("");
const isDropdownOpen = ref(false);
const dropdownIcon = ref(null);
const emit = defineEmits(["add"]);

const addTask = () => {
  if (newTask.value.trim() !== "" && deadline.value !== "") {
    emit("add", {
      text: newTask.value,
      deadline: deadline.value,
      priority: priority.value,
      categories: categories.value.split(",").map((c) => c.trim()),
      notes: notes.value,
    });
    newTask.value = "";
    deadline.value = "";
    priority.value = "Medium";
    categories.value = "";
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
