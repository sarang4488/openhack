package com.openhack.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Hackathon {
    @Id
    @Column(name = "hid")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long hid;

    @Column(name = "name")
    private String name;

    @Column(name = "start_date")
    private String start_date;

    @Column(name = "end_date")
    private String end_date;

    @Column(name = "creation_date")
    private String creation_date;

    @ManyToOne
    @JoinColumn(name = "screenname")
    private User Owner;

    @Column(name = "min_team_size")
    private int min_team_size;

    @Column(name = "max_team_size")
    private int max_team_size;

    @Column(name = "fee")
    private float fee;

    @Column(name = "discount")
    private int discount;

    @Column(name = "status")
    private String status;

    @Column(name = "judge_screenname")
    private String judge_screenname;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "hackathon")
    @JsonIgnore
    private List<Team> teams = new ArrayList<Team>();

    @ManyToOne
    @JoinColumn(name = "oid")
    private Organization sponser;


    public Hackathon() {

    }

    public Hackathon(long hid, String name, String start_date, String end_date, String creation_date, User owner, int min_team_size, int max_team_size, float fee, int discount, String status, String judge_screenname, List<Team> teams, Organization sponser) {
        this.hid = hid;
        this.name = name;
        this.start_date = start_date;
        this.end_date = end_date;
        this.creation_date = creation_date;
        Owner = owner;
        this.min_team_size = min_team_size;
        this.max_team_size = max_team_size;
        this.fee = fee;
        this.discount = discount;
        this.status = status;
        this.judge_screenname = judge_screenname;
        this.teams = teams;
        this.sponser = sponser;
    }

    public long getHid() {
        return hid;
    }

    public void setHid(long hid) {
        this.hid = hid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    public String getEnd_date() {
        return end_date;
    }

    public void setEnd_date(String end_date) {
        this.end_date = end_date;
    }

    public String getCreation_date() {
        return creation_date;
    }

    public void setCreation_date(String creation_date) {
        this.creation_date = creation_date;
    }

    public User getOwner() {
        return Owner;
    }

    public void setOwner(User owner) {
        Owner = owner;
    }

    public int getMin_team_size() {
        return min_team_size;
    }

    public void setMin_team_size(int min_team_size) {
        this.min_team_size = min_team_size;
    }

    public int getMax_team_size() {
        return max_team_size;
    }

    public void setMax_team_size(int max_team_size) {
        this.max_team_size = max_team_size;
    }

    public float getFee() {
        return fee;
    }

    public void setFee(float fee) {
        this.fee = fee;
    }

    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getJudge_screenname() {
        return judge_screenname;
    }

    public void setJudge_screenname(String judge_screenname) {
        this.judge_screenname = judge_screenname;
    }

    public List<Team> getTeams() {
        return teams;
    }

    public void setTeams(List<Team> teams) {
        this.teams = teams;
    }

    public Organization getSponser() {
        return sponser;
    }

    public void setSponser(Organization sponser) {
        this.sponser = sponser;
    }
}
