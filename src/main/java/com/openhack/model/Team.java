package com.openhack.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Team {

    @Id
    @Column(name = "tid")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long tid;

    @ManyToOne
    @JoinColumn(name = "hid")
    private Hackathon hackathon;

//    @Column(name = "team_name")
//    private String team_name;


    @OneToMany(fetch = FetchType.EAGER, mappedBy = "team")
    @JsonIgnore
    private List<TeamMember> teamMembers = new ArrayList<TeamMember>();

    @Column(name = "score")
    private float score;

    @Column(name = "code_url")
    private String code_url;

    public Team() {
    }

    public Team(long tid, Hackathon hackathon, List<TeamMember> teamMembers, float score) {
        this.tid = tid;
        this.hackathon = hackathon;
        this.teamMembers = teamMembers;
        this.score = score;
    }

    public long getTid() {
        return tid;
    }

    public void setTid(long tid) {
        this.tid = tid;
    }

    public Hackathon getHackathon() {
        return hackathon;
    }

    public void setHackathon(Hackathon hackathon) {
        this.hackathon = hackathon;
    }

    public List<TeamMember> getTeamMembers() {
        return teamMembers;
    }

    public void setTeamMembers(List<TeamMember> teamMembers) {
        this.teamMembers = teamMembers;
    }

    public float getScore() {
        return score;
    }

    public void setScore(float score) {
        this.score = score;
    }

    public String getCode_url() {
        return code_url;
    }

    public void setCode_url(String code_url) {
        this.code_url = code_url;
    }

//    public String getTeam_name() {
//        return team_name;
//    }
//
//    public void setTeam_name(String team_name) {
//        this.team_name = team_name;
//    }
}
