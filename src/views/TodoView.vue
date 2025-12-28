<template>
  <div class="h-full flex flex-col">
    <div class="flex-grow overflow-hidden">
      <TodoList
        :tasks="tasks"
        @toggle="toggleTask"
        @remove="removeTask"
        @update="updateTask"
        @search="handleSearch"
        @filter="handleFilter"
        @sort="handleSort"
        @open-modal="showModal = true"
      />
    </div>
    
    <Modal :show="showModal" :title="$t('todo.modalTitle')" @close="showModal = false">
      <TodoForm @add="addTask" />
    </Modal>
  </div>
</template>

<script setup>
import { useTasks } from '../composables/useTasks';
import TodoList from '../components/TodoList.vue';
import Modal from '../components/Modal.vue';
import TodoForm from '../components/TodoForm.vue';

const props = defineProps({
  session: Object
});

const {
  tasks,
  showModal,
  addTask,
  toggleTask,
  removeTask,
  updateTask,
  handleSearch,
  handleFilter,
  handleSort,
} = useTasks(props.session);
</script>
