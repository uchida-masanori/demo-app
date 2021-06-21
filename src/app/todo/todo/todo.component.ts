import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Todo } from 'src/app/interfaces/todo';
import { AuthService } from 'src/app/services/auth.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todos$ = this.todo.getTodos().pipe(tap((data) => console.log(data)));
  user$ = this.auth.user$;
  lists = ['todo', 'doing', 'done'];
  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(10)]],
  });
  constructor(
    private todo: TodoService,
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void { }
  createTodo(uid: string) {
    const name = this.form.controls.name.value;
    this.todo.createTodo(name, uid);
    this.form.reset();
    this.form.controls.name.setErrors({ required: null });
  }

  deleteTodo(id: string) {
    this.todo.deleteTodo(id);
  }

  filterTodo(filterList: string, todos: Todo[]): Todo[] {
    if (!todos) {
      return [];
    }
    return todos.filter((todo) => todo.list === filterList);
  }

  drop(event: CdkDragDrop<Todo[]>) {
    console.log(event);
    if (event.previousContainer) {
      const list = event.container.id;
      const todo = event.item.data;
      todo.list = list;
      this.todo.putTodo(todo);
    }
  }
}
