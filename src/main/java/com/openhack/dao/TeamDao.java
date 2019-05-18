package com.openhack.dao;

import com.openhack.model.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
public class TeamDao {
    @Autowired
    private EntityManager entityManager;

    public void createItem(Team team){this.entityManager.persist(team);}

    public Team findById(Long id){
        Team team=this.entityManager.find(Team.class, id);
        return team;
    }

}
