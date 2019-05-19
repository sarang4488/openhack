package com.openhack.dao;

import com.openhack.model.TeamMember;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;

@Repository
public class TeamMemberDao {

    @Autowired
    private EntityManager entityManager;

    public void createItem(TeamMember teamMember){this.entityManager.persist(teamMember);}

    public TeamMember findItemByUid(int uid){
        Query query = this.entityManager.createNativeQuery("select * from team_member where uid=uid",TeamMember.class);
        query.setParameter("uid",uid);
        if(query.getResultList().isEmpty()) return null;
        return (TeamMember) query.getResultList().get(0);
    }

    public TeamMember deleteItem(Long id){
        TeamMember teamMember = this.entityManager.find(TeamMember.class, id);
        this.entityManager.remove(teamMember);
        this.entityManager.flush();
        return teamMember;
    }

}
