package mage.tracker.repository;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import mage.tracker.domain.Card;
import org.springframework.stereotype.Repository;

/**
 *
 * @author North
 */
@Repository
public class CardRepository extends GenericRepository<Card> {

    @PersistenceContext
    private EntityManager em;

    public Card findByName(String name) {
        TypedQuery query = em.createNamedQuery(Card.FIND_BY_NAME, Card.class);
        query.setParameter("name", name);
        List<Card> resultList = query.getResultList();
        if (resultList.isEmpty()) {
            return null;
        } else {
            return resultList.get(0);
        }
    }
}
