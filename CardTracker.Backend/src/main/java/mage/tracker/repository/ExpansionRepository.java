package mage.tracker.repository;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import mage.tracker.domain.Expansion;
import org.springframework.stereotype.Repository;

/**
 *
 * @author North
 */
@Repository
public class ExpansionRepository extends GenericRepository<Expansion> {

    @PersistenceContext
    private EntityManager em;

    public Expansion findByName(String name) {
        TypedQuery query = em.createNamedQuery(Expansion.FIND_BY_NAME, Expansion.class);
        query.setParameter(1, name);
        List<Expansion> resultList = query.getResultList();
        if (resultList.isEmpty()) {
            return null;
        } else {
            return resultList.get(0);
        }
    }

    public Expansion findByCode(String code) {
        TypedQuery query = em.createNamedQuery(Expansion.FIND_BY_CODE, Expansion.class);
        query.setParameter(1, code);
        List<Expansion> resultList = query.getResultList();
        if (resultList.isEmpty()) {
            return null;
        } else {
            return resultList.get(0);
        }
    }
}
