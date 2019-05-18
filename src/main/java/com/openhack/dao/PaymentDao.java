package com.openhack.dao;

import com.openhack.model.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
public class PaymentDao {

    @Autowired
    private EntityManager entityManager;

    public void createItem(Payment payment){this.entityManager.persist(payment);}



}
