/**
 * Copyright (c) 2011 SC The Red Point SA. All rights reserved.
 */
package mage.tracker.service;

import java.math.BigInteger;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;
import mage.tracker.domain.Card;
import mage.tracker.domain.Card_;
import mage.tracker.domain.CardEdition;
import mage.tracker.domain.CardEdition_;
import mage.tracker.domain.CardRarity;
import mage.tracker.domain.CardStatus;
import mage.tracker.domain.Expansion;
import mage.tracker.dto.ExpansionStatus;
import mage.tracker.repository.CardEditionRepository;
import mage.tracker.repository.CardRepository;
import mage.tracker.repository.ExpansionRepository;
import mage.tracker.repository.GenericRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 
 * @author North
 */
@Service
@Transactional(readOnly = true)
public class CardService {

    @PersistenceContext
    private EntityManager em;
    @Autowired
    @Qualifier("cardRepository")
    private CardRepository cardRepository;
    @Autowired
    @Qualifier("cardEditionRepository")
    private CardEditionRepository cardEditionRepository;
    @Autowired
    @Qualifier("expansionRepository")
    private ExpansionRepository expansionRepository;
    @Autowired
    @Qualifier("genericRepository")
    private GenericRepository<CardStatus> cardStatusRepository;

    public List<Card> getCards() {
        return cardRepository.findAll(Card.class);
    }

    public List<Expansion> getExpansions() {
        return expansionRepository.findAll(Expansion.class);
    }

    public List<Card> getCards(int page, int pageSize) {
        TypedQuery query = em.createQuery("select c from Card c", Card.class);

        query.setFirstResult(page * pageSize);
        query.setMaxResults(pageSize);

        return query.getResultList();
    }

    @Transactional(readOnly = false)
    public Card saveCard(Card card) {
        Card result = cardRepository.findByName(card.getName());
        if (result != null) {
            result.setAbilities(card.getAbilities());
            return cardRepository.merge(result);
        } else {
            CardStatus cardStatus = new CardStatus();
            cardStatus = cardStatusRepository.persist(cardStatus);
            card.setCardStatus(cardStatus);
            return cardRepository.persist(card);
        }
    }

    @Transactional(readOnly = false)
    public Expansion saveExpansion(Expansion expansion) {
        Expansion result = expansionRepository.findByName(expansion.getName());
        if (result == null) {
            return expansionRepository.persist(expansion);
        }
        return result;
    }

    /**
     * Used to add a new card or update its data if it already exists
     *
     * @param cardData
     */
    @Transactional(readOnly = false)
    public void updateCardData(String cardData) {
        String[] cardAttributes = cardData.split("\\|");
        Card card = cardRepository.findByName(cardAttributes[1]);
        if (card == null) {
            card = new Card();
            card.setName(cardAttributes[1]);

            String[] cardType = cardAttributes[4].split(" - ");
            card.setType(cardType[0]);
            if (cardType.length > 1) {
                card.setSubType(cardType[1]);
            }

            card.setCost(cardAttributes[2]);
            String[] pt = cardAttributes[7].split(" / ");
            if (pt.length == 2) {
                card.setPower(pt[0]);
                card.setToughness(pt[1]);
            }
            // TODO: Add loyalty
            if (pt.length == 1) {
                card.setToughness(pt[0]);
            }

            CardStatus cardStatus = new CardStatus();
            cardStatus = cardStatusRepository.persist(cardStatus);
            card.setCardStatus(cardStatus);

            card.setAbilities(cardAttributes[5]);

            cardRepository.persist(card);
        } else if (!card.getAbilities().equals(cardAttributes[5])) {
            card.setAbilities(cardAttributes[5]);
            cardRepository.merge(card);
        }

        Expansion expansion = expansionRepository.findByName(cardAttributes[8]);
        if (card != null && expansion != null) {
            if (cardEditionRepository.findByNameAndExpansion(card.getName(), expansion.getName()) == null) {
                CardEdition cardEdition = new CardEdition();
                String rarity = cardAttributes[9];
                if (rarity.equals("Basic Land")) {
                    cardEdition.setRarity(CardRarity.BasicLand);
                } else if (rarity.equals("Common")) {
                    cardEdition.setRarity(CardRarity.Common);
                } else if (rarity.equals("Uncommon")) {
                    cardEdition.setRarity(CardRarity.Uncommon);
                } else if (rarity.equals("Rare")) {
                    cardEdition.setRarity(CardRarity.Rare);
                } else if (rarity.equals("Mythic Rare")) {
                    cardEdition.setRarity(CardRarity.MythicRare);
                } else {
                    cardEdition.setRarity(CardRarity.Special);
                }

                cardEdition.setCardNumber(cardAttributes[10]);
                cardEdition.setGathererId(cardAttributes[0]);
                cardEdition.setCard(card);
                cardEdition.setExpansion(expansion);
                cardEditionRepository.persist(cardEdition);
            }
        }
    }

    @Transactional(readOnly = false)
    public CardStatus updateCardStatus(CardStatus cardStatus) {
        return cardStatusRepository.merge(cardStatus);
    }

    @Transactional(readOnly = false)
    public Card updateCard(Card card) {
        return cardRepository.merge(card);
    }

    @Transactional(readOnly = false)
    public void removeCard(Long CardId) {
        cardRepository.remove(cardRepository.find(Card.class, CardId));
    }

    public Card findCardByName(String cardName) {
        return cardRepository.findByName(cardName);
    }

    public List<ExpansionStatus> getExpansionStatus() {
        Query query = em.createNativeQuery("select e.name, e.code, count(*), (select count(*) from cardedition cei inner join card ci on ci.id = cei.card_id inner join cardstatus csi on csi.id = ci.cardStatus_id where cei.expansion_id = e.id and csi.implemented=1) from expansion e inner join cardedition ce on e.id = ce.expansion_id group by e.id order by e.releaseDate desc");
        List<Object[]> resultList = query.getResultList();

        List<ExpansionStatus> expansionsData = new LinkedList<ExpansionStatus>();
        for (Object[] object : resultList) {
            expansionsData.add(new ExpansionStatus((String) object[0], (String) object[1], ((BigInteger) object[2]).intValue(), ((BigInteger) object[3]).intValue()));
        }
        return expansionsData;
    }

    public List<Card> getCardsByExpansion(String expansionCode) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Card> cq = cb.createQuery(Card.class);

        Root<Card> card = cq.from(Card.class);
        Join<Card, CardEdition> cardEdition = card.join(Card_.editions);
        Join<CardEdition, Expansion> expansion = cardEdition.join(CardEdition_.expansion);
        cq.select(card);

        cq.where(cb.equal(expansion.get("code"), expansionCode));

        cq.orderBy(cb.asc(card.get("name")));

        TypedQuery<Card> q = em.createQuery(cq);

        q.setFirstResult(60);
        q.setMaxResults(30);

        return q.getResultList();
    }
}
