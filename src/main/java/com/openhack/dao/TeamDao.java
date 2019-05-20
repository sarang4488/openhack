package com.openhack.dao;

import com.openhack.model.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Repository
public class TeamDao {
    @Autowired
    private EntityManager entityManager;

    public void createItem(Team team){this.entityManager.persist(team);}

    public Team findById(Long id){
        Team team=this.entityManager.find(Team.class, id);
        return team;
    }

    public List findTeams(){
        Query query = this.entityManager.createNativeQuery("select * from team",Team.class);
        if(query.getResultList().isEmpty()) return null;
        return query.getResultList();
    }

    public List findTeamsByHackathon(Long hid){
        Query query = this.entityManager.createNativeQuery("select * from team where hid = ?",Team.class);
        query.setParameter(1,hid);
        if(query.getResultList().isEmpty()) return null;
        return query.getResultList();
    }

    public Team deleteItem(Long id){
        Team team = this.entityManager.find(Team.class, id);
        this.entityManager.remove(team);
        this.entityManager.flush();
        return team;
    }

}
