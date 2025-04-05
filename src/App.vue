<template>
  <div class="flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <header class="mb-8 text-center">
        <h1
          class="text-4xl font-extralight text-white tracking-wide flex items-center justify-center gap-3"
        >
          <img
            src="/wrdnika-white.png"
            alt="Logo"
            class="w-10 h-10 object-contain rounded-xl"
          />
          Wrdnika
        </h1>
        <p class="text-gray-400 mt-2">Todo List App</p>
      </header>

      <div
        class="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
      >
        <TodoForm @add="addTask" />
        <div class="border-t border-white/20">
          <TodoList
            :tasks="tasks"
            @toggle="toggleTask"
            @remove="removeTask"
            @update="updateTask"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { ClipboardList } from "lucide-vue-next";
import TodoForm from "./components/TodoForm.vue";
import TodoList from "./components/TodoList.vue";

const tasks = ref([
  {
    id: 1,
    text: "Design new project",
    completed: false,
    priority: "High",
    deadline: "2025-04-01",
    reminder: true,
  },
]);

const addTask = ({ text, deadline, priority }) => {
  tasks.value.push({
    id: Date.now(),
    text,
    completed: false,
    deadline,
    priority,
    reminder: true,
  });
};

const toggleTask = (id) => {
  const task = tasks.value.find((t) => t.id === id);
  if (task) task.completed = !task.completed;
};

const removeTask = (id) => {
  tasks.value = tasks.value.filter((t) => t.id !== id);
};

const updateTask = (updatedTask) => {
  const index = tasks.value.findIndex((t) => t.id === updatedTask.id);
  if (index !== -1) tasks.value[index] = updatedTask;
};

let reminderInterval;

const checkReminders = () => {
  tasks.value.forEach((task) => {
    if (task.reminder && new Date(task.deadline) <= new Date()) {
      console.log(`Reminder: ${task.text} is due!`);
    }
  });
};

onMounted(() => {
  reminderInterval = setInterval(checkReminders, 60000);
});

onUnmounted(() => {
  clearInterval(reminderInterval);
});
</script>
