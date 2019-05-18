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
import java.util.Optional;

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
                                          String leader_screenname,
                                          String email,
                                          String member2_screenname,
                                          String member2_email,
                                          String member3_screenname,
                                          String member3_email,
                                          String member4_screenname,
                                          String member4_email){

        long hackid = Optional.ofNullable(hid).orElse(-1L);
        Hackathon hackathon = hackathonDao.findItemById(hackid);
        User user = userDao.findByScreenname(leader_screenname);
        User user2=null;
        User user3=null;
        User user4=null;
        Team team = new Team();
        team.setHackathon(hackathon);

        teamDao.createItem(team);

        long tid = team.getTid();
        String id = ""+Long.toString(tid)+"_"+Long.toString(hackid);

        TeamMember teamMember1 = new TeamMember();
        teamMember1.setTeam(team);
        teamMember1.setMember_id((int)user.getUid());
        teamMemberDao.createItem(teamMember1);

        TeamMember teamMember2 = new TeamMember();
        if(member2_screenname != null)
            user2 = userDao.findByScreenname(member4_screenname);

        if(user2 != null)
            teamMember2.setMember_id((int)user2.getUid());

        teamMember2.setTeam(team);
        teamMemberDao.createItem(teamMember2);

        TeamMember teamMember3 = new TeamMember();
        if(member3_screenname != null)
            user3 = userDao.findByScreenname(member4_screenname);

        if(user3 != null)
            teamMember3.setMember_id((int)user3.getUid());

        teamMember3.setTeam(team);
        teamMemberDao.createItem(teamMember3);

        TeamMember teamMember4 = new TeamMember();
        if(member4_screenname != null)
            user4 = userDao.findByScreenname(member4_screenname);

        if(user4 != null)
            teamMember4.setMember_id((int)user4.getUid());

        teamMember4.setTeam(team);
        teamMemberDao.createItem(teamMember4);

        Team updated_team = teamDao.findById(team.getTid());

        TeamResponse teamResponse = new TeamResponse(updated_team);

        return ResponseEntity.ok().body(teamResponse);

    }

}
