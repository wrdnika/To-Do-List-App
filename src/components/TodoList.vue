<template>
  <div>
    <h2 class="text-2xl font-semibold text-white p-6 border-b border-white/10">Your Tasks</h2>
    <div v-if="tasks.length === 0" class="text-center text-white/50 p-8">
      <p class="mb-4">No tasks match your current filters.</p>
      <p class="text-sm">Try adjusting your search or filter settings, or add a new task!</p>
    </div>
    <TransitionGroup v-else name="list" tag="div" class="divide-y divide-white/10">
      <TodoItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="toggleTask"
        @remove="removeTask"
        @update="updateTask"
      />
    </TransitionGroup>
  </div>
</template>

<script setup>
import TodoItem from "./TodoItem.vue";

const props = defineProps(["tasks"]);
const emit = defineEmits(["toggle", "remove", "update"]);

const updateTask = (updatedTask) => {
  emit("update", updatedTask);
};

const toggleTask = (id) => emit("toggle", id);
const removeTask = (id) => emit("remove", id);
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
