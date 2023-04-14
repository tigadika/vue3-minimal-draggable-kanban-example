<template>
  <div
    class="bg-slate-200 w-[350px] h-full p-3 rounded-lg border border-gray-300 shrink-0 flex flex-col justify-between space-y-3">
    <!-- board title section -->
    <div v-if="!titleIsEditing" @mouseenter="setBoardIsActive" @mouseleave="setBoardIsActive"
      class="flex flex-row justify-between items-center bg-transparent">
      <div class="flex flex-row items-center space-x-1">
        <p class="bg-transparent font-medium text-lg tracking-wide">{{ board.title }}</p>
        <v-icon v-show="boardIsActive" @click="setTitleIsEditing" name="hi-pencil-alt" scale="0.9"
          class="bg-transparent text-slate-400 hover:text-slate-500" />
      </div>
      <v-icon v-show="boardIsActive" @click="handleRemoveBoard" name="hi-solid-x-circle"
        class="text-slate-400 hover:text-red-400" />
    </div>
    <form @submit.prevent="handleChangeBoardTitle" v-if="titleIsEditing">
      <input @blur="handleChangeBoardTitle" v-model="title"
        class="w-full p-1 text-lg tracking-wide bg-transparent border-none" type="text" name="title">
    </form>
    <div ref="board" class="grow bg-transparent overflow-auto flex flex-col space-y-3">
      <!-- content board -->
      <KanbanItem v-for="content in board.items" :key="content.id" :content="content" :boardId="board.id" />
      <!-- end of content board -->
    </div>
    <div>
      <button @click="handleAddContentItem" class="rounded-lg hover:bg-slate-300 text-gray-600 p-1">
        <div class="flex flex-row space-x-1">
          <v-icon name="hi-plus-circle" />
          <p class="text-sm">Add Item</p>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useKanbanStore } from '../stores/useKanbanStore';
import KanbanItem from './KanbanItem.vue';

export default {
  name: 'KanbanBoard',
  data() {
    return {
      titleIsEditing: false,
      boardIsActive: false,
      title: this.board.title
    }
  },
  components: {
    KanbanItem
  },
  props: [
    'board'
  ],
  methods: {
    ...mapActions(
      useKanbanStore,
      [
        'removeBoardItem',
        'changeBoardTitle',
        'addContentItem',
        'moveContentItem'
      ]
    ),
    setBoardIsActive() {
      this.boardIsActive = !this.boardIsActive
    },
    setTitleIsEditing() {
      this.titleIsEditing = !this.titleIsEditing
    },
    handleRemoveBoard() {
      // console.log(this.board.id);
      this.removeBoardItem(this.board.id)
    },
    handleChangeBoardTitle() {
      this.changeBoardTitle(this.board.id, this.title)
      this.titleIsEditing = false
      this.boardIsActive = false
    },
    handleAddContentItem() {
      this.addContentItem(this.board.id)
    },
    enableDrop() {
      const board = this.$refs.board
      board.addEventListener('dragenter', this.handleDragEnter);
      board.addEventListener('dragover', this.handleDragOver);
      board.addEventListener('drop', this.handleDrop);
    },
    handleDragEnter(e) {
      if (e.dataTransfer.types.includes['text/x-item-card']) {
        e.preventDefault();
      }
    },
    handleDragOver(e) {
      e.dataTransfer.dropEffect = 'move';
      e.preventDefault();
    },
    handleDrop(e) {
      const data = e.dataTransfer.getData('text/x-item-card');
      this.moveContentItem(data, this.board.id)
    }
  },
  mounted() {
    this.enableDrop()
  }
}
</script>

<style lang="scss" scoped></style>