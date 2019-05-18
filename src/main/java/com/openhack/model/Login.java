package com.openhack.model;

import javax.persistence.*;
import javax.websocket.ClientEndpoint;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Login{

    @Id
    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    public Login(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public Login() {

    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}