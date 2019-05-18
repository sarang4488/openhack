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
    private TeamHackResponse teamHackResponse;
    private List<TeamMemberResponse> teamMemberResponses = new ArrayList<TeamMemberResponse>();

    public TeamResponse(Team team) {
        this.id = team.getTid();
        Hackathon hackathon = team.getHackathon();
        this.teamHackResponse = new TeamHackResponse(hackathon.getHid(),hackathon.getName());
        List<TeamMember> teamMemberList = team.getTeamMembers();

        for (TeamMember t:
             teamMemberList) {
            teamMemberResponses.add(new TeamMemberResponse(t.getTmid()));
        }
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public TeamHackResponse getTeamHackResponse() {
        return teamHackResponse;
    }

    public void setTeamHackResponse(TeamHackResponse teamHackResponse) {
        this.teamHackResponse = teamHackResponse;
    }

    public List<TeamMemberResponse> getTeamMemberResponses() {
        return teamMemberResponses;
    }

    public void setTeamMemberResponses(List<TeamMemberResponse> teamMemberResponses) {
        this.teamMemberResponses = teamMemberResponses;
    }
}
