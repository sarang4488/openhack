package com.openhack.model;
import javax.persistence.*;

@Entity
@Table(name = "role")
public class Role {
    @Id
    @Column(name = "rid")
    private String rid;

    @ManyToOne
    @JoinColumn(name = "uid",referencedColumnName = "uid")
    private User user;

    @ManyToOne
    @JoinColumn(name = "hid", referencedColumnName = "hid")
    private Hackathon hackathon;

    @Column(name = "userRole")
    private String userRole;

    public Role() {

    }

    public Role(String rid, User user, Hackathon hackathon, String userRole) {
        this.rid = rid;
        this.user = user;
        this.hackathon = hackathon;
        this.userRole = userRole;
    }

    public String getRid() {
        return rid;
    }

    public void setRid(String rid) {
        this.rid = rid;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Hackathon getHackathon() {
        return hackathon;
    }

    public void setHackathon(Hackathon hackathon) {
        this.hackathon = hackathon;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }
}
