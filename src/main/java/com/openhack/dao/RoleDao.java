package com.openhack.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
public class RoleDao {

    @Autowired
    private EntityManager entityManager;



}
