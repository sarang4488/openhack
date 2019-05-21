package com.openhack.Response;

public class ExpenseReport {
    private Double sponser_earnings;
    int payment_count = 0;
    int not_pay_count = 0;
    float paid_total = 0;
    //float not_paid_total = 0;


    public ExpenseReport(Double sponser_earnings, int payment_count, int not_pay_count, float paid_total) {
        this.sponser_earnings = sponser_earnings;
        this.payment_count = payment_count;
        this.not_pay_count = not_pay_count;
        this.paid_total = paid_total;
    }

    public Double getSponser_earnings() {
        return sponser_earnings;
    }

    public void setSponser_earnings(Double sponser_earnings) {
        this.sponser_earnings = sponser_earnings;
    }

    public int getPayment_count() {
        return payment_count;
    }

    public void setPayment_count(int payment_count) {
        this.payment_count = payment_count;
    }

    public int getNot_pay_count() {
        return not_pay_count;
    }

    public void setNot_pay_count(int not_pay_count) {
        this.not_pay_count = not_pay_count;
    }

    public float getPaid_total() {
        return paid_total;
    }

    public void setPaid_total(float paid_total) {
        this.paid_total = paid_total;
    }
}
