package com.openhack.Response;

import com.openhack.model.Organization;
import com.openhack.model.User;

public class OrganizationBasicResponse {

    private long organization_id;
    private String organization_name;
    private String description;
    private OrgResponseOwner owner;


    public OrganizationBasicResponse(Organization organization){
        this.organization_id = organization.getOid();
        this.organization_name = organization.getName();
        this.description = organization.getDesciption();

        User user = organization.getOwner();

        owner = new OrgResponseOwner(user.getName(),user.getScreenName(),user.getEmail());
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
}
