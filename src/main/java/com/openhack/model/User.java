package com.openhack.model;

import javax.persistence.*;
import javax.websocket.ClientEndpoint;
import java.util.ArrayList;
import java.util.List;

@Entity
public class User {
    @Id
    @Column(name = "uid")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long uid;

    @Column(name = "name")
    private String name;

    @Column(name = "screenName",unique = true)
    private String screenName;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "title")
    private String title;

    @Column(name = "aboutMe")
    private String aboutMe;

    @Column(name = "purl")
    private String purl;

    @Column(name = "userType")
    private String userType;

    @Column(name = "userStatus")
    private String userStatus;

    @Column(name = "attempCount")
    private int attempCount;

    @Embedded
    private Address address;

    @ManyToOne
    @JoinColumn(name = "oid")
    private Organization organization;

    @Column(name = "orgStatus")
    private String orgStatus;

    @ManyToMany
    @JoinTable(
            name = "role",
            joinColumns = @JoinColumn(name = "uid"),
            inverseJoinColumns = @JoinColumn(name = "hid")
    )
    private List<Hackathon> hackathons = new ArrayList<Hackathon>();



    public User(long uid, String name, String screenName, String email, String title, String aboutMe, String purl, String userStatus, String userType, int attempCount, Address address, Organization organization, String orgStatus) {
        this.uid = uid;
        this.name = name;
        this.screenName = screenName;
        this.email = email;
        this.title = title;
        this.aboutMe = aboutMe;
        this.purl = purl;
        this.userStatus = userStatus;
        this.attempCount = attempCount;
        this.address = address;
        this.organization = organization;
        this.orgStatus = orgStatus;
        this.userType = userType;
    }

    /**
     *
     */
    public User() {

    }

    /**
     *
     * @return
     */
    public long getUid() {
        return uid;
    }

    /**
     *
     * @param uid
     */
    public void setUid(long uid) {
        this.uid = uid;
    }

    /**
     *
     * @return
     */
    public String getName() {
        return name;
    }

    /**
     *
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     *
     * @return
     */
    public String getScreenName() {
        return screenName;
    }

    /**
     *
     * @param screenName
     */
    public void setScreenName(String screenName) {
        this.screenName = screenName;
    }

    /**
     *
     * @return
     */
    public String getEmail() {
        return email;
    }

    /**
     *
     * @param email
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     *
     * @return
     */
    public String getTitle() {
        return title;
    }

    /**
     *
     * @param title
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     *
     * @return
     */
    public String getAboutMe() {
        return aboutMe;
    }

    /**
     *
     * @param aboutMe
     */
    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }

    /**
     *
     * @return
     */
    public String getPurl() {
        return purl;
    }

    /**
     *
     * @param purl
     */
    public void setPurl(String purl) {
        this.purl = purl;
    }

    /**
     *
     * @return
     */
    public Address getAddress() {
        return address;
    }

    /**
     *
     * @param address
     */
    public void setAddress(Address address) {
        this.address = address;
    }

    /**
     *
     * @return
     */
    public Organization getOrganization() {
        return organization;
    }

    /**
     *
     * @param organization
     */
    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    /**
     *
     * @return
     */
    public String getUserStatus() {
        return userStatus;
    }

    /**
     *
     * @param userStatus
     */
    public void setUserStatus(String userStatus) {
        this.userStatus = userStatus;
    }

    /**
     *
     * @return
     */
    public int getAttempCount() {
        return attempCount;
    }

    /**
     *
     * @param attempCount
     */
    public void setAttempCount(int attempCount) {
        this.attempCount = attempCount;
    }

    /**
     *
     * @return
     */
    public String getOrgStatus() {
        return orgStatus;
    }

    /**
     *
     * @param orgStatus
     */
    public void setOrgStatus(String orgStatus) {
        this.orgStatus = orgStatus;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }
}
