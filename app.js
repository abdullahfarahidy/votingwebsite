const draggables = document.querySelectorAll('.draggable')
const empties = document.querySelectorAll('.empty')

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

empties.forEach(empty => {
  empty.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(empty, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      empty.appendChild(draggable)
    } else {
      empty.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(empty, y) {
  const draggableElements = [...empty.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}

