package com.example.SMS.StudentManagementSystem.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.SMS.StudentManagementSystem.entity.Student;
import com.example.SMS.StudentManagementSystem.service.StudentService;


@Controller
public class StudentController {
	
	private StudentService studentService;

	public StudentController(StudentService studentService) {
		super();
		this.studentService = studentService;
	}
	@GetMapping("students")
	public String listStudents(ModelMap model) {
		model.addAttribute("students",studentService.getallStudents());
		return "student";
	}
	@GetMapping("/students/new")
	public String createStudentForm(ModelMap model) {
		Student student= new Student();
		model.addAttribute("student", student);
		return "create_student";
	}
	@PostMapping("/students")
	public String saveStudent(@ModelAttribute("student") Student student) {
		studentService.saveStudent(student);
		return "redirect:students";
	}
	@GetMapping("/students/edit/{id}")
	public String editForm(@PathVariable Long id, ModelMap model) {
		model.addAttribute("student", studentService.getbyId(id));
		return "edit_student";
	}
	@PostMapping("/students/{id}")
	public String updateStudent(@PathVariable Long id,@ModelAttribute("student") Student student,ModelMap model) {
		Student existingStudent=studentService.getbyId(id);
		existingStudent.setId(id);
		existingStudent.setFirstname(student.getFirstname());
		existingStudent.setLastname(student.getLastname());
		existingStudent.setEmail(student.getEmail());
		studentService.updateStudent(existingStudent);
		return "redirect:/students";
	}
	@GetMapping("/students/{id}")
	public String deleteStudent(@PathVariable Long id) {
		studentService.deleteStudentById(id);
		return "redirect:students";
	}
}
