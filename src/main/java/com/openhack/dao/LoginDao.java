package com.openhack.dao;

import com.openhack.model.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;

@Repository
public class LoginDao {

    @Autowired
    private EntityManager entityManager;

    public LoginDao(){

    }

    @Transactional
    public Login createItem(Login login){
        entityManager.persist(login);
        return login;
    }

    @Transactional
    public Login findByEmail(String email){
        Query query = this.entityManager.createNativeQuery("select * from login where email like :email", Login.class);
        query.setParameter("email",email);
        if(query.getResultList().isEmpty()) return null;
        return (Login) query.getResultList().get(0);
    }

}
