package com.openhack.services;

import com.openhack.Response.TeamResponse;
import com.openhack.dao.HackathonDao;
import com.openhack.dao.TeamDao;
import com.openhack.dao.TeamMemberDao;
import com.openhack.dao.UserDao;
import com.openhack.model.Hackathon;
import com.openhack.model.Team;
import com.openhack.model.TeamMember;
import com.openhack.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class TeamService {
    @Autowired
    private TeamDao teamDao;

    @Autowired
    private HackathonDao hackathonDao;

    @Autowired
    private TeamMemberDao teamMemberDao;

    @Autowired
    private UserDao userDao;

    @Transactional
    public ResponseEntity<?> createTeam(Long hid){
        Hackathon hackathon = hackathonDao.findItemById(Optional.ofNullable(hid).orElse(-1L));

        Team team = new Team();
        team.setHackathon(hackathon);

        teamDao.createItem(team);

        TeamResponse teamResponse = new TeamResponse(team);

        return ResponseEntity.ok().body(teamResponse);
    }

    @Transactional
    public ResponseEntity<?> registerTeam(Long hid,
                                          String team_name,
                                          String leader_screenname,
                                          String leader_rold,
                                          String member2_screenname,
                                          String member2_role,
                                          String member3_screenname,
                                          String member3_role,
                                          String member4_screenname,
                                          String member4_email) {

        long hackid = Optional.ofNullable(hid).orElse(-1L);
        Hackathon hackathon = hackathonDao.findItemById(hackid);
        User user = userDao.findByScreenname(leader_screenname);
        User user2=null;
        User user3=null;
        User user4=null;

        Date date1 = null;
        Date date2 = null;

        try {
            date1 = new SimpleDateFormat("yyyy-MM-dd").parse(hackathon.getStart_date());
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
            String s2 = simpleDateFormat.format(new Date());
            date2 = new SimpleDateFormat("yyy-MM-dd").parse(s2);

            if (date2.compareTo(date1) > 0) {
                return ResponseEntity.badRequest().body("Hackathon already started");
            }
        }catch (Exception e){
            return ResponseEntity.badRequest().body("Cannot parse date exception");
        }


        Team team = new Team();
        team.setHackathon(hackathon);

        String owner = hackathon.getOwner().getName();
        String [] judges = hackathon.getJudge_screenname().split("\\$");


        long tid = team.getTid();
        String id = ""+Long.toString(tid)+"_"+Long.toString(hackid);

        TeamMember teamMember1 = new TeamMember();
        teamMember1.setTeam(team);
        teamMember1.setMember_id((int)user.getUid());
        teamMember1.setP_status("None");


        //System.out.println(member2_screenname);
        //System.out.println(member2_screenname.equals("undefined"));
        
        TeamMember teamMember2 = null ;
        if(member2_screenname != null && !member2_screenname.equals("undefined")) {

            if(member2_screenname.equals(owner))
                return ResponseEntity.badRequest().body(owner+" is the owner. Owner cannot register for his hackathon");

            if(Arrays.asList(judges).contains(member2_screenname))
                return ResponseEntity.badRequest().body(member2_screenname+" is a judge. A judge cannot be registerd fot the same hackathon");

            user2 = userDao.findByScreenname(member4_screenname);
            teamMember2 = new TeamMember();

            if(user2 != null ) {
                teamMember2.setMember_id((int) user2.getUid());
                teamMember2.setTeam(team);
                teamMember2.setP_status("None");
            }
            else{
                return ResponseEntity.badRequest().body(member2_screenname+" is not a valid member in the system.");
            }

        }


        TeamMember teamMember3 = null;
        if(member3_screenname != null && !member3_screenname.equals("undefined")) {

            if(member3_screenname.equals(owner))
                return ResponseEntity.badRequest().body(owner+" is the owner. Owner cannot register for his hackathon");

            if(Arrays.asList(judges).contains(member3_screenname))
                return ResponseEntity.badRequest().body(member3_screenname+" is a judge. A judge cannot be registerd fot the same hackathon");

            user3 = userDao.findByScreenname(member4_screenname);
            teamMember3 = new TeamMember();

            if(user3 != null) {
                teamMember3.setMember_id((int) user3.getUid());
                teamMember3.setTeam(team);
                teamMember3.setP_status("None");

            }else{
                return ResponseEntity.badRequest().body(member3_screenname+" is not a valid member in the system.");
            }
        }


        TeamMember teamMember4 = null;
        if(member4_screenname != null && !member4_screenname.equals("undefined")) {

            if(member4_screenname.equals(owner))
                return ResponseEntity.badRequest().body(owner+" is the owner. Owner cannot register for his hackathon");

            if(Arrays.asList(judges).contains(member4_screenname))
                return ResponseEntity.badRequest().body(member4_screenname+" is a judge. A judge cannot be registerd fot the same hackathon");

            user4 = userDao.findByScreenname(member4_screenname);
            teamMember4 = new TeamMember();

            if(user4 != null) {
                teamMember4.setMember_id((int) user4.getUid());
                teamMember4.setTeam(team);
                teamMember4.setP_status("None");

            }
            else{
                return ResponseEntity.badRequest().body(member4_screenname+" is not a valid member in the system.");
            }
        }

        teamDao.createItem(team);
        teamMemberDao.createItem(teamMember1);
        if(teamMember2 != null)
            teamMemberDao.createItem(teamMember2);
        if(teamMember3 != null)
            teamMemberDao.createItem(teamMember3);
        if(teamMember4 != null)
            teamMemberDao.createItem(teamMember4);

        Team updated_team = teamDao.findById(team.getTid());

        TeamResponse teamResponse = new TeamResponse(updated_team);

        return ResponseEntity.ok().body(teamResponse);

    }

    @Transactional
    public ResponseEntity<?> updateTeamScore(long tid,
                                             float score){



        Team team = teamDao.findById(tid);
        if(team != null){

            Hackathon hackathon = team.getHackathon();
            if(hackathon.getStatus().equals("opened"))
                return ResponseEntity.badRequest().body("Admin has not opened hackthon for grading yet.");

            team.setScore(score);
        }

        return ResponseEntity.ok().body("Score submitted");

    }

    @Transactional
    public ResponseEntity<?> getTeams(String hackName){
        Hackathon hackathon = hackathonDao.findItemByName(hackName);
        List<Team> allTeams = teamDao.findTeams();
        List<TeamResponse> hackTeams = new ArrayList<>();

        if(allTeams != null) {
            for (Team team :
                    allTeams) {
                if (team.getHackathon().getHid() == hackathon.getHid()) {
                    TeamResponse teamResponse = new TeamResponse(team);
                    hackTeams.add(teamResponse);
                }
            }
        }
        return ResponseEntity.ok().body(hackTeams);

    }

}
