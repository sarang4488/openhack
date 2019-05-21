package com.openhack.model;

import javax.persistence.*;

@Entity
public class TeamMember {

    @Id
    @Column(name = "tmid")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long tmid;

    @ManyToOne
    @JoinColumn(name = "tid")
    private Team team;

    @Column(name = "uid")
    private int member_id;

    @Column(name = "member_role")
    private String member_role;

    @Column(name = "p_status")
    private String p_status;

    @Column(name = "amount")
    private float amount;

    @Column(name = "payment_date")
    private String payment_date;

    public TeamMember() {

    }

    public TeamMember(long tmid, Team team, int member_id, String member_role, String p_status,float amount,String payment_date) {
        this.tmid = tmid;
        this.team = team;
        this.member_id = member_id;
        this.member_role = member_role;
        this.p_status = p_status;
        this.amount = amount;
        this.payment_date = payment_date;
    }

    public long getTmid() {
        return tmid;
    }

    public void setTmid(long tmid) {
        this.tmid = tmid;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public int getMember_id() {
        return member_id;
    }

    public void setMember_id(int member_id) {
        this.member_id = member_id;
    }

    public String getMember_role() {
        return member_role;
    }

    public void setMember_role(String member_role) {
        this.member_role = member_role;
    }

    public String getP_status() {
        return p_status;
    }

    public void setP_status(String p_status) {
        this.p_status = p_status;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public String getPayment_date() {
        return payment_date;
    }

    public void setPayment_date(String payment_date) {
        this.payment_date = payment_date;
    }
}
