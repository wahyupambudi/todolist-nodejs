export class TodoListService {
  todolist = ["Ayam", "Geprek"];

  getJsonTodoList() {
    return JSON.stringify({
      code: 200,
      status: "OK",
      data: this.todolist.map((value, index) => {
        return {
          id: index,
          todo: value,
        };
      }),
    });
  }

  handlingData() {
    return JSON.stringify({
      code: 400,
      status: "Bad Request",
      data: "Data is not found",
    });
  }

  getTodoList(request, response) {
    response.write(this.getJsonTodoList());
    response.end();
  }

  createTodo(request, response) {
    request.addListener("data", (data) => {
      const body = JSON.parse(data.toString());
      this.todolist.push(body.todo);

      // console.log(body)

      response.write(this.getJsonTodoList());
      response.end();
    });
  }

  updateTodo(request, response) {
    request.addListener("data", (data) => {
      const body = JSON.parse(data.toString());
      if (this.todolist[body.id] === undefined) {
        response.write(this.handlingData());
      } else {
        this.todolist[body.id] = body.todo;
        response.write(this.getJsonTodoList());
      }

      // console.log(body.id);
      // console.log(this.todolist[body.id]);

      response.end();
    });
  }

  deleteTodo(request, response) {
    request.addListener("data", (data) => {
      const body = JSON.parse(data.toString());
      if (this.todolist[body.id] === undefined) {
        response.write(this.handlingData());
      } else {
        // this.todolist.pop(body.id);
        this.todolist.splice(body.id, 1);
        response.write(this.getJsonTodoList());
      }

      // console.log(body.id)
      // console.log(this.todolist[body.id])

      response.end();
    });
  }
}
