package com.openhack.dao;

import com.openhack.model.Organization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Repository
public class OrganizationDao {

    @Autowired
    private EntityManager entityManager;

    public void createItem(Organization organization){this.entityManager.persist(organization);}

    public Organization findItemById(Long id){
        Organization organization = entityManager.find(Organization.class,id);
        return organization;
    }

    public Organization findItemByName(String org_name){
        Query query = this.entityManager.createNativeQuery("select * from organization where name like :org_name",Organization.class);
        query.setParameter("org_name",org_name);
        if(query.getResultList().isEmpty()) return null;
        return (Organization) query.getResultList().get(0);
    }


    public List readOrgNames(){
        Query query = this.entityManager.createNativeQuery("select * from organization",Organization.class);
        if(query.getResultList().isEmpty()) return null;

        return query.getResultList();
    }

    public List findItems() {
        Query query = this.entityManager.createNativeQuery("select * from organization",Organization.class);
        if(query.getResultList().isEmpty()) return null;
        return query.getResultList();
    }

}
