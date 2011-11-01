package mage.tracker.repository;

import java.util.List;

/**
 * Generic repository for entities.
 * 
 * @author North
 */
public interface GenericRepository<T> {

    public T persist(T entity);

    public T merge(T entity);

    public void remove(T entity);

    public T find(Class<T> clazz, Long id);

    public List<T> findAll(Class<T> clazz);
}
