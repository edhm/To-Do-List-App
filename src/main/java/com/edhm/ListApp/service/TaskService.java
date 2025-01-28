package com.edhm.ListApp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edhm.ListApp.model.Task;
import com.edhm.ListApp.repository.TaskRepository;

@Service
public class TaskService {
	@Autowired
	private TaskRepository taskRepository;

	public List<Task> getAllTasks() {
		return taskRepository.findAll();
	}

	public Task createTask(Task task) {
		return taskRepository.save(task);
	}

	public Task updateTask(Long id, Task updatedTask) {
		Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
		task.setTitle(updatedTask.getTitle());
		task.setDescription(updatedTask.getDescription());
		return taskRepository.save(task);
	}

	public void deleteTask(Long id) {
		taskRepository.deleteById(id);
	}
}