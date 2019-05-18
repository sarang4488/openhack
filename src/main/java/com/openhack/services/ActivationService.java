package com.openhack.services;

import com.openhack.dao.UserDao;
import com.openhack.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class ActivationService {
    @Autowired
    private UserDao userDao;


    @Transactional
    public ResponseEntity<?> activateUserAccount(String email){
        User user = userDao.findByEmail(email);

        if(user == null){
            return ResponseEntity.badRequest().body("SignUp first");
        }

        user.setUserStatus("Active");

        return ResponseEntity.ok().body(user);
    }
}
