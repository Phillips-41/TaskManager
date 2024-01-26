package com.example.SMS.StudentManagementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SMS.StudentManagementSystem.entity.Student;

public interface StudentRepository extends JpaRepository<Student,Long>{

}
