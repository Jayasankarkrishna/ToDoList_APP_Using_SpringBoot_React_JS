package com.New_Model_Rest_api_JPA_repo.Rest_api_JPA_repo.IDao;

import com.New_Model_Rest_api_JPA_repo.Rest_api_JPA_repo.Dao.Student_Dao;
import com.New_Model_Rest_api_JPA_repo.Rest_api_JPA_repo.Entity.Student;

import java.util.List;

public interface Student_Interface {



    List<Student> findAll();

    Student findbyId(int theID);

    Student save(Student theStudent);

    void deletebyID(int theId);

}
