const emptyNotice = document.getElementById('empty-notice');
const plusButton = document.getElementById('plus-button');

function toggleCreateTodoForm() {
    const createTodoForm = document.getElementById('todo-form');

    if (createTodoForm.style.display === 'block') {
        createTodoForm.style.display = 'none';
        visiblePlusImage()
    } else {
        createTodoForm.style.display = 'block';
        invisiblePlusImage()
    }
}

function reverseTodoList() {
    const todoContentList = document.getElementsByClassName('todo-text');
    let List = [];
    for (let i = 0; i < countTodo(); i++) {
        List.push(todoContentList[i].innerText)
    }
    for (let i = 0; i < countTodo(); i++) {
        document.getElementsByClassName('todo-text')[i].innerText = List[countTodo() - 1 - i];
    }
}

function createTodo() {
    const todoContentElement = document.getElementById('todo-content');
    todoContent = todoContentElement.value;
    if (todoContent === '') {
        window.alert("내용을 입력해주세요");
        return;
    }

    const todo = createTodoElement(todoContent);
    appendTodo(todo);

    if (!isTodoListEmpty()) {
        removeEmptyNotice();
    }

    clearTodoContent(todoContentElement);
    toggleCreateTodoForm()
    visiblePlusImage();


    function createTodoElement(todoContent) {
        const todo = document.createElement('div');
        todo.className = "todo";
        todo.innerHTML =
            `<div class='todo-text' style='display: block'>${todoContent}</div>
            <div class='button-group' style='display: block'>
                <img id="edit-button" src="image\\edit_todo_content_button_image.png" onclick="openTodoEditor(this)">
                <button class='delete-button' onclick='removeSchedule(this)'>x</button>
            </div>`;
        return todo;
    }

    function appendTodo(todo) {
        const todoContainer = document.getElementById("todo-container");
        todoContainer.appendChild(todo);
    }


    function removeEmptyNotice() {
        emptyNotice.style.display = 'none';
    }

}

function removeSchedule(deleteButton) {
    getGrandParent(deleteButton).remove();

    if (isTodoListEmpty()) {
        showEmptyNotice();
    }

    function showEmptyNotice() {
        emptyNotice.style.display = 'flex';
    }
}

function isTodoListEmpty() {
    return (document.querySelector('.todo') == null);
}


function invisiblePlusImage() {
    plusButton.style.display = 'none';
}

function visiblePlusImage() {
    plusButton.style.display = 'block';
}

function countTodo() {
    return document.getElementById('todo-container').childElementCount;
}

function openTodoEditor(editButton) {
    const editedTodo = getGrandParent(editButton)
    toggleTodo(editedTodo);

    const text = document.createElement('input');
    text.type = 'text';
    text.style.width = '50%';
    text.id = 'editing-content'
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';
    buttonGroup.id = 'todo-button-group';
    buttonGroup.innerHTML =
        `
        <input type='button' class="add-cancel-btn" value="수정" onclick='editTodo(this)'>
        <input type='button' class="add-cancel-btn" value="취소" onclick='cancelTodoEdit(this)'>
        `;
    editedTodo.appendChild(text);
    editedTodo.appendChild(buttonGroup);
}

function editTodo(editAdd) {
    const editedTodo = getGrandParent(editAdd);
    const editingTodoContent = editedTodo.querySelector("#editing-content");
    editingTodoContentValue = editingTodoContent.value;
    const editedText = editedTodo.querySelector(".todo-text");
    editedText.innerText = editingTodoContentValue;
    clearTodoContent(editingTodoContent);
    toggleTodo(editedTodo);
    removeTodoEditor(editedTodo);
}

function cancelTodoEdit(CancelEditBtn) {
    const editedTodo = getGrandParent(CancelEditBtn);
    toggleTodo(editedTodo);
    removeTodoEditor(editedTodo);
}

function toggleTodo(todo) { // style은 인라인된 것만 가져옴: getComputedStyle() 시도해보자..
    let children = todo.childNodes;
    for (const node of children) {
        if (node.className == 'todo-text' || node.className == 'button-group') {
            if (node.style.display === 'block') node.style.display = 'none';
            else node.style.display = 'block';
        }
    }
}

function clearTodoContent(todoContentElement) {
    todoContentElement.value = '';
}

function removeTodoEditor(editedTodo) {
    const editingTodoContent = editedTodo.querySelector("#editing-content");
    const buttonGroup = editedTodo.querySelector("#todo-button-group");
    editingTodoContent.remove();
    buttonGroup.remove();
}

function getGrandParent(object){
    return object.parentElement.parentElement;
}