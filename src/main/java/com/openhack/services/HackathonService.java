package com.openhack.services;

import com.openhack.Response.HackathonResponse;
import com.openhack.Response.TeamResponse;
import com.openhack.dao.HackathonDao;
import com.openhack.dao.OrganizationDao;
import com.openhack.dao.TeamDao;
import com.openhack.dao.UserDao;
import com.openhack.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class HackathonService {

    @Autowired
    private HackathonDao hackathonDao;

    @Autowired
    private OrganizationDao organizationDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private TeamDao teamDao;


    @Transactional
    public ResponseEntity<?> createHackathon(String name,
                                             String start_date,
                                             String end_date,
                                             String creation_date,
                                             String description,
                                             String owner_screenname,
                                             String judge_screenname,
                                             Integer min_team_size,
                                             Integer max_team_size,
                                             Float fee,
                                             Integer discount,
                                             String status,
                                             String org_names){


        if(name == null || start_date == null || end_date == null || description == null || owner_screenname == null || judge_screenname == null || fee ==null){
            return ResponseEntity.badRequest().body("Please fill up all the fields marked *");
        }

        if(name.equals("") || start_date.equals("") || end_date.equals("") || description.equals("") || owner_screenname.equals("") || judge_screenname.equals("")){
            return ResponseEntity.badRequest().body("Please fill up all the fields marked *");
        }

        Hackathon tmpHack = hackathonDao.findItemByName(name);
        if(tmpHack != null)
            return ResponseEntity.badRequest().body("Hackathon name already in use");


        Hackathon hackathon = new Hackathon();
        hackathon.setName(name);
        hackathon.setStart_date(start_date);
        hackathon.setEnd_date(end_date);
        hackathon.setCreation_date(creation_date);
        hackathon.setDescription(description);

        User owner = userDao.findByScreenname(owner_screenname);
        if(owner.getUserType().equals("admin"))
            hackathon.setOwner(owner);
        else
            return ResponseEntity.badRequest().body("Not authorised to create a hackathon");

        hackathon.setJudge_screenname(judge_screenname);

        hackathon.setMax_team_size(Optional.ofNullable(max_team_size).orElse(-1));
        hackathon.setMin_team_size(Optional.ofNullable(min_team_size).orElse(-1));
        hackathon.setFee(Optional.ofNullable(fee).orElse(-1.0F));
        hackathon.setDiscount(Optional.ofNullable(discount).orElse(-1));
        hackathon.setStatus(status);

        System.out.println(org_names);

        Organization organization = null;
        if( org_names != null){
            hackathon.setSponser(org_names);
        }


        hackathonDao.createItem(hackathon);
        HackathonResponse hackathonResponse = new HackathonResponse(hackathon);
        return ResponseEntity.ok().body(hackathonResponse);
    }

    @Transactional
    public ResponseEntity<?> readHackathonList(){

        List<HackathonResponse> hackathonResponses = new ArrayList<HackathonResponse>();

        List hacks = hackathonDao.finditems();
        for (Object obj:
                hacks) {
            Hackathon tmp = (Hackathon)obj;
            hackathonResponses.add(new HackathonResponse(tmp));
        }

        return ResponseEntity.ok().body(hackathonResponses);
    }

    @Transactional
    public ResponseEntity<?> readHackathonPublic(String screenname){

        List<HackathonResponse> hackathonResponses = new ArrayList<HackathonResponse>();

        List hacks = hackathonDao.finditems();
        for (Object obj:
                hacks) {
            Hackathon tmp = (Hackathon)obj;
            String [] judges = tmp.getJudge_screenname().split("\\$");

            if(!tmp.getOwner().getScreenName().equals(screenname) && !Arrays.asList(judges).contains(screenname))
                hackathonResponses.add(new HackathonResponse(tmp));
        }

        return ResponseEntity.ok().body(hackathonResponses);
    }

    @Transactional
    public ResponseEntity<?> readHackathonByOwner(String screenname){

        List<HackathonResponse> hackathonResponses = new ArrayList<HackathonResponse>();

        List hacks = hackathonDao.finditems();
        for (Object obj:
                hacks) {
            Hackathon tmp = (Hackathon)obj;
            if(tmp.getOwner().getScreenName().equals(screenname))
                hackathonResponses.add(new HackathonResponse(tmp));
        }

        return ResponseEntity.ok().body(hackathonResponses);
    }

    @Transactional
    public ResponseEntity<?> readHackathon(Long id){
        Hackathon hackathon = hackathonDao.findItemById(Optional.ofNullable(id).orElse(-1L));
        HackathonResponse hackathonResponse = new HackathonResponse(hackathon);

        return ResponseEntity.ok().body(hackathonResponse);
    }

    @Transactional
    public ResponseEntity<?> updateHackathonStatus(Long id, String status){
        Hackathon hackathon = hackathonDao.findItemById(Optional.ofNullable(id).orElse(-1L));
        if(!hackathon.getStatus().equals(status))
            hackathon.setStatus(status);
        else
            return ResponseEntity.badRequest().body("Hackathon is already "+status);

        HackathonResponse hackathonResponse = new HackathonResponse(hackathon);

        return ResponseEntity.ok().body(hackathonResponse);
    }

    @Transactional
    public ResponseEntity<?> codeSubmission(String code_url,long tid){
        Team team=teamDao.findById(tid);
        Hackathon hackathon = team.getHackathon();

        List<TeamMember> teamMembers = team.getTeamMembers();
        if(teamMembers == null)
            return ResponseEntity.badRequest().body("No Team Members for this team id");

        for (TeamMember teamMember:
             teamMembers) {
            if(teamMember.getP_status().equals("None"))
                return ResponseEntity.badRequest().body("All team members must pay the fee before code submission");
        }


        if(hackathon.getStatus().equals("opened"))
            team.setCode_url(code_url);
        else
            return ResponseEntity.badRequest().body("Can't submit. Hackathon is closed");
        TeamResponse teamResponse=new TeamResponse(team);
        return ResponseEntity.ok().body(teamResponse);
    }

}
