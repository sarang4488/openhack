package com.openhack.controller;

import com.openhack.services.OrganizationService;
import com.openhack.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class OrganizationController {

    @Autowired
    private OrganizationService organizationService;

    @Autowired
    private UserService userService;

    private ResponseHeader responseHeader = new ResponseHeader();

    @RequestMapping(value = "/organization", method = {RequestMethod.POST})
    public ResponseEntity<?> postOrganization(@RequestParam(value = "name",required = true) String name,
                                        @RequestParam(value = "owner_name",required = true) String owner_name,
                                        @RequestParam(value = "desctiption",required = false) String desctiption){

        ResponseEntity responseEntity = organizationService.createOrganization(name,desctiption,owner_name);

        return new ResponseEntity<>(responseEntity, responseHeader.getHeader(), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/organization/{org_name}", method = {RequestMethod.GET})
    public ResponseEntity<?> getOrganization(@PathVariable String org_name,
                                             @RequestParam(value = "screenname",required = true) String screenname){

        ResponseEntity responseEntity = organizationService.readOrganization(org_name,screenname);

        return new ResponseEntity<>(responseEntity, responseHeader.getHeader(), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/organization/owner/{screenname}", method = {RequestMethod.GET})
    public ResponseEntity<?> getOrganizations(@PathVariable String screenname){

        ResponseEntity responseEntity = organizationService.readOrganizations(screenname);

        return new ResponseEntity<>(responseEntity, responseHeader.getHeader(), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/organization/{name}/join/{screenname}", method = {RequestMethod.POST})
    public ResponseEntity<?> joinOrganization(@PathVariable String name,
                                              @PathVariable String screenname){

        ResponseEntity responseEntity = userService.updateUserOrganization(screenname,name,"Requested");

        return new ResponseEntity<>(responseEntity, responseHeader.getHeader(), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/organization/{name}/approve/{screenname}", method = {RequestMethod.POST})
    public ResponseEntity<?> approveJoinRequest(@PathVariable String name,
                                                @PathVariable String screenname){
        ResponseEntity responseEntity = userService.updateUserOrganization(screenname,name,"Approved");

        return new ResponseEntity<>(responseEntity, responseHeader.getHeader(), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/organization/names",method = {RequestMethod.GET})
    public ResponseEntity<?> getOrganizationNames(){
        ResponseEntity responseEntity = organizationService.readOrganizationNames();
        return new ResponseEntity<>(responseEntity, responseHeader.getHeader(), HttpStatus.CREATED);
    }

}
