package com.openhack.Response;

import java.util.ArrayList;
import java.util.List;

public class HackathonPaymentReportResponse {

    private String team_name;
    private List<TeamMemberPaymentReport> team_members = new ArrayList<>();

    public HackathonPaymentReportResponse(String team_name, List<TeamMemberPaymentReport> team_members) {
        this.team_name = team_name;
        this.team_members = team_members;
    }

    public String getTeam_name() {
        return team_name;
    }

    public void setTeam_name(String team_name) {
        this.team_name = team_name;
    }

    public List<TeamMemberPaymentReport> getTeam_members() {
        return team_members;
    }

    public void setTeam_members(List<TeamMemberPaymentReport> team_members) {
        this.team_members = team_members;
    }
}
