import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo/todo.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

@NgModule({
  declarations: [
    TodoComponent,
    TodoItemComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TodoModule { }
