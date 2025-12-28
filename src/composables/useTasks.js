// src/composables/useTasks.js
import { ref, computed, watchEffect } from 'vue';
import { supabase } from '../supabase';

export function useTasks(session) {
  const tasks = ref([]);
  const showModal = ref(false);
  const searchQuery = ref('');
  const filterCriteria = ref({
    status: 'all',
    priority: 'all',
    category: '',
    date: '',
  });
  const sortBy = ref('deadline');

  const fetchTasks = async () => {
    if (!session.value?.user) {
      tasks.value = [];
      return;
    }
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', session.value.user.id)
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching tasks:', error);
    else tasks.value = data;
  };

  watchEffect(() => {
    fetchTasks();
  });

  const addTask = async ({ text, deadline, priority, categories, notes }) => {
    const newTask = {
      user_id: session.value.user.id,
      text,
      completed: false,
      deadline,
      priority,
      reminder: true,
      categories,
      notes,
    };

    const { data, error } = await supabase
      .from('todos')
      .insert([newTask])
      .select();

    if (error) {
      console.error('Error adding task:', error);
    } else {
      if (data && data.length > 0) {
        tasks.value.unshift(data[0]);
      }
      showModal.value = false;
    }
  };

  const toggleTask = async (id) => {
    const taskIndex = tasks.value.findIndex((t) => t.id === id);
    if (taskIndex === -1) return;

    const newStatus = !tasks.value[taskIndex].completed;
    tasks.value[taskIndex].completed = newStatus;

    const { error } = await supabase
      .from('todos')
      .update({ completed: newStatus })
      .eq('id', id);

    if (error) {
      console.error('Error toggling task:', error);
      tasks.value[taskIndex].completed = !newStatus;
    }
  };

  const removeTask = async (id) => {
    const previousTasks = [...tasks.value];
    tasks.value = tasks.value.filter((t) => t.id !== id);

    const { error } = await supabase.from('todos').delete().eq('id', id);

    if (error) {
      console.error('Error removing task:', error);
      tasks.value = previousTasks;
    }
  };

  const updateTask = async (updatedTask) => {
    const index = tasks.value.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      const oldTask = { ...tasks.value[index] };
      tasks.value[index] = updatedTask;

      const { error } = await supabase
        .from('todos')
        .update({
          text: updatedTask.text,
          deadline: updatedTask.deadline,
          priority: updatedTask.priority,
          categories: updatedTask.categories,
          notes: updatedTask.notes,
        })
        .eq('id', updatedTask.id);

      if (error) {
        console.error('Error updating task:', error);
        tasks.value[index] = oldTask;
      }
    }
  };

  const handleSearch = (query) => {
    searchQuery.value = query;
  };

  const handleFilter = (filters) => {
    filterCriteria.value = filters;
  };

  const handleSort = (criteria) => {
    sortBy.value = criteria;
  };

  const filteredTasks = computed(() => {
    let filtered = [...tasks.value];

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      filtered = filtered.filter((task) =>
        task.text.toLowerCase().includes(query)
      );
    }

    filtered = filtered.filter((task) => {
      const statusMatch =
        filterCriteria.value.status === 'all'
          ? true
          : filterCriteria.value.status === 'completed'
          ? task.completed
          : !task.completed;
      const priorityMatch =
        filterCriteria.value.priority === 'all'
          ? true
          : task.priority === filterCriteria.value.priority;
      const categoryMatch = filterCriteria.value.category
        ? task.categories.some((cat) =>
            cat.toLowerCase().includes(filterCriteria.value.category.toLowerCase())
          )
        : true;
      const dateMatch = filterCriteria.value.date
        ? task.deadline === filterCriteria.value.date
        : true;
      return statusMatch && priorityMatch && categoryMatch && dateMatch;
    });

    let sorted = [...filtered];
    if (sortBy.value === 'deadline') {
      sorted.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (sortBy.value === 'priority') {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sortBy.value === 'createdDate') {
      sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    return sorted;
  });

  return {
    tasks,
    showModal,
    searchQuery,
    filterCriteria,
    sortBy,
    addTask,
    toggleTask,
    removeTask,
    updateTask,
    handleSearch,
    handleFilter,
    handleSort,
    filteredTasks,
  };
}
