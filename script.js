let formElements = [
  {
    id: 'c0ac49c5-871e-4c72-a878-251de465e6b4',
    type: 'input',
    label: 'Sample Input',
    placeholder: 'Sample placeholder',
  },
  {
    id: '146e69c2-1630-4a27-9d0b-f09e463a66e4',
    type: 'select',
    label: 'Sample Select',
    options: ['Option 1', 'Option 2'],
  },
  {
    id: '45002ecf-85cf-4852-bc46-529f94a758f5',
    type: 'textarea',
    label: 'Sample Textarea',
    placeholder: 'Enter text here',
  },
  {
    id: '680cff8d-c7f9-40be-8767-e3d6ba420952',
    type: 'checkbox',
    label: 'Sample Checkbox',
  },
]

// Function to Render the Form Based on JSON
function renderForm() {
  let form = document.getElementById('form-preview')
  form.innerHTML = ''

  if (formElements.length === 0) {
    form.style.display = 'none'
  } else {
    form.style.display = 'block'
  }

  formElements.forEach((element, index) => {
    createElement(element, index)
  })
}

// Function to Create and Render Form Elements from JSON
function createElement(elementData, index) {
  let form = document.getElementById('form-preview')

  let div = document.createElement('div')
  div.className = 'form-group'
  div.setAttribute('data-id', elementData.id)
  div.setAttribute('draggable', true) // Enable Dragging
  div.ondragstart = (event) => dragStart(event, index)
  div.ondragover = (event) => event.preventDefault()
  div.ondrop = (event) => dropElement(event, index)

  let label = document.createElement('label')
  label.innerText = elementData.label

  let field
  if (elementData.type === 'input') {
    field = document.createElement('input')
    field.placeholder = elementData.placeholder
  } else if (elementData.type === 'select') {
    field = document.createElement('select')
    elementData.options.forEach((opt) => {
      let option = document.createElement('option')
      option.innerText = opt
      field.appendChild(option)
    })
  } else if (elementData.type === 'textarea') {
    field = document.createElement('textarea')
    field.placeholder = elementData.placeholder
  } else if (elementData.type === 'checkbox') {
    field = document.createElement('input')
    field.type = 'checkbox'
  }

  let deleteBtn = document.createElement('button')
  deleteBtn.innerHTML = '🗑'
  deleteBtn.className = 'delete-btn'
  deleteBtn.onclick = () => deleteElement(elementData.id)

  div.appendChild(label)
  div.appendChild(field)
  div.appendChild(deleteBtn)
  form.appendChild(div)
}

// Function to Add Only the Selected Type to JSON and Re-Render
function addElement(type) {
  let newElement = {
    id: crypto.randomUUID(),
    type: type,
    label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
    placeholder:
      type === 'textarea' || type === 'input' ? 'Enter text' : undefined,
    options: type === 'select' ? ['Option 1'] : undefined,
  }

  formElements.push(newElement)
  renderForm()
}

// Function to Delete Elements from JSON and Re-Render
function deleteElement(id) {
  formElements = formElements.filter((element) => element.id !== id)
  renderForm()
}

// Drag and Drop Handlers
let draggedIndex = null

function dragStart(event, index) {
  draggedIndex = index
  event.dataTransfer.setData('text/plain', index) // Store dragged element index
}

function dropElement(event, targetIndex) {
  event.preventDefault()

  if (draggedIndex !== null && draggedIndex !== targetIndex) {
    let draggedItem = formElements.splice(draggedIndex, 1)[0] // Remove dragged item from JSON
    formElements.splice(targetIndex, 0, draggedItem) // Insert at the new position

    renderForm() // Re-render the form with updated order
  }
}

// ***
// Function to Toggle Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode')

  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled')
  } else {
    localStorage.setItem('darkMode', 'disabled')
  }
}

// Function to Load Dark Mode Preference on Page Load
// Function to Toggle Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode')

  // Update localStorage to remember the preference
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled')
  } else {
    localStorage.setItem('darkMode', 'disabled')
  }
}

// Function to Load Dark Mode Preference on Page Load
function loadDarkMode() {
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode')
  }
}

// Ensure Dark Mode is Applied on Page Load and Button is Functional
document.addEventListener('DOMContentLoaded', () => {
  loadDarkMode()

  // Ensure the button exists before adding event listener
  const darkModeBtn = document.getElementById('dark-mode-btn')
  if (darkModeBtn) {
    darkModeBtn.addEventListener('click', toggleDarkMode)
  }
})

// Load Dark Mode when the Page Loads
document.addEventListener('DOMContentLoaded', loadDarkMode)

// Initialize Form Rendering (Empty on Load)
document.getElementById('form-preview').style.display = 'none'
renderForm()
