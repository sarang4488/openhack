package com.openhack.dao;

import org.hibernate.usertype.UserVersionType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import com.openhack.model.*;

import java.util.List;


/**
 * UserDAO class
 *
 */

@Repository
public class UserDao {

	@Autowired
	private EntityManager entityManager;

	public UserDao(){

    }

	/**
	 * findById method which return the user based on id
	 * @param uid
	 * @return user, if found, otherwise null
	 */
	public User findById(long uid) {
		User user=this.entityManager.find(User.class, uid);
		return user;
	}

	public User findByScreenname(String screenname){
        Query query = this.entityManager.createNativeQuery("select * from user where screen_name like :screenname",User.class);
        query.setParameter("screenname",screenname);
        if(query.getResultList().isEmpty()) return null;
        return (User)query.getResultList().get(0);
    }


    public User findByEmail(String email){
        Query query = this.entityManager.createNativeQuery("select * from user where email like :email",User.class);
        query.setParameter("email",email);
        if(query.getResultList().isEmpty()) return null;
        return (User)query.getResultList().get(0);
    }

    public List readItems(){
        Query query = this.entityManager.createNativeQuery("select * from user;",User.class);
        if(query.getResultList().isEmpty()) return null;

        return query.getResultList();
    }

	@Transactional
	public void createItem(User user) {
		this.entityManager.persist(user);
	}
	
	public User updateUser(User user) {
		return this.entityManager.merge(user);
	}

	
	public User deleteById(long id) {
		User user=this.entityManager.find(User.class, id);
		this.entityManager.remove(user);
		this.entityManager.flush();
		return user;
	}
	
	public User deleteByEmail(String email) {
		Query query = this.entityManager.createNativeQuery("select * from user where email like :email",User.class);
		query.setParameter("email",email);
        if(query.getResultList().isEmpty()) return null;
        return (User)query.getResultList().get(0);
	}
}
