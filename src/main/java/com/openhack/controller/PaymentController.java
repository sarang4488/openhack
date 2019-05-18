package com.openhack.controller;

import com.openhack.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private EmailActivationLink emailActivationLink;

    ResponseHeader responseHeader = new ResponseHeader();

    @RequestMapping(value = "/payment/{uid}/amount/{hid}" , method = {RequestMethod.GET})
    public ResponseEntity<?> getPaymentAmount(@PathVariable Long uid,
                                              @PathVariable Long hid){

        ResponseEntity responseEntity = paymentService.getPaymentAmount(uid,hid);
        return new ResponseEntity<>(responseEntity, responseHeader.getHeader(), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/payment/{uid}/paid/{hid}" , method = {RequestMethod.POST})
    public ResponseEntity<?> updatePaymentStatus(@PathVariable Long uid,
                                              @PathVariable Long hid){
        ResponseEntity responseEntity = paymentService.createPayment(uid,hid);



        return new ResponseEntity<>(responseEntity, responseHeader.getHeader(), HttpStatus.CREATED);
    }
}
