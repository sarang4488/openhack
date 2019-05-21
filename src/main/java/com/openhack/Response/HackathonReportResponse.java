package com.openhack.Response;

import java.util.List;

public class HackathonReportResponse {
    private Long team_id;
    private List<String> team_members;
    private float score;

    public HackathonReportResponse(Long team_id, List<String> team_members, float score) {
        this.team_id = team_id;
        this.team_members = team_members;
        this.score = score;
    }

    public Long getTeam_id() {
        return team_id;
    }

    public void setTeam_id(Long team_id) {
        this.team_id = team_id;
    }

    public List<String> getTeam_members() {
        return team_members;
    }

    public void setTeam_members(List<String> team_members) {
        this.team_members = team_members;
    }

    public float getScore() {
        return score;
    }

    public void setScore(float score) {
        this.score = score;
    }
}
