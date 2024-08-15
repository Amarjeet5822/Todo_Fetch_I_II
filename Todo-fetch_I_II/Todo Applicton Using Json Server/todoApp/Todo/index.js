var current_page = 1;
document.getElementById('addTask').addEventListener('click', todoAddFunction);
const box = document.getElementById("box");

async function todoAddFunction() {
    const titlep = document.getElementById("titleInp").value;
    const assignp = document.getElementById("assigneeInp").value;
    if (titlep && assignp){
        try {
            const res = await fetch('http://localhost:3000/todos',{
                method:"POST",
                body:JSON.stringify(
                    {
                      "title": titlep,
                      "status":false,
                      "assignee":assignp
                    }
                )
            });
            const data = res.json();
            console.log(data);
            DisplayTodo(data);
            document.getElementById('titleInp').value = '';
            document.getElementById('assigneeInp').value = '';
        } catch (err) {
            console.log("Something went wrong", err);
        }
    }
    else {console.log("Fields are not empty!")}
    
}
async function DeleteTodo(id,data){
    try{
        const res = await fetch(`http://localhost:3000/todos/${id}`,{
            method :"DELETE"
        });
        console.log(data);
        DisplayTodo(data);
    } catch(error){
        console.log("Something went wrong",error);
    }
}
async function UpdateTodo(Id, newTitle,newAssignee) {
    try{
        const res = await fetch(`${url}/${Id}/`,{
            method:"PATCH",
            headers:{
                'Content-Type':"application/json"
            },
            body: JSON.stringify({
                "title": newTitle,
                "assignee": newAssignee
            })
        })
        if (res.ok){
            FetchTodo(current_page);
            
        }
        else{
            throw new Error("Failed in updating TODO")
        }
    } catch(err){
        console.log("Error in todo",err)
    }
}
const editModal = document.getElementById("editModel");
const closeModal = document.querySelector(".close")
closeModal.onclick = function(){
    editModal.style.display= 'none';
    document.body.classList.remove('modal-open');
}


const openEditModal = (Todo)=>{

    document.getElementById('editTitle').value=Todo.title;
    document.getElementById('editAssignee').value=Todo.assignee;
    editModal.style.display = "block";
    document.body.classList.add("modal-open");
    document.getElementById("saveChangeBtn").onclick=async ()=>{
        const newTitle = document.getElementById('editTitle').value;
        const newAssignee = document.getElementById('editAssignee').value;
        if (newTitle && newAssignee){
            await UpdateTodo(Todo.id,newTitle,newAssignee);
            closeModal.click()
        }
        else{
            alert('both fields are required !')
        }
    };
}
function DisplayTodo(data) {
    data.forEach(ele => {
        const div = document.createElement('div');
        const divBtn = document.createElement('div');
        const assign = document.createElement('p');
        assign.textContent = ele.assignee
        const Title = document.createElement('p');
        Title.textContent = ele.title;
        const Status = document.createElement('p');
        Status.innerText = ele.status ? true : false;
        const deleteBtn=document.createElement('button');
        deleteBtn.setAttribute("type","button");
        deleteBtn.textContent = "DELETE";
        deleteBtn.addEventListener('click',()=>{
            DeleteTodo(ele.id,data);
    });
        const updateBtn = document.createElement("button");
        updateBtn.setAttribute("type","button");
        updateBtn.textContent = "UPDATE";
        updateBtn.style.marginLeft = "8px";
        updateBtn.addEventListener('click',()=>{

            openEditModal(ele);
            
        })
        divBtn.append(updateBtn,deleteBtn)
        div.append(Title, assign, Status);
        box.append(div,divBtn);


    });
}
async function FetchTodo(current_page) {
    console.log("hello Kishan Maansi")
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok){
            alert(data.detail);
            return;
        }
        console.log(data);
        DisplayTodo(data);
    } catch (error) {
        console.log("something went wrong", error);
    }
}
const url = "http://localhost:3000/todos";
FetchTodo(current_page);
