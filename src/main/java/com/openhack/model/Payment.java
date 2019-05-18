package com.openhack.model;

import javax.persistence.*;

@Entity
public class Payment {

    @Id
    @Column(name = "pid")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long pid;

    @ManyToOne
    @JoinColumn(name = "hid")
    private Hackathon hackathon;

    @Column(name = "uid")
    private long uid;

    public Payment() {
    }

    public Payment(long pid, Hackathon hackathon, long uid) {
        this.pid = pid;
        this.hackathon = hackathon;
        this.uid = uid;
    }

    public long getPid() {
        return pid;
    }

    public void setPid(long pid) {
        this.pid = pid;
    }

    public Hackathon getHackathon() {
        return hackathon;
    }

    public void setHackathon(Hackathon hackathon) {
        this.hackathon = hackathon;
    }

    public long getUid() {
        return uid;
    }

    public void setUid(long uid) {
        this.uid = uid;
    }
}
