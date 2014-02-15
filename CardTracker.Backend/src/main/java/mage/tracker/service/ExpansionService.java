package mage.tracker.service;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import mage.tracker.domain.Expansion;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author North
 */
@Service
@Transactional(readOnly = true)
public class ExpansionService {

    @PersistenceContext
    private EntityManager em;

    @Transactional(readOnly = false)
    public Expansion save(Expansion expansion) {
        Expansion result = findByName(expansion.getName());
        if (result == null) {
            em.persist(expansion);
            result = expansion;
        } else {
            result.setReleaseDate(expansion.getReleaseDate());
            result.setName(expansion.getName());
            em.merge(result);
        }
        return result;
    }

    public Expansion findByName(String name) {
        TypedQuery query = em.createNamedQuery(Expansion.FIND_BY_NAME, Expansion.class);
        query.setParameter("name", name);
        List<Expansion> resultList = query.getResultList();
        if (resultList.isEmpty()) {
            return null;
        } else {
            return resultList.get(0);
        }
    }

    public Expansion findByCode(String code) {
        TypedQuery query = em.createNamedQuery(Expansion.FIND_BY_CODE, Expansion.class);
        query.setParameter("code", code);
        List<Expansion> resultList = query.getResultList();
        if (resultList.isEmpty()) {
            return null;
        } else {
            return resultList.get(0);
        }
    }

    public List<Expansion> findAll() {
        TypedQuery query = em.createNamedQuery(Expansion.FIND_ALL, Expansion.class);
        return query.getResultList();
    }
}
