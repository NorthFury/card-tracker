package mage.tracker.service;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import mage.tracker.domain.CardEdition;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author North
 */
@Service
@Transactional(readOnly = true)
public class CardEditionService {

    @PersistenceContext
    private EntityManager em;

    @Transactional(readOnly = false)
    public boolean updateMtgoImageId(String cardData) {
        String[] cardAttributes = cardData.split("\\|");
        CardEdition edition = findByNameAndExpansionCode(cardAttributes[1], cardAttributes[0]);
        if (edition != null) {
            edition.setMtgoImageId(cardAttributes[3]);
            em.persist(edition);
            return true;
        }

        return false;
    }

    public CardEdition findByNameAndExpansion(String name, String expansion) {
        TypedQuery query = em.createNamedQuery(CardEdition.FIND_BY_NAME_AND_EXPANSION, CardEdition.class);
        query.setParameter("cardName", name);
        query.setParameter("expansionName", expansion);
        List<CardEdition> resultList = query.getResultList();
        if (resultList.isEmpty()) {
            return null;
        } else {
            return resultList.get(0);
        }
    }

    public CardEdition findByNameAndExpansionCode(String name, String code) {
        TypedQuery query = em.createNamedQuery(CardEdition.FIND_BY_NAME_AND_EXPANSION_CODE, CardEdition.class);
        query.setParameter("cardName", name);
        query.setParameter("expansionCode", code);
        List<CardEdition> resultList = query.getResultList();
        if (resultList.isEmpty()) {
            return null;
        } else {
            return resultList.get(0);
        }
    }
}
