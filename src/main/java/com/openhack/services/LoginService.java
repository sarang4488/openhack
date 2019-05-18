package com.openhack.services;

import com.openhack.Response.UserResponse;
import com.openhack.dao.LoginDao;
import com.openhack.dao.UserDao;
import com.openhack.model.Login;
import com.openhack.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private LoginDao loginDao;

    @Autowired
    private UserDao userDao;

    public ResponseEntity<?> createLogin(String email,
                                         String password){

        Login login = new Login();
        login.setEmail(email);
        login.setPassword(password);

        login = loginDao.createItem(login);

        return ResponseEntity.ok().body("Valid object created");
    }

    public ResponseEntity<?> readLogin(String email,String password){
        Login login = loginDao.findByEmail(email);

        if(login == null){
            return ResponseEntity.badRequest().body("Invalid login/password");
        }

        if(login.getPassword().equals(password)){
            User user = userDao.findByEmail(email);

            if(user.getUserStatus().equals("registered")){
                return ResponseEntity.badRequest().body("Activate your account before login");
            }
            else if(user.getUserStatus().equals("locked")){
                return ResponseEntity.badRequest().body("Account locked. Please use forgot password and create a new password");
            }

            UserResponse userResponse = new UserResponse(user);

            return ResponseEntity.ok().body(userResponse);
        }

        else{
            return ResponseEntity.badRequest().body("Invalid login/password");
        }
    }

}
