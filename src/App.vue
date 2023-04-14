<template>
  <div class="flex flex-col h-screen py-5">
    <div class="px-20 py-2 text-2xl tracking-tight">tigadika's kanban</div>
    <div class="px-20 flex flex-row flex-nowrap overflow-auto space-x-3 grow py-3">
      <!-- kanban board -->
      <KanbanBoard v-for="board in boardItems" :key="board.id" :board="board" />
      <!-- end of kanban board -->
      <button @click="handleAddBoard()"
        class="w-fit h-fit p-3 bg-slate-200 border border-gray-300 rounded-lg hover:bg-slate-300">
        <v-icon name="hi-plus-sm" class="bg-transparent" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';

import { useKanbanStore } from '@/stores/useKanbanStore';
import KanbanBoard from './components/KanbanBoard.vue'

export default {
  data() {
    return {}
  },
  components: {
    KanbanBoard,
  },
  computed: {
    ...mapState(useKanbanStore, ['boardItems'])
  },
  methods: {
    ...mapActions(useKanbanStore, ['addBoardItem']),
    handleAddBoard() {
      this.addBoardItem()
    }
  }
}
</script>

<style lang="scss" scoped></style>