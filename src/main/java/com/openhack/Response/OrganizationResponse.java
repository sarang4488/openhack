package com.openhack.Response;

import com.openhack.model.Organization;
import com.openhack.model.User;

import java.util.ArrayList;
import java.util.List;

class OrgRequestMembers{
    private String name;
    private String screenname;
    private String email;

    public OrgRequestMembers(String name, String screenname, String email) {
        this.name = name;
        this.screenname = screenname;
        this.email = email;
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
}

class OrgMembers{
    private String name;
    private String screenname;
    private String email;

    public OrgMembers(String name, String screenname, String email) {
        this.name = name;
        this.screenname = screenname;
        this.email = email;
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
}

public class OrganizationResponse {

    private long organization_id;
    private String organization_name;
    private String description;
    private OrgResponseOwner owner;
    private List<OrgMembers>  members = new ArrayList<OrgMembers>();
    private List<OrgRequestMembers> requested_members = new ArrayList<OrgRequestMembers>();

    public OrganizationResponse(Organization organization){
        this.organization_id = organization.getOid();
        this.organization_name = organization.getName();
        this.description = organization.getDesciption();

        User user = organization.getOwner();

        owner = new OrgResponseOwner(user.getName(),user.getScreenName(),user.getEmail());

        List<User> tmp = organization.getMembers();
        for(User u : tmp){
            if(u.getOrgStatus().equals("Requested"))
                requested_members.add(new OrgRequestMembers(u.getName(),u.getScreenName(),u.getEmail()));
            else if(u.getOrgStatus().equals("Approved"))
                members.add(new OrgMembers(u.getName(),u.getScreenName(),u.getEmail()));
        }

    }


    public long getOrganization_id() {
        return organization_id;
    }

    public void setOrganization_id(long organization_id) {
        this.organization_id = organization_id;
    }

    public String getOrganization_name() {
        return organization_name;
    }

    public void setOrganization_name(String organization_name) {
        this.organization_name = organization_name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public OrgResponseOwner getOwner() {
        return owner;
    }

    public void setOwner(OrgResponseOwner owner) {
        this.owner = owner;
    }

    public List<OrgMembers> getMembers() {
        return members;
    }

    public void setMembers(List<OrgMembers> members) {
        this.members = members;
    }

    public List<OrgRequestMembers> getRequested_members() {
        return requested_members;
    }

    public void setRequested_members(List<OrgRequestMembers> requested_members) {
        this.requested_members = requested_members;
    }
}
