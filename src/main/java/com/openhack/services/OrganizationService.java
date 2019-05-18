package com.openhack.services;


import com.openhack.Response.OrganizationBasicResponse;
import com.openhack.Response.OrganizationResponse;
import com.openhack.dao.OrganizationDao;
import com.openhack.dao.UserDao;
import com.openhack.model.Organization;
import com.openhack.model.User;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrganizationService {

    @Autowired
    private OrganizationDao organizationDao;

    @Autowired
    private UserDao userDao;

    @Transactional
    public ResponseEntity<?> createOrganization(String name,
                                                String description,
                                                String owner_sname){

        if(name==null || owner_sname==null || name=="" || owner_sname=="" ) {
            return ResponseEntity.badRequest().body("Please fill up a unique name");
        }

        User owner = null;
        if(owner_sname != null)
            owner = userDao.findByScreenname(owner_sname);

        if(owner == null)
            return ResponseEntity.badRequest().body("No such owner");

        Organization tmp_org = organizationDao.findItemByName(name);
        if(tmp_org != null)
            return ResponseEntity.badRequest().body("Organization name already in use");

        Organization organization = new Organization();

        //if(name != null)
            organization.setName(name);
        if(description != null)
            organization.setDesciption(description);
        //if(owner != null)
            organization.setOwner(owner);

        organizationDao.createItem(organization);

        OrganizationResponse organizationResponse = new OrganizationResponse(organization);

        return ResponseEntity.ok().body(organizationResponse);

    }

    @Transactional
    public ResponseEntity<?> readOrganization(String name,String screenname){
        //use stratergy pattern to return data depending on who wants it.
        Organization organization = organizationDao.findItemByName(name);
        if(organization == null){
            return ResponseEntity.badRequest().body("No such organization");
        }

        if(organization.getOwner().getScreenName().equals(screenname)) {
            OrganizationResponse organizationResponse = new OrganizationResponse(organization);
            return ResponseEntity.ok().body(organizationResponse);
        }
        else{
            OrganizationBasicResponse organizationBasicResponse = new OrganizationBasicResponse(organization);
            return ResponseEntity.ok().body(organizationBasicResponse);
        }
    }

    @Transactional
    public ResponseEntity<?> readOrganizationNames(){
        List<String> org_names = new ArrayList<String>();
        List<Object> names = organizationDao.readOrgNames();
        for (Object obj:
                names) {
            Organization org = (Organization)obj;
            org_names.add(org.getName());
        }
        return ResponseEntity.ok().body(org_names);
    }

}
