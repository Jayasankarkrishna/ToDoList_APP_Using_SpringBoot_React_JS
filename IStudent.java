package com.New_Model_Rest_api_JPA_repo.Rest_api_JPA_repo.IService;

import com.New_Model_Rest_api_JPA_repo.Rest_api_JPA_repo.Entity.Student;

import java.util.List;

public interface IStudent {

    List<Student> findAll();

    Student finByID(int thes);

    Student save(Student thestudent);

    void delete(int theStud);
}
