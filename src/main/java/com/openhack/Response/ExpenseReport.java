package com.openhack.Response;

public class ExpenseReport {
    private int number_of_sponsers;
    int payment_count = 0;
    int not_pay_count = 0;
    float paid_total = 0;
    float not_paid_total = 0;


    public ExpenseReport(int number_of_sponsers, int payment_count, int not_pay_count, float paid_total, float not_paid_total) {
        this.number_of_sponsers = number_of_sponsers;
        this.payment_count = payment_count;
        this.not_pay_count = not_pay_count;
        this.paid_total = paid_total;
        this.not_paid_total = not_paid_total;
    }

    public int getNumber_of_sponsers() {
        return number_of_sponsers;
    }

    public void setNumber_of_sponsers(int number_of_sponsers) {
        this.number_of_sponsers = number_of_sponsers;
    }

    public float getNot_paid_total() {
        return not_paid_total;
    }

    public void setNot_paid_total(float not_paid_total) {
        this.not_paid_total = not_paid_total;
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
