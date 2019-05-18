package com.openhack.Response;

import com.openhack.model.Address;
import com.openhack.model.Organization;
import com.openhack.model.User;

class UserOrgResponse{

    private String organization_name;
    private String status;

    public UserOrgResponse(String organization_name, String status) {
        this.organization_name = organization_name;
        this.status = status;
    }

    public String getOrganization_name() {
        return organization_name;
    }

    public void setOrganization_name(String organization_name) {
        this.organization_name = organization_name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

public class UserResponse {

    private Long uid;
    private String name;
    private String screenname;
    private String title;
    private String email;
    private String about_me;
    private String purl;
    private Address address;
    private UserOrgResponse organization;

    public UserResponse(User user) {
        this.uid = user.getUid();
        this.name = user.getName();
        this.about_me = user.getAboutMe();
        this.address = user.getAddress();
        this.email = user.getEmail();
        this.purl = user.getPurl();
        this.screenname = user.getScreenName();
        this.title = user.getTitle();

        Organization org = user.getOrganization();
        if(org != null){
            this.organization = new UserOrgResponse(org.getName(),user.getOrgStatus());
        }
    }

    public Long getUid() {
        return uid;
    }

    public void setUid(Long uid) {
        this.uid = uid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getScreenname() {
        return screenname;
    }

    public void setScreenname(String screenname) {
        this.screenname = screenname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAbout_me() {
        return about_me;
    }

    public void setAbout_me(String about_me) {
        this.about_me = about_me;
    }

    public String getPurl() {
        return purl;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setPurl(String purl) {
        this.purl = purl;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public UserOrgResponse getOrganization() {
        return organization;
    }

    public void setOrganization(UserOrgResponse organization) {
        this.organization = organization;
    }
}
