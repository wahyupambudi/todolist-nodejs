export class TodoListService {
  todolist = ["Eat", "Chicken"];

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
      if(this.todolist[body.id]) {
        this.todolist[body.id] = body.todo;
      }

      // console.log(body.id)
      // console.log(this.todolist[body.id])

      response.write(this.getJsonTodoList());
      response.end();
    });
  }
}
