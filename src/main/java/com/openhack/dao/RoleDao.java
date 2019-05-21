package com.openhack.dao;

import com.openhack.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
public class RoleDao {

    @Autowired
    private EntityManager entityManager;

    public void createItem(Role role){this.entityManager.persist(role);}

}
