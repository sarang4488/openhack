package com.openhack.dao;

import com.openhack.model.Hackathon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Repository
public class HackathonDao {
    @Autowired
    private EntityManager entityManager;

    @Transactional
    public void createItem(Hackathon hackathon){this.entityManager.persist(hackathon);}


    public List finditems(){
        Query query = this.entityManager.createNativeQuery("select * from hackathon",Hackathon.class);
        if(query.getResultList().isEmpty()) return new ArrayList<Hackathon>();
        return query.getResultList();
    }

    public Hackathon findItemById(Long id){
        Hackathon organization = entityManager.find(Hackathon.class,id);
        return organization;
    }

}
