package com.openhack.controller;

import com.openhack.services.HackathonService;
import com.openhack.services.OrganizationService;
import com.openhack.services.TeamService;
import com.openhack.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class HackathonController {

    @Autowired
    private HackathonService hackathonService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private EmailActivationLink emailActivationLink;

    private ResponseHeader responseHeader = new ResponseHeader();


    @RequestMapping(value = "/hackathon", method = {RequestMethod.POST})
    public ResponseEntity<?> postHackathon(@RequestParam(value = "name",required = true) String name,
                                           @RequestParam(value = "start_date",required = false) String start_date,
                                           @RequestParam(value = "end_date",required = false) String end_date,
                                           @RequestParam(value = "creation_date",required = false) String creation_date,
                                           @RequestParam(value = "description", required = false) String description,
                                           @RequestParam(value = "owner_screenname",required = false) String owner_screenname,
                                           @RequestParam(value = "judge_screennames",required = false) String judge_screennames,
                                           @RequestParam(value = "min_team_size",required = false) Integer min_team_size,
                                           @RequestParam(value = "max_team_size",required = false) Integer max_team_size,
                                           @RequestParam(value = "fee",required = false) Float fee,
                                           @RequestParam(value = "discount",required = false) Integer discount,
                                           @RequestParam(value = "organization_names",required = false) String organization_names){

        ResponseEntity responseEntity = hackathonService.createHackathon(name,start_date,end_date,creation_date,description,owner_screenname,judge_screennames,min_team_size,max_team_size,fee,discount,"created",organization_names);
        return new ResponseEntity<>(responseEntity, responseHeader.getHeader(), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/hackathon", method = {RequestMethod.GET})
    public ResponseEntity<?> getHackathonList(){

        ResponseEntity responseEntity = hackathonService.readHackathonList();
        return new ResponseEntity<>(responseEntity, responseHeader.getHeader(), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/hackathon/names/{screenname}", method = {RequestMethod.GET})
    public ResponseEntity<?> getHackathonList(@PathVariable String screenname){

        ResponseEntity responseEntity = hackathonService.readHackathonByOwner(screenname);
        return new ResponseEntity<>(responseEntity, responseHeader.getHeader(), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/hackathon/registered/{screenname}", method = {RequestMethod.GET})
    public ResponseEntity<?> getRegsiterhackathons(@PathVariable String screenname){

        ResponseEntity responseEntity = hackathonService.regsiteredHackathons(screenname);
        return new ResponseEntity<>(responseEntity, responseHeader.getHeader(), HttpStatus.CREATED);
    }


    @RequestMapping(value = "/hackathon/{hid}", method = {RequestMethod.GET})
    public ResponseEntity<?> getHackathon(@PathVariable Long hid){
        ResponseEntity responseEntity = hackathonService.readHackathon(hid);
        return new ResponseEntity<>(responseEntity, responseHeader.getHeader(), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/hackathon/{hid}/register", method = {RequestMethod.POST})
    public ResponseEntity<?> registerTeam(@PathVariable Long hid,
                                          @RequestParam(value = "team_name",required = false)String team_name,
                                          @RequestParam(value = "leader_screenname", required = true) String leader_screenname,
                                          @RequestParam(value = "leader_role", required = true) String email,
                                          @RequestParam(value = "member2_screenname", required = false) String member2_screenname,
                                          @RequestParam(value = "member2_role", required = false) String member2_role,
                                          @RequestParam(value = "member3_screenname", required = false) String member3_screenname,
                                          @RequestParam(value = "member3_role", required = false) String member3_role,
                                          @RequestParam(value = "member4_screenname", required = false) String member4_screenname,
                                          @RequestParam(value = "member4_role", required = false) String member4_role){

//        emailActivationLink.sendActivationLinkTeamMember(member2_email,member2_name);
//        emailActivationLink.sendActivationLinkTeamMember(member3_email,member3_name);
//        emailActivationLink.sendActivationLinkTeamMember(member4_email,member4_name);

        ResponseEntity responseEntity = teamService.registerTeam(hid,team_name,leader_screenname,email,member2_screenname,member2_role,member3_screenname,member3_role,member4_screenname,member4_role);

        return new ResponseEntity<>(responseEntity, responseHeader.getHeader(), HttpStatus.CREATED);

    }


    @RequestMapping(value = "hackathon/{hid}/opened")
    public ResponseEntity<?> openHackathon(@PathVariable Long hid){
        ResponseEntity responseEntity = hackathonService.updateHackathonStatus(hid,"opened");
        return new ResponseEntity<>(responseEntity, responseHeader.getHeader(), HttpStatus.CREATED);
    }

    @RequestMapping(value = "hackathon/{hid}/closed")
    public ResponseEntity<?> closeHackathon(@PathVariable Long hid){
        ResponseEntity responseEntity = hackathonService.updateHackathonStatus(hid,"closed");
        return new ResponseEntity<>(responseEntity, responseHeader.getHeader(), HttpStatus.CREATED);
    }

    @RequestMapping(value = "hackathon/{hid}/finalized")
    public ResponseEntity<?> finalizeHackathon(@PathVariable Long hid){
        ResponseEntity responseEntity = hackathonService.updateHackathonStatus(hid,"final");
        return new ResponseEntity<>(responseEntity, responseHeader.getHeader(), HttpStatus.CREATED);
    }

    @RequestMapping(value="hackathon/{tid}/codesubmission",method= {RequestMethod.POST})
    public ResponseEntity<?> codeSubmission(@PathVariable long tid,
                                            @RequestParam(value="code_url",required=true) String code_url){
        ResponseEntity responseEntity=hackathonService.codeSubmission(code_url,tid);
        return new ResponseEntity<>(responseEntity, responseHeader.getHeader(), HttpStatus.CREATED);
    }

    @RequestMapping(value = "hackathon/{tid}/score",method = {RequestMethod.POST})
    public ResponseEntity<?> updateScore(@PathVariable long tid,
                                         @RequestParam(value="score",required=true) float score){

        ResponseEntity responseEntity = teamService.updateTeamScore(tid,score);
        return new ResponseEntity<>(responseEntity, responseHeader.getHeader(), HttpStatus.CREATED);
    }


}
