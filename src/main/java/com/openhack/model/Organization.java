package com.openhack.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Organization {
    @Id
    @Column(name = "oid")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long oid;

    @Column(name = "name",unique = true)
    private String name;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "organization")
    @JsonIgnore
    private List<User> members = new ArrayList<User>();

    @ManyToOne
    @JoinColumn(name = "uid")
    private User Owner;

    @Column(name = "description")
    private String desciption;

    public Organization() {
    }

    public Organization(long oid, String name, List<User> members,String desciption) {
        this.oid = oid;
        this.name = name;
        this.members = members;
        this.desciption = desciption;
    }

    public long getOid() {
        return oid;
    }

    public void setOid(long oid) {
        this.oid = oid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<User> getMembers() {
        return members;
    }

    public void setMembers(List<User> members) {
        this.members = members;
    }

    public User getOwner() {
        return Owner;
    }

    public void setOwner(User owner) {
        Owner = owner;
    }

    public String getDesciption() {
        return desciption;
    }

    public void setDesciption(String desciption) {
        this.desciption = desciption;
    }
}
