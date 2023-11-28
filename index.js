let todos = [
   
]


function generateUniqueId() {
    const timestamp = new Date().getTime().toString(16); // Convert timestamp to hexadecimal
    const randomPart = Math.random().toString(16).substr(2, 8); // Random component

    return `${timestamp}-${randomPart}`;
}



function getFormData(e){
    e.preventDefault();

    const formData = document.getElementById("inputForm");


    let todo = formData.elements["todo"].value;
  
    if(todo){

        let id = generateUniqueId();
        let singleTodo = {
            id: id,
            todotext:todo,
            date : new Date().toLocaleString(),
            completed : false
        }
        console.log(singleTodo)

        todos.push(singleTodo);

        console.log(todos)

        showTodos();
    }
    formData.elements["todo"].value=""
}


const todoWrapper = document.getElementById("todoWrapper");
function showTodos(){
    const todoscreen = document.createElement("div");
    let text = document.createElement('input');
    text.id = "todopannel"
    let check = document.createElement('input');
    check.type="checkbox"
    let time = document.createElement('p')
    let deleteBtn = document.createElement('button');
    deleteBtn.innerHTML='<i class="fa-solid fa-eraser"></i>'

    let edit = document.createElement('button');
    edit.innerHTML='<i class="fa-solid fa-pen-to-square"></i>'
    
    if(todos.length>0){
        todos.map((item)=>{
            text.value = item.todotext;
            text.readOnly = true;
            time.textContent = item.date
            deleteBtn.id=item.id;
            deleteBtn.onclick=deleteTodo;
            check.onclick=toggleCheck;
            edit.onclick=toggleEdit;
            edit.setAttribute('name',"edit")
        
           
            if(item.completed==true){
                check.checked=true;
                
            }
            
            todoscreen.id=item.id
            todoscreen.append(check,text,time,edit,deleteBtn)
            todoscreen.className="screen" 
            if(check.checked){
                todoscreen.classList.add("linethrough")
            }
        
          
        })
    }


    todoWrapper.appendChild(todoscreen)
}


function deleteTodo(e){

    console.log(e.target.parentElement)
    let par = e.target.parentElement;
    let parrr = par.parentElement;
    console.log(parrr)
    todos = todos.filter((item)=>item.id!=e.target.parentElement.id);
    console.log(todos)

    todoWrapper.removeChild(parrr)
 
}

function toggleCheck(e){
  if(e.target.checked){
    e.target.parentElement.classList.add("linethrough")
  }else{
    e.target.parentElement.classList.remove("linethrough")
  }
}

function toggleEdit(e){
    
    child = e.target.parentElement;
    if(child.name=="edit"){
        parr = child.parentElement;
        console.log(parr.childNodes)
        parr.childNodes.forEach((item)=>{
            if(item.id=="todopannel"){
                item.readOnly=false;
                item.style.backgroundColor="white"
                item.style.outline="1px solid black"
                item.style.color="black"  
            }
        })
        child.name="save"
        child.innerHTML='<i class="fa-solid fa-floppy-disk"></i>'
    }else{
        parr = child.parentElement;
        console.log(parr.childNodes)
        parr.childNodes.forEach((item)=>{
            if(item.id=="todopannel"){
                item.readOnly=true;
                item.style.backgroundColor="transparent"
                item.style.outline="none"
                item.style.color="white"    
                updateInput(item.value, parr.id);
            }
        })
        child.name="edit"
        child.innerHTML='<i class="fa-solid fa-pen-to-square"></i>'
    }
    
}


function updateInput(val, id,){
    console.log(val,id);


    todos = todos.filter((todo)=>{
        if(todo.id==id){
            todo.todotext=val;
            console.log(todo.date)
        }
        return todo;
    })
    console.log(todos)
}