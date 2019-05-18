package com.openhack.Response;

public class OrgResponseOwner{

    private String name;
    private String screenname;
    private String email;

    public OrgResponseOwner(String name, String screenname, String email) {
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
