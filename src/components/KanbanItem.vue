<template>
  <div @mouseenter="setItemIsActive" @mouseleave="setItemIsActive" ref="itemCard"
    class="bg-white border border-gray-300 p-2 rounded-lg flex flex-col space-y-2 hover:cursor-grab active:cursor-grabbing">
    <div class="flex flex-row justify-between items-center text-xs">
      <p class="bg-transparent tracking-tight text-gray-700">{{ content.name }}</p>
      <v-icon @click="handleRemoveContentItem(content.id)" v-show="itemIsActive" name="hi-solid-x-circle"
        class="text-slate-400 hover:text-red-400" scale="0.8" />
    </div>
    <p class="bg-transparent tracking-tight text-sm text-gray-700">{{ content.content }}</p>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useKanbanStore } from '../stores/useKanbanStore';

export default {
  name: 'KanbanItem',
  data() {
    return {
      itemIsActive: false,
    }
  },
  props: [
    'content',
    'boardId'
  ],
  methods: {
    ...mapActions(
      useKanbanStore,
      [
        'removeContentItem'
      ]
    ),
    setItemIsActive() {
      this.itemIsActive = !this.itemIsActive
    },
    handleRemoveContentItem(itemId) {
      this.removeContentItem(this.boardId, itemId)
      this.itemIsActive = false
    },
    setDraggable() {
      const itemCard = this.$refs.itemCard
      itemCard.draggable = true
      itemCard.addEventListener('dragstart', this.handleDragStart);
      itemCard.addEventListener('dragend', this.handleDragEnd);
    },
    handleDragStart(e) {
      // dataTransfer to kanban board
      const dataTransfer = e.dataTransfer
      const stringData = JSON.stringify({ content: this.content, boardFromId: this.boardId })
      dataTransfer.setData('text/x-item-card', stringData)
      dataTransfer.effectAllowed = 'move'
      e.target.style.opacity = 0.3

      //dataTransfer to sort index
      let index = [...e.target.parentElement.children].indexOf(e.target)
      console.log(index);
      e.dataTransfer.setData('text/plain', index)
    },
    handleDragEnd(e) {
      e.target.style.opacity = 1
    },
  },
  mounted() {
    this.setDraggable()
  }
}
</script>

<style></style>