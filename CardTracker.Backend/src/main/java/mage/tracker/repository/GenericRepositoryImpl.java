package mage.tracker.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;

import org.springframework.stereotype.Repository;

/**
 * 
 * @author North
 */
@Repository
public class GenericRepositoryImpl<Object> implements GenericRepository<Object> {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Object persist(Object entity) {
        em.persist(entity);
        return entity;
    }

    @Override
    public Object merge(Object entity) {
        return em.merge(entity);
    }

    @Override
    public void remove(Object entity) {
        em.remove(entity);
    }

    @Override
    public Object find(Class<Object> clazz, Long id) {
        return em.find(clazz, id);
    }

    @Override
    public List<Object> findAll(Class<Object> clazz) {
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<Object> query = builder.createQuery(clazz);
        query.select(query.from(clazz));
        return em.createQuery(query).getResultList();
    }
}
