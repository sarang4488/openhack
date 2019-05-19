package com.openhack.services;

import com.openhack.Response.UserResponse;
import com.openhack.dao.OrganizationDao;
import com.openhack.dao.UserDao;
import com.openhack.model.Address;
import com.openhack.model.Organization;
import com.openhack.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private OrganizationDao organizationDao;

    @Transactional
    public ResponseEntity<?> createUser(String name,
                                        String screenname,
                                        String email,
                                        String user_type,
                                        String userStatus){

        if(name==null || screenname==null || email==null || name=="" || screenname=="" || email=="") {
            return ResponseEntity.badRequest().body("Please fill up all the fields");
        }

        if(!email.contains("@")){
            return ResponseEntity.badRequest().body("Invalid email id");
        }

        User email_user = userDao.findByEmail(email);
        if(email_user != null){
            System.out.println("user exists");
            return ResponseEntity.badRequest().body("Email id already in use");
        }

        User screen_user = userDao.findByScreenname(screenname);
        if(screen_user != null){
            return ResponseEntity.badRequest().body("screenname already in use");
        }

        User user = new User();
        user.setScreenName(screenname);
        user.setName(name);
        user.setEmail(email);
        user.setUserStatus(userStatus);

        String[] userType=email.split("@");
        if(userType[1].equals("sjsu.edu")) {
            user.setUserType("admin");
        }else{
            user.setUserType("hacker");
        }

        try{
            userDao.createItem(user);
        }catch (Exception exception){
            return ResponseEntity.badRequest().body("name/email is wrong");
        }

        return ResponseEntity.ok().body(user);

    }

    @Transactional
    public ResponseEntity<?> updateUser(String name,
                                        String screenname,
                                        String title,
                                        String aboutMe,
                                        String purl,
                                        String street,
                                        String city,
                                        String state,
                                        String zip){

        User user = userDao.findByScreenname(screenname);
        
        if(user == null)
        	return ResponseEntity.badRequest().body("User does not exist");

        if(name != null)
            user.setName(name);

        if(screenname != null)
            user.setScreenName(screenname);

        if(title != null)
            user.setTitle(title);

        if(aboutMe != null)
            user.setAboutMe(aboutMe);

        if(purl != null)
            user.setPurl(purl);

        Address address = user.getAddress();

        if(address == null){
            address = new Address();
            address.setStreet(street);
            address.setCity(city);
            address.setState(state);
            address.setZip(zip);
        }else {

            if (street != null)
                address.setStreet(street);
            if (city != null)
                address.setCity(city);
            if (state != null)
                address.setState(state);
            if (zip != null)
                address.setZip(zip);
        }
        user.setAddress(address);

        UserResponse userResponse = new UserResponse(user);

        return ResponseEntity.ok().body(userResponse);
    }

    @Transactional
    public ResponseEntity<?> updateUserOrganization(String screenname,
                                                    String org_name,
                                                    String orgStatus){

        User user = userDao.findByScreenname(screenname);
        
        if(user == null){
            return ResponseEntity.badRequest().body("No such user");
        }

        Organization organization = organizationDao.findItemByName(org_name);

        if(user.getName().equals(organization.getOwner().getName()))
            return ResponseEntity.badRequest().body("owner cannot join same org");

        user.setOrganization(organization);
        user.setOrgStatus(orgStatus);


        if(orgStatus.equals("Requested"))
            return ResponseEntity.ok().body("Request sent of organization owner");
        else if (orgStatus.equals("Approved"))
            return ResponseEntity.ok().body(screenname+" is now part of organization");
        else {

            user.setOrganization(null);
            user.setOrgStatus(null);

            return ResponseEntity.ok().body(screenname + " is no longr part of organization");
        }
    }

    @Transactional
    public ResponseEntity<?> readUser(String screenname){
        User user = userDao.findByScreenname(screenname);

        if(user == null){
            return ResponseEntity.badRequest().body("No such user");
        }

        UserResponse userResponse = new UserResponse(user);

        return ResponseEntity.ok().body(userResponse);
    }

    @Transactional
    public ResponseEntity<?> readScreennames(String screenname){
        List<User> users = userDao.readItems();
        List<UserResponse> snames = new ArrayList<UserResponse>();

        if(users != null)
            for (User user:
                 users) {
                    UserResponse userResponse = new UserResponse(user);
                    snames.add(userResponse);
            }

        return ResponseEntity.ok().body(snames);
    }


}
