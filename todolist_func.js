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

function reverseTodoList(){
    const todoContentList=document.getElementsByClassName('todo-text');
    let List=[];
    for(let i=0;i<countTodo();i++){
        List.push(todoContentList[i].innerText)
    }
    for(let i=0;i<countTodo();i++){
        document.getElementsByClassName('todo-text')[i].innerText=List[countTodo()-1-i];
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
            `<div class='todo-text' style='visibility: visible'>${todoContent}</div>
            <div class='button-group' style='visibility: visible'>
                <img id="edit-button" src="image\\edit_todo_content_button_image.png" onclick="openTodoEditor(this)">
                <button class='delete-button' onclick='removeSchedule(this)'>x</button>
            </div>`;
        return todo;
    }

    function appendTodo(todo) {
        const todoContainer = document.getElementById("todo-container");
        todoContainer.appendChild(todo);
    }

    function clearTodoContent(todoContentElement) {
        todoContentElement.value = '';
    }

    function removeEmptyNotice() {
        emptyNotice.style.display = 'none';
    }

}

function removeSchedule(deleteButton) {
    deleteButton.parentElement.parentElement.remove();

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

function countTodo(){ 
    return document.getElementById('todo-container').childElementCount;
}

function openTodoEditor(editButton){
    toggleTodo(editButton.parentElement.parentElement);
}

function toggleTodo(todo){ // style은 인라인된 것만 가져옴: getComputedStyle() 시도해보자..
    let children=todo.childNodes;
    console.log(children);
    for(const node of children){
        if(node.className=='todo-text'||node.className=='button-group'){
            if(node.style.visibility=="visible"){
                console.log('yes');
                node.style.visibility='hidden';
            } else{
                console.log('no');
                node.style.visibility='visible';
            }
        }
    }
}