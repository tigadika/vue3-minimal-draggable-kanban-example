import { defineStore } from 'pinia'

export const useKanbanStore = defineStore('kanban', {
  state: () => ({
    boardItems: [
      {
        id: 1,
        title: 'ToDo',
        items: [
          {
            id: 1,
            name: 'This is content title',
            content: 'This is the content'
          }
        ]
      },
      {
        id: 2,
        title: 'In Progress',
        items: []
      },
      {
        id: 3,
        title: 'Done',
        items: []
      }
    ]
  }),
  getters: {},
  actions: {
    addBoardItem() {
      const newBoard = {
        id: this.boardItems.length > 0 ?
          this.boardItems[this.boardItems.length - 1].id + 1 :
          1,
        title: 'New Board',
        items: []
      }
      this.boardItems.push(newBoard)
    },
    removeBoardItem(id) {
      this.boardItems = this.boardItems.filter((el) => el.id !== id)
    },
    changeBoardTitle(id, title) {
      const newBoard = this.boardItems.find((el) => el.id === id)
      newBoard.title = title
    },
    addContentItem(boardId, content) {
      const thatBoard = this.boardItems.find((el) => el.id === boardId)
      const newContent = {
        id: thatBoard.items.length > 0 ?
          thatBoard.items[thatBoard.items.length - 1].id + 1 :
          1,
        name: content ? content.name : 'New Content',
        content: content ? content.content : 'a new content'
      }
      thatBoard.items.push(newContent)
    },
    removeContentItem(boardId, itemId) {
      let thatBoard = this.boardItems.find((el) => el.id === boardId)
      thatBoard.items = thatBoard.items.filter((el) => el.id !== itemId)
    },
    moveContentItem(data, boardTargetId) {
      const dataFromDrag = JSON.parse(data)
      this.removeContentItem(dataFromDrag.boardFromId, dataFromDrag.content?.id)
      this.addContentItem(boardTargetId, dataFromDrag.content)
    }
  }
})