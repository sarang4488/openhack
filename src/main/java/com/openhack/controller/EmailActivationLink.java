package com.openhack.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component

public class EmailActivationLink {

    @Autowired
    public JavaMailSender javaMailSender;

    public void sendActivationLink(String email){

        String html = "Activation link http://localhost:3000/redirect";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Activation for OpenHack");
        message.setText(html);

        System.out.println(javaMailSender);

        javaMailSender.send(message);
    }

    public void sendActivationLinkTeamMember(String email,String name){
        String html = "Registration link for hackathon : "+name+" http://";
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Activation for OpenHack");
        message.setText(html);

        System.out.println(javaMailSender);

        javaMailSender.send(message);
    }

    public void sendPaymentLink(String email,String hackname,String screenname){
        String html = "Please use the following payment link";
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Payment for hackathon");
        message.setText(html);
        javaMailSender.send(message);
    }

    public void sendPaymentInvoice(String email,float amount){
        String html = "Amount : "+Float.toString(amount)+"received";
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Activation for OpenHack");
        message.setText(html);

        System.out.println(javaMailSender);

        javaMailSender.send(message);
    }

}
