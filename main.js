//Here I store every string. let and const crashes my script and I dont know why
//Which is why I am declaring my variables with var instead.
var todoArray = [];
var completedTodos = 0;

// I only have one <form> in my html so i can use it as my selector
//add eventlistener to look for click on check and/or delete button
document.querySelector('form').addEventListener("submit", handleSubmitForm);
document.querySelector('ul').addEventListener('click', handleClickDeleteOrCheck);
document.getElementById('clearAll').addEventListener('click', handleClearAll);




/*
Calling preventDefault() because I don't want the page to
reload at every submisson. Here i add alert if user tries passing null.
*/
function handleSubmitForm(e) {
    e.preventDefault();
    let input = document.querySelector('input');
    if (input.value != '') {
        addTodo(input.value);
        todoArray.push(input.value);
        input.value = ''; // Clear the input field
    }
    else {
        window.alert("You need to write something!")
        input.value = ''
    }
}

// I use .name since I have already declared button names
function handleClickDeleteOrCheck(e) {
    if (e.target.name == 'checkButton')
        checkTodo(e);

    if (e.target.name == 'deleteButton')
        deleteTodo(e);
}

//Here i added a simple clear all button that empties the 'ul'
function handleClearAll(e) {
    document.querySelector('ul').innerHTML = ''
}

function addTodo(todo) {

    let ul = document.querySelector('ul'); //my complete list
    let li = document.createElement('li'); //create item on the list

//Add span check and delete icon buttons to every todo-item
//Add class todo-list-item to every item and append to li

    li.innerHTML = `
        <span class="todo-item">${todo}</span>
        <button name="checkButton"><i class="fas fa-check-square"></i></button>
        <button name="deleteButton"><i class="fas fa-trash"></i></button>
    `;
    li.classList.add('todo-list-item');
    ul.appendChild(li);
}

/*
Here i need to check if the item im targeting is already checked by checking for
the 'line-through' property. If 'line-through' is found I set text-decoration to
'none' which will effectively uncheck it and if 'line-through' is not found it
will be added and become checked. 

I also piggyback on this function and use it to increase or decrease my
completedTodos variable. I call the updateCompletedTodosCount function to update
the display of the counter.
*/

function checkTodo(e) {
    let item = e.target.parentNode; 
    if (item.style.textDecoration == 'line-through'){
        item.style.textDecoration = 'none';
        completedTodos --;
    }
    else{
        item.style.textDecoration ='line-through';
        completedTodos ++;
    }
    updateCompletedTodosCount();
}

// Function to update and display completed todos count
function updateCompletedTodosCount() {
    let completedTodosCount = document.getElementById('completedTodosCount');
    completedTodosCount.innerHTML = `<i class="fas fa-check-circle"></i> Tasks Completed :  ${completedTodos}`;
}

// Call this function to initialize the display
updateCompletedTodosCount();


/*
The logic on this funtion is very similar to checkTodo(), but i just pass
item.remove() instead to remove the todo item.

I get the text content of the todo item and then find the index based on the
text content and finally remove the item from the todoArray
*/

function deleteTodo(e) {
    let item = e.target.parentNode;
    let todoText = item.querySelector('.todo-item').textContent;
    var index = todoArray.indexOf(todoText); 
    if (index !== -1) {
        todoArray.splice(index, 1);
    }
    item.remove();
}

/*
If this project were to be used in a real life setting I would implement
localStorage so that the data isnt wiped every refresh
*/
