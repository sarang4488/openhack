package com.openhack.Response;


import com.openhack.model.Hackathon;
import com.openhack.model.Organization;
import com.openhack.model.Team;
import com.openhack.model.User;

import java.util.ArrayList;
import java.util.List;

class HackOwnerResponse{
    private String name;
    private String screenname;
    private String email;

    public HackOwnerResponse(String name, String screenname, String email) {
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

class HackSponserResponse{
    private long id;
    private String name;
    private String description;

    public HackSponserResponse(long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

class HackTeamResponse{
    private long id;

    public HackTeamResponse(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}

public class HackathonResponse {
    private long id;
    private String name;
    private String start_date;
    private String end_date;
    private String creation_date;
    private int min_team_size;
    private int max_team_size;
    private float fee;
    private int discount;
    private String status;
    private HackOwnerResponse owner;
    private HackSponserResponse sponser;

    private List<HackTeamResponse> teams = new ArrayList<HackTeamResponse>();

    public HackathonResponse(Hackathon hackathon) {
        this.id = hackathon.getHid();
        this.name = hackathon.getName();
        this.start_date = hackathon.getStart_date();
        this.end_date = hackathon.getEnd_date();
        this.creation_date = hackathon.getCreation_date();
        this.min_team_size = hackathon.getMin_team_size();
        this.max_team_size = hackathon.getMax_team_size();
        this.fee = hackathon.getFee();
        this.discount = hackathon.getDiscount();
        this.status = hackathon.getStatus();

        User user = hackathon.getOwner();

        if(user != null){
            this.owner = new HackOwnerResponse(user.getName(),user.getScreenName(),user.getEmail());
        }

        Organization organization = hackathon.getSponser();
        if(organization != null){
            this.sponser = new HackSponserResponse(organization.getOid(),organization.getName(),organization.getDesciption());
        }

        List<Team> team_list = hackathon.getTeams();
        for (Team t:
             team_list) {
            teams.add(new HackTeamResponse(t.getTid()));
        }
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public HackOwnerResponse getOwner() {
        return owner;
    }

    public void setOwner(HackOwnerResponse owner) {
        this.owner = owner;
    }

    public HackSponserResponse getSponser() {
        return sponser;
    }

    public void setSponser(HackSponserResponse sponser) {
        this.sponser = sponser;
    }

    public List<HackTeamResponse> getTeams() {
        return teams;
    }

    public void setTeams(List<HackTeamResponse> teams) {
        this.teams = teams;
    }
}
