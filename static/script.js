$(document).ready(function () {
    get_tasks();
  });

  function get_tasks() {
    $.ajax({
      type: "GET",
      url: "/tasks",
      data: {},
      success: function (response) {
        const tasks = response['tasks']
        for (let i = 0; i < tasks.length; i++) {
            const curr_item = tasks[i];
            let temp_html;
            if (curr_item['status']=='process'){
                temp_html = `
                <div class="shadow p-3 mb-3 bg-white ">
                    <div class="task-title">
                        <h2>${curr_item['task']}</h2>
                        <button class="btn btn-outline-success me-3 fw-bold" type="button"   onclick="done_task(${curr_item['index']})" >Done</button>
                        <button class="btn btn-danger fw-bold" type="button" onclick="delete_task(${curr_item['index']})" >Delete</button>
                    </div>
                    <div class="task-status">
                        <p class="bg-warning">Status:<span>${curr_item['status']}</span></p>
                        <p class="bg-warning">Deadline:<span class="date">${curr_item['deadline'].split("T")[0]}</span><span>${curr_item['deadline'].split("T")[1]}</spn></p>
                    </div>

                </div>`
            }
            else{
                temp_html = `
                <div class="shadow p-3 mb-3 bg-white ">
                    <div class="task-title">
                        <h2>${curr_item['task']}</h2>
                        <button class="btn btn-success me-3 fw-bold" type="button"   onclick="undone_task(${curr_item['index']})" >Done</button>
                        <button class="btn btn-danger fw-bold" type="button" onclick="delete_task(${curr_item['index']})" >Delete</button>
                    </div>
                    <div class="task-status">
                        <p class="bg-success">Status:<span>${curr_item['status']}</span></p>
                        <p class="bg-success">Deadline:<span class="date">${curr_item['deadline'].split("T")[0]}</span><span>${curr_item['deadline'].split("T")[1]}</p>
                    </div>

                </div>`
            }
            $('#task-box').append(temp_html)
        }
      },
    });
  }

  function done_task(index) {
    $.ajax({
      type: "POST",
      url: "/done",
      data: { index: index },
      success: function (response) {
        alert(response["msg"]);
        window.location.reload()
      },
    });
  }

  function undone_task(index) {
    $.ajax({
      type: "POST",
      url: "/undone",
      data: { index: index },
      success: function (response) {
        alert(response["msg"]);
        window.location.reload()
      },
    });
  }

  
  function delete_task(index) {
    $.ajax({
      type: "POST",
      url: "/delete",
      data: { index: index },
      success: function (response) {
        alert(response["msg"]);
        window.location.reload()
      },
    });
  }

  function save_task() {
    const task = $("#task").val();
    const deadline=$('#deadline').val();
    if(task==""){
        alert('Enter task you want tpo add');
    }
    else if(deadline==""){
        alert('Select deadline for this task')
    }
    else{
        
        $.ajax({
            type: "POST",
            url: "/tasks",
            data: {
                task:task,
                deadline:deadline
            },
            success: function (response) {
            alert(response["msg"]);
            window.location.reload()
            },
        });
    }
  }