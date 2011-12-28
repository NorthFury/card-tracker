package mage.tracker.repository;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import mage.tracker.domain.CardEdition;
import org.springframework.stereotype.Repository;

/**
 *
 * @author North
 */
@Repository
public class CardEditionRepository extends GenericRepository<CardEdition> {

    @PersistenceContext
    private EntityManager em;

    public CardEdition findByNameAndExpansion(String name, String expansion) {
        TypedQuery query = em.createNamedQuery(CardEdition.FIND_BY_NAME_AND_EXPANSION, CardEdition.class);
        query.setParameter(1, name);
        query.setParameter(2, expansion);
        List<CardEdition> resultList = query.getResultList();
        if (resultList.isEmpty()) {
            return null;
        } else {
            return resultList.get(0);
        }
    }

    public CardEdition findByNameAndExpansionCode(String name, String code) {
        TypedQuery query = em.createNamedQuery(CardEdition.FIND_BY_NAME_AND_EXPANSION_CODE, CardEdition.class);
        query.setParameter(1, name);
        query.setParameter(2, code);
        List<CardEdition> resultList = query.getResultList();
        if (resultList.isEmpty()) {
            return null;
        } else {
            return resultList.get(0);
        }
    }
}
