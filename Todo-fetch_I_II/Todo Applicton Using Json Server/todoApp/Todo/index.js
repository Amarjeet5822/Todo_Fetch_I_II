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
            document.getElementById('assigneeInp').valu = '';
        } catch (err) {
            console.log("Something went wrong", err);
        }
    }
    else {console.log("Fields are not empty!")}
    
}
async function DeleteTodo(id){
    
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
            DeleteTodo(ele.id)
    });
        const updateBtn = document.createElement("button");
        updateBtn.setAttribute("type","button");
        updateBtn.textContent = "UPDATE";
        updateBtn.style.margin;
        updateBtn.addEventListener('click',()=>{
            UpdateTodo(ele.id)
        })
        divBtn.append(updateBtn,deleteBtn)
        div.append(Title, assign, Status);
        box.append(div,divBtn);


    });
}
async function FetchTodo() {
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        DisplayTodo(data);
    } catch (error) {
        console.log("something went wrong", error);
    }
}
const url = "http://localhost:3000/todos";
FetchTodo();
