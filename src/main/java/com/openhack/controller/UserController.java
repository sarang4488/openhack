package com.openhack.controller;

import com.openhack.model.User;
import com.openhack.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController{

    @Autowired
    private UserService userService;

    private ResponseHeader responseHeader = new ResponseHeader();

    @RequestMapping(value = "/user" , method = {RequestMethod.POST})
    public ResponseEntity<?> postUser(@RequestParam(value = "name",required = true) String name,
                                          @RequestParam(value = "screenname",required = true)  String screenname,
                                          @RequestParam(value = "email",required = true) String email,
                                      @RequestParam(value = "usertype", required = false,defaultValue = "hacker") String userType){

        ResponseEntity responseEntity = userService.createUser(name,screenname,email,userType,"registered");

        return new ResponseEntity<>(responseEntity, responseHeader.getHeader(), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/user/{screenname}", method = {RequestMethod.GET})
    public ResponseEntity<?> getUser(@PathVariable String screenname){

        ResponseEntity<?> responseEntity = userService.readUser(screenname);

        return new ResponseEntity<>(responseEntity, responseHeader.getHeader(), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/user/{screenname}",method = {RequestMethod.POST})
    public ResponseEntity<?> updateUser(@PathVariable String screenname,
                                        @RequestParam(value = "name",required = false) String name,
                                        @RequestParam(value = "purl",required = false) String purl,
                                        @RequestParam(value = "title",required = false) String title,
                                        @RequestParam(value = "street",required = false)  String street,
                                        @RequestParam(value = "city",required = false)  String city,
                                        @RequestParam(value = "state",required = false)  String state,
                                        @RequestParam(value = "zip",required = false)  String zip,
                                        @RequestParam(value = "aboutMe",required = false)  String aboutMe){

        ResponseEntity responseEntity = userService.updateUser(name,screenname,title,aboutMe,purl,street,city,state,zip);

        return new ResponseEntity<>(responseEntity, responseHeader.getHeader(), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/user/names",method = {RequestMethod.GET})
    public ResponseEntity<?> getScreennames(@RequestParam(value = "screenname",required = true)  String screenname){
        ResponseEntity responseEntity = userService.readScreennames(screenname);

        return new ResponseEntity<>(responseEntity, responseHeader.getHeader(), HttpStatus.CREATED);
    }

}