package com.New_Model_Rest_api_JPA_repo.Rest_api_JPA_repo.Controller;

import com.New_Model_Rest_api_JPA_repo.Rest_api_JPA_repo.Dao.Student_Dao;
import com.New_Model_Rest_api_JPA_repo.Rest_api_JPA_repo.Entity.Student;
import com.New_Model_Rest_api_JPA_repo.Rest_api_JPA_repo.Entity.Task;
import com.New_Model_Rest_api_JPA_repo.Rest_api_JPA_repo.Service.StudentService;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.PublicKey;
import java.util.List;

@RestController
@RequestMapping("/Student/App")
@CrossOrigin(origins = "http://localhost:3000")
public class Student_Controller {

    // Quick and dirty: inject employee dao


    // this is easy model

//    @Autowired
//    Student_Dao student;


    //    @Autowired
//    StudentService studentService;


    // we can use dao also
//    private Student_Dao student;


     // constructor kk
//    public Student_Controller(Student_Dao theStudent){
//        student=theStudent;
//    }

    private StudentService studentService;

    @Autowired
    public Student_Controller(StudentService theservice){
        studentService=theservice;
    }




    // expose "/student" and return a list of students

//    @GetMapping("/StudentDetails")
//    public List<Student> findAll(){
//        return student.findAll();
//    }


@GetMapping
    public List<Student> findAll(){
        return studentService.findAll();
}
@GetMapping("/STUDENT/{thes}")
    public Student findById(@PathVariable int thes){
        Student st=studentService.finByID(thes);
        if(st == null){
            throw new RuntimeException("student  ladura babuu" + thes);
        }
return st;
}

@DeleteMapping("/delete/{hmm}")
    public void deleteBYId(@PathVariable int hmm){
        studentService.delete(hmm);
}
    @PutMapping("/update/{id}")
    public ResponseEntity<Student> updateTask(@PathVariable int id, @RequestBody Student taskDetails) {
        Student task = studentService.finByID(id);

        task.setId(taskDetails.getId());
        task.setFirstName(taskDetails.getFirstName());
        task.setLastName(taskDetails.getLastName());
        task.setEmail(taskDetails.getEmail());

        Student updatedTask = studentService.save(task);
        return ResponseEntity.ok(updatedTask);
    }

@PostMapping("/save/student")
    public Student saveStudent(@RequestBody Student save){
        Student st=studentService.save(save);
        return st;
}

}
