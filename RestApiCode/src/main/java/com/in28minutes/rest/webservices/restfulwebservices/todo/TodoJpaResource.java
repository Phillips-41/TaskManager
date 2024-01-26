package com.in28minutes.rest.webservices.restfulwebservices.todo;

import com.in28minutes.rest.webservices.restfulwebservices.todo.repository.TodoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TodoJpaResource  {
    private TodoService todoService;
    private TodoRepository repository;

    public TodoJpaResource(TodoService todoService, TodoRepository repository) {
        this.todoService = todoService;
        this.repository = repository;
    }

    @GetMapping("/users/{username}/todos")
    public List<Todo> retrieveTodos(@PathVariable String username){
      // return todoService.findByUsername(username);
        return repository.findByUsername(username);
    }
    @GetMapping("/users/{username}/todos/{id}")
    public Todo retrieveTodo(@PathVariable String username, @PathVariable int id){
        //return todoService.findById(id);
        return repository.findById(id).get();
    }

    @DeleteMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable int id){
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/users/{username}/todos/{id}")
    public Todo updateTodo(@PathVariable String username, @PathVariable int id,@RequestBody Todo todo){
        repository.save(todo);
        return todo;
    }

    @PostMapping("/users/{username}/todos")
    public Todo createTodo(@PathVariable String username,@RequestBody Todo todo){
        todo.setUsername(username);
        todo.setId(null);
        return repository.save(todo);
//       Todo createdTodo= todoService.addTodo(username,todo.getDescription(),todo.getTargetDate(),todo.isDone());
//        return createdTodo;
    }
}
