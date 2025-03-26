<template>
  <div
    class="p-5 bg-white/10 border-b border-white/10 last:border-b-0 transition-all duration-300 hover:bg-white/15"
  >
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-3">
        <button
          @click="toggleComplete"
          class="text-white/50 hover:text-cyan-400 transition-colors"
        >
          <CheckCircle
            :class="task.completed ? 'text-cyan-400' : 'text-white/50'"
            class="w-6 h-6"
          />
        </button>
        <span
          :class="{
            'line-through text-white/50': task.completed,
            'text-white': !task.completed,
          }"
          class="text-base font-light"
        >
          {{ task.text }}
        </span>
      </div>

      <div class="flex items-center space-x-2">
        <span
          :class="priorityColorClass(task.priority)"
          class="text-xs font-medium px-2 py-1 rounded-full"
        >
          {{ task.priority }}
        </span>
        <span class="text-white/50 text-xs">
          {{ formatDeadline(task.deadline) }}
        </span>
      </div>
    </div>

    <div class="flex justify-end space-x-2 mt-3">
      <button
        @click="editTask"
        class="text-white/70 hover:text-cyan-400 transition-colors flex items-center space-x-1"
      >
        <Edit2 class="w-4 h-4" />
        <span class="text-xs">Edit</span>
      </button>
      <button
        @click="removeTask"
        class="text-white/70 hover:text-red-400 transition-colors flex items-center space-x-1"
      >
        <Trash2 class="w-4 h-4" />
        <span class="text-xs">Delete</span>
      </button>
    </div>

    <!-- Edit Modal -->
    <teleport to="body">
      <div
        v-if="editing"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      >
        <div
          class="bg-white/20 backdrop-blur-lg border border-white/20 rounded-2xl p-6 w-full max-w-md shadow-2xl"
        >
          <h2 class="text-xl text-white mb-4 font-light">Edit Task</h2>
          <div class="space-y-4">
            <input
              v-model="editText"
              class="w-full p-3 bg-white/10 border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Task name"
            />
            <input
              type="date"
              v-model="editDeadline"
              class="w-full p-3 bg-white/10 border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <select
              v-model="editPriority"
              class="w-full p-3 bg-white/10 border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="High" class="bg-gray-800">High</option>
              <option value="Medium" class="bg-gray-800">Medium</option>
              <option value="Low" class="bg-gray-800">Low</option>
            </select>
          </div>
          <div class="flex justify-end space-x-2 mt-6">
            <button
              @click="saveEdit"
              class="bg-cyan-500 text-white px-4 py-2 rounded-xl hover:bg-cyan-600 transition-colors"
            >
              Save
            </button>
            <button
              @click="editing = false"
              class="bg-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/30 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { CheckCircle, Edit2, Trash2 } from "lucide-vue-next";

const props = defineProps(["task"]);
const emit = defineEmits(["toggle", "remove", "update"]);

const editing = ref(false);
const editText = ref(props.task.text);
const editDeadline = ref(props.task.deadline);
const editPriority = ref(props.task.priority);

const toggleComplete = () => emit("toggle", props.task.id);
const removeTask = () => emit("remove", props.task.id);

const editTask = () => {
  editText.value = props.task.text;
  editDeadline.value = props.task.deadline;
  editPriority.value = props.task.priority;
  editing.value = true;
};

const saveEdit = () => {
  emit("update", {
    ...props.task,
    text: editText.value,
    deadline: editDeadline.value,
    priority: editPriority.value,
  });
  editing.value = false;
};

const priorityColorClass = (priority) => {
  return priority === "High"
    ? "bg-red-500/20 text-red-400"
    : priority === "Medium"
    ? "bg-yellow-500/20 text-yellow-400"
    : "bg-green-500/20 text-green-400";
};

const formatDeadline = (deadline) => {
  return new Date(deadline).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>
