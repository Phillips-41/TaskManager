package com.example.SMS.StudentManagementSystem.service;

import java.util.List;

import com.example.SMS.StudentManagementSystem.entity.Student;
public interface StudentService {
	List<Student> getallStudents();
	Student saveStudent(Student student);
	Student getbyId(Long id);
	Student updateStudent(Student student);
	void deleteStudentById(Long id);
}
