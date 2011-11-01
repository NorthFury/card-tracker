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
public class CardRepository extends GenericRepositoryImpl<Card> {

    @PersistenceContext
    private EntityManager em;

    public Card findByName(String name) {
        TypedQuery query = em.createQuery("select c from Card c where c.name = ?1", Card.class);
        query.setParameter(1, name);
        List<Card> resultList = query.getResultList();
        if (resultList.isEmpty()) {
            return null;
        } else {
            return resultList.get(0);
        }
    }
}
