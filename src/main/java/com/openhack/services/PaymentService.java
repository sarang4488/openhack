package com.openhack.services;

import com.openhack.Response.HackathonPaymentReportResponse;
import com.openhack.Response.HackathonReportResponse;
import com.openhack.Response.TeamMemberPaymentReport;
import com.openhack.dao.*;
import com.openhack.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {
    @Autowired
    private PaymentDao paymentDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private TeamDao teamDao;

    @Autowired
    private HackathonDao hackathonDao;

    @Autowired
    private TeamMemberDao teamMemberDao;

    @Autowired
    private OrganizationDao organizationDao;

    @Transactional
    public ResponseEntity<?> createPayment(String screenname,Long hid){
        User user = userDao.findByScreenname(screenname);
        Hackathon hackathon = hackathonDao.findItemById(Optional.ofNullable(hid).orElse(-1L));

        System.out.println(user.getUid());


        TeamMember teamMember = teamMemberDao.findItemByUid((int)user.getUid());


        System.out.println(teamMember == null);

        if(teamMember.getP_status().equals("Paid"))
            return ResponseEntity.badRequest().body("Payment already received for this hackathon");

        teamMember.setP_status("Paid");

        Payment payment = new Payment();
        payment.setHackathon(hackathon);
        payment.setUid(user.getUid());

        paymentDao.createItem(payment);

        return ResponseEntity.ok().body("Payment Successfull");

    }

    @Transactional
    public ResponseEntity<?> getPaymentAmount(String screenname,Long hid){
        User user = userDao.findByScreenname(screenname);
        Hackathon hackathon = hackathonDao.findItemById(Optional.ofNullable(hid).orElse(-1L));

        float fee = hackathon.getFee();
        int discount = hackathon.getDiscount();
        float amount = fee;
        if(user != null) {

            String [] org_names = hackathon.getSponser().split("$");
            for (String org_name:
                 org_names) {

                if(user.getOrganization() != null) {
                    if (user.getOrganization().getName().equals(org_name) && user.getOrgStatus().equals("Approved") && discount != 0) {
                        amount = (fee * discount) / 100;
                    }
                }
            }

        }
        return ResponseEntity.ok().body(Float.toString(amount));
    }

    @Transactional
    public ResponseEntity<?> getTeamsPayment(String hackName){
        Hackathon hackathon = hackathonDao.findItemByName(hackName);
        List<Team> allTeams = teamDao.findTeams();
        List<HackathonPaymentReportResponse> hackathonPaymentReportResponses = new ArrayList<>();

        if(allTeams != null){
            for (Team team:
                    allTeams) {
                if(team.getHackathon().getHid() == hackathon.getHid()){
                    List<TeamMember> teamMembers = team.getTeamMembers();
                    List<TeamMemberPaymentReport> teamMemberPaymentReports = new ArrayList<>();

                    for(TeamMember teamMember : teamMembers){
                        User user = userDao.findById((long)teamMember.getMember_id());
                        TeamMemberPaymentReport teamMemberPaymentReport = new TeamMemberPaymentReport(user.getScreenName(),30,teamMember.getP_status(),"2019-05-20");
                        teamMemberPaymentReports.add(teamMemberPaymentReport);
                    }

                    System.out.println(teamMemberPaymentReports.size());

                    HackathonPaymentReportResponse hackathonPaymentReportResponse = new HackathonPaymentReportResponse(team.getTid(),teamMemberPaymentReports);
                    hackathonPaymentReportResponses.add(hackathonPaymentReportResponse);
                }
            }
        }

        return ResponseEntity.ok().body(hackathonPaymentReportResponses);
    }

}
