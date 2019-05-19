package com.openhack.Response;

import com.openhack.model.Hackathon;
import com.openhack.model.Team;
import com.openhack.model.TeamMember;

import java.util.ArrayList;
import java.util.List;

class TeamHackResponse{
    private long id;
    private String name;

    public TeamHackResponse(long id, String name) {
        this.id = id;
        this.name = name;
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
}

class TeamMemberResponse{
    private long id;

    public TeamMemberResponse(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}

public class TeamResponse {
    private long id;
    private TeamHackResponse hackathon;
    private String submission_url;
    private List<TeamMemberResponse> teamMembers = new ArrayList<TeamMemberResponse>();

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public TeamHackResponse getHackathon() {
        return hackathon;
    }

    public void setHackathon(TeamHackResponse hackathon) {
        this.hackathon = hackathon;
    }

    public List<TeamMemberResponse> getTeamMembers() {
        return teamMembers;
    }

    public void setTeamMembers(List<TeamMemberResponse> teamMembers) {
        this.teamMembers = teamMembers;
    }

    public String getSubmission_url() {
        return submission_url;
    }

    public void setSubmission_url(String submission_url) {
        this.submission_url = submission_url;
    }

    public TeamResponse(Team team) {
        this.id = team.getTid();
        Hackathon hackathon = team.getHackathon();
        this.submission_url = team.getCode_url();
        this.hackathon = new TeamHackResponse(hackathon.getHid(),hackathon.getName());
        List<TeamMember> teamMemberList = team.getTeamMembers();

        for (TeamMember t:
             teamMemberList) {
            teamMembers.add(new TeamMemberResponse(t.getTmid()));
        }
    }


}
