package com.openhack.Response;

public class TeamMemberPaymentReport{
    private String member_name;
    private float amount;
    private String p_status;
    private String payment_date;

    public TeamMemberPaymentReport(String member_name, float amount, String p_status, String payment_date) {
        this.member_name = member_name;
        this.amount = amount;
        this.p_status = p_status;
        this.payment_date = payment_date;
    }

    public String getMember_name() {
        return member_name;
    }

    public void setMember_name(String member_name) {
        this.member_name = member_name;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public String getP_status() {
        return p_status;
    }

    public void setP_status(String p_status) {
        this.p_status = p_status;
    }

    public String getPayment_date() {
        return payment_date;
    }

    public void setPayment_date(String payment_date) {
        this.payment_date = payment_date;
    }
}
