package mage.tracker.repository;


import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

/**
 * 
 * @author North
 */
@Repository
public class GenericRepository<Object> {

    @PersistenceContext
    private EntityManager em;

    public Object persist(Object entity) {
        em.persist(entity);
        return entity;
    }

    public Object merge(Object entity) {
        return em.merge(entity);
    }

    public void remove(Object entity) {
        em.remove(entity);
    }

    public Object find(Class<Object> clazz, Long id) {
        return em.find(clazz, id);
    }
}
