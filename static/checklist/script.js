let gChecklist = null
// Create Checklist, add it to session storage, and return it
function createChecklist(name) {
    const id = Date.now()
    const obj = {
        id: id,
        name: name,
        list: []
    }
    const strObj = JSON.stringify(obj)
    localStorage.setItem(id.toString(), strObj)
    return obj
}

const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('addItemBtn');
const checklist = document.getElementById('checklist');
const removeItemAllBtn = document.getElementById('removeItemAllBtn');
const menuTextInput = document.getElementById('menuInput')
const addChecklistBtn = document.getElementById('addChecklistBtn')
const menuList = document.getElementById('menuList')
const menuArea = document.getElementById('menu-area')
const checklistArea = document.getElementById('checklist-area')
const checklistHeader = document.getElementById('checklistHeader')
const backToMenuBtn = document.getElementById('backToMenuBtn')
function populateMenu(){
    for (const keyVal of Object.entries(localStorage)) {
        const obj = JSON.parse(keyVal[1])
        addMenuItemHTML(obj)
    }
}

function saveChecklist() {
    let eleList = checklist.querySelectorAll("li")
    const l = []
    for (const ele of eleList) {
        const name = ele.querySelector("span").textContent
        const checked = ele.querySelector("input:checked") != null
        l.push({ name: name, checked: checked })
    }
    gChecklist.list = l
    localStorage.setItem(gChecklist.id, JSON.stringify(gChecklist))
}

document.addEventListener("visibilitychange", function(event){
    if(document.hidden && checklistArea.classList.contains("d-none") == false && gChecklist != null) {
        saveChecklist()
    }
});

function renderChecklist() {
    const elements = gChecklist.list.map(f => createItemHTML(f.name, f.checked))
    checklist.replaceChildren(...elements)                
}

populateMenu();

// Creates the list item html and return it
function createItemHTML(itemText, isChecked) {

    // Create new list item
    const listItem = document.createElement('li');
    const itemTextSpan = document.createElement("span")
    itemTextSpan.appendChild(document.createTextNode(itemText))
    itemTextSpan.setAttribute("class", "item-text")
    listItem.appendChild(itemTextSpan)
    // We use the text span for clickability and the checkbox for state
    const checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox")
    checkbox.setAttribute("class", "complete-checkbox")
    listItem.appendChild(checkbox)
    
    return listItem;
}

// Function to add an item to the list
function addItem() {
    const itemText = itemInput.value.trim();
    if (itemText === "") {
        alert("Please enter an item.")
        return
    }
    const listItem = createItemHTML(itemText, false)
    // Append to checklist
    checklist.appendChild(listItem)

    // Clear the input field
    itemInput.value = ''
}

// Event listener for the "Add" button
addItemBtn.addEventListener('click', addItem);

// Event listener for 'Enter' key press in the input field
itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addItem();
    }
});

// Function to remove all checked items
removeItemAllBtn.addEventListener('click', function() {
    const items = checklist.querySelectorAll('input:checked');
    items.forEach(li => {
            li.parentElement.remove();
    });
});

backToMenuBtn.addEventListener('click', function(event){
    saveChecklist()
    menuArea.classList.remove("d-none")
    checklistArea.classList.add("d-none")
});

// Menu Section

// Event listener for the "Checklist Add" button
addChecklistBtn.addEventListener('click', addMenuItem);

// Event listener for 'Enter' key press in the input field
menuTextInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addMenuItem();
    }
});

function addMenuItemHTML(checklistObj) {

    // Create new list item
    const listItem = document.createElement('li');
    listItem.setAttribute("id", checklistObj.id.toString())
    const itemTextSpan = document.createElement("span")
    itemTextSpan.appendChild(document.createTextNode(checklistObj.name))
    itemTextSpan.setAttribute("class", "item-text")
    listItem.appendChild(itemTextSpan)
    // We use the text span for clickability and the checkbox for state
    const btn = document.createElement("button")
    btn.innerHTML = '&#x1F5D1;'
    btn.setAttribute("class", "delete-btn")
    listItem.appendChild(btn)
    
    // Append to checklist
    menuList.appendChild(listItem);

    // Delete checklist on double click
    btn.addEventListener('dblclick', function(event) {
        localStorage.removeItem(event.target.parentElement.id)
        menuList.removeChild(event.target.parentElement)
    });

    // Function to open checklist
    itemTextSpan.addEventListener('click', function(event){
        const id = event.target.parentElement.id
        gChecklist = JSON.parse(localStorage.getItem(id))

        checklistHeader.replaceChild(
            document.createTextNode(gChecklist.name),
            checklistHeader.firstChild)
        renderChecklist()
        menuArea.classList.add("d-none")
        checklistArea.classList.remove("d-none")
    });
    
}

// Function to add a new checklist
function addMenuItem() {
    const itemText = menuTextInput.value.trim();
    if (itemText === "") {
        alert("Please enter an item.");
        return;
    }
    const checklistObj = createChecklist(itemText)
    addMenuItemHTML(checklistObj)
    // Clear the input field
    menuTextInput.value = '';
}

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./serviceWorker.js')
        .then(registration => {
        }).catch(console.error)
}
