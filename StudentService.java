package com.New_Model_Rest_api_JPA_repo.Rest_api_JPA_repo.Service;

import com.New_Model_Rest_api_JPA_repo.Rest_api_JPA_repo.Dao.Student_Dao;
import com.New_Model_Rest_api_JPA_repo.Rest_api_JPA_repo.Entity.Student;
import com.New_Model_Rest_api_JPA_repo.Rest_api_JPA_repo.IService.IStudent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
public class StudentService implements IStudent {


    private Student_Dao studentDao;



    @Autowired
    public StudentService(Student_Dao theStudentDao){
        studentDao=theStudentDao;
    }




    @Override
    public List<Student> findAll() {
        return studentDao.findAll();
    }

    @Override
    public Student finByID(int thes) {
        return studentDao.findbyId(thes);
    }
    @Transactional
    @Override
    public Student save(Student thestudent) {
        return studentDao.save(thestudent);
    }

    @Transactional
    @Override
    public void delete(int theStud) {
        studentDao.deletebyID(theStud);
    }
}
