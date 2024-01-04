package com.New_Model_Rest_api_JPA_repo.Rest_api_JPA_repo.Dao;

import com.New_Model_Rest_api_JPA_repo.Rest_api_JPA_repo.Entity.Student;
import com.New_Model_Rest_api_JPA_repo.Rest_api_JPA_repo.IDao.Student_Interface;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class Student_Dao implements Student_Interface {


    // defining feilds for entity manager

//    @Autowired
//    EntityManager entityManager;


    private EntityManager entityManager;

    @Autowired
    public Student_Dao(EntityManager theEntitymanager){
        entityManager=theEntitymanager;
    }


    @Override
    public List<Student> findAll() {

        //create Query

       TypedQuery <Student> theQuery=entityManager.createQuery("from Student",Student.class);

       //execute Query and get result list

        List<Student> theEmployee= theQuery.getResultList();

        // return the list
        return theEmployee;
    }

    @Override
    public Student findbyId(int theID) {
        Student the=entityManager.find(Student.class,theID);

        return the;
    }

    @Override
    public Student save(Student theStudent) {
        Student  theStu=entityManager.merge(theStudent);
        return theStu;
    }

    @Override
    public void deletebyID(int theId) {
        Student thes=entityManager.find(Student.class,theId);

        entityManager.remove(thes);

    }
}
