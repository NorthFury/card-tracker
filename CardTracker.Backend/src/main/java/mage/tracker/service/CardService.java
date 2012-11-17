package mage.tracker.service;

import java.math.BigInteger;
import java.util.LinkedList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import javax.persistence.criteria.CriteriaBuilder.In;
import mage.tracker.domain.*;
import mage.tracker.dto.CardCriteria;
import mage.tracker.dto.CardName;
import mage.tracker.dto.ExpansionStatus;
import mage.tracker.repository.*;
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
    private CardEditionService cardEditionService;
    @Autowired
    private ExpansionService expansionService;

    /**
     * Used to add a new card or update its data if it already exists
     *
     * @param cardData
     */
    @Transactional(readOnly = false)
    public void updateCardData(String cardData) {
        String[] cardAttributes = cardData.split("\\|");

        Expansion expansion = expansionService.findByName(cardAttributes[8]);
        if (expansion != null) {
            Card card = cardRepository.findByName(cardAttributes[1]);
            if (card == null) {
                card = new Card();
                card.setName(cardAttributes[1]);

                String[] cardType = cardAttributes[4].split(" - ");
                if (cardType[0].contains("Legendary")) {
                    card.setSuperType("Legendary");
                    cardType[0] = cardType[0].replace("Legendary ", "");
                }
                if (cardType[0].contains("Basic")) {
                    card.setSuperType("Basic");
                    cardType[0] = cardType[0].replace("Basic ", "");
                }
                if (cardType[0].contains("Snow")) {
                    card.setSuperType("Snow");
                    cardType[0] = cardType[0].replace("Snow ", "");
                }
                if (cardType[0].contains("World")) {
                    card.setSuperType("World");
                    cardType[0] = cardType[0].replace("World ", "");
                }
                card.setType(cardType[0]);
                if (cardType.length > 1) {
                    card.setSubType(cardType[1]);
                }

                card.setCost(cardAttributes[2]);
                try {
                    card.setCmc(Integer.parseInt(cardAttributes[3]));
                } catch (NumberFormatException e) {
                    card.setCmc(0);
                }
                String[] pt = cardAttributes[7].split(" / ");
                if (pt.length == 2) {
                    card.setPower(pt[0]);
                    card.setToughness(pt[1]);
                }
                // TODO: Add loyalty
                if (pt.length == 1 && pt[0].length() > 0) {
                    card.setToughness(pt[0]);
                }

                CardStatus cardStatus = new CardStatus();
                em.persist(cardStatus);
                card.setStatus(cardStatus);

                card.setAbilities(cardAttributes[5]);

                cardRepository.persist(card);
            } else {
                String[] cardType = cardAttributes[4].split(" - ");
                if (cardType[0].contains("Legendary")) {
                    card.setSuperType("Legendary");
                    cardType[0] = cardType[0].replace("Legendary ", "");
                }
                if (cardType[0].contains("Basic")) {
                    card.setSuperType("Basic");
                    cardType[0] = cardType[0].replace("Basic ", "");
                }
                if (cardType[0].contains("Snow")) {
                    card.setSuperType("Snow");
                    cardType[0] = cardType[0].replace("Snow ", "");
                }
                if (cardType[0].contains("World")) {
                    card.setSuperType("World");
                    cardType[0] = cardType[0].replace("World ", "");
                }
                card.setType(cardType[0]);
                if (cardType.length > 1) {
                    card.setSubType(cardType[1]);
                }
                card.setAbilities(cardAttributes[5]);
                cardRepository.merge(card);
            }
            if (card != null && cardEditionService.findByNameAndExpansion(card.getName(), expansion.getName()) == null) {
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
                em.persist(cardEdition);

                String lastCharCardNumber = cardAttributes[10].substring(cardAttributes[10].length() - 1);
                if ("a".equals(lastCharCardNumber) || "b".equals(lastCharCardNumber)) {
                    TypedQuery query = em.createNamedQuery(CardEdition.FIND_BY_CARD_NUMBER_AND_EXPANSION_ID, CardEdition.class);
                    String cardNumber = cardAttributes[10].substring(0, cardAttributes[10].length() - 1)
                            + ("a".equals(lastCharCardNumber) ? "b" : "a");
                    query.setParameter("cardNumber", cardNumber);
                    query.setParameter("expansionId", expansion.getId());
                    List<CardEdition> otherSideEditions = query.getResultList();
                    if (!otherSideEditions.isEmpty()) {
                        Card otherSide = otherSideEditions.get(0).getCard();
                        card.setOtherSide(otherSide.getId());
                        otherSide.setOtherSide(card.getId());
                        cardRepository.merge(card);
                        cardRepository.merge(otherSide);
                    }
                }
            }
        }
    }

    @Transactional(readOnly = false)
    public CardStatus updateCardStatus(CardStatus cardStatus) {
        return em.merge(cardStatus);
    }

    public Card findCardByName(String cardName) {
        return cardRepository.findByName(cardName);
    }

    public List<CardName> findCardsLikeName(String name) {
        StringBuilder sb = new StringBuilder();
        sb.append("select c.id, c.name from Card c where c.name like '%").append(name).append("%' order by c.name");
        Query query = em.createNativeQuery(sb.toString());
        query.setMaxResults(15);
        List<Object[]> resultList = query.getResultList();

        List<CardName> cardNames = new LinkedList<CardName>();
        for (Object[] object : resultList) {
            cardNames.add(new CardName(((BigInteger) object[0]).longValue(), (String) object[1]));
        }
        return cardNames;
    }

    public Card findCardById(long id) {
        return cardRepository.find(Card.class, id);
    }

    public List<CardEdition> getCardEditions(long cardId) {
        TypedQuery query = em.createNamedQuery(CardEdition.FIND_BY_CARD_ID, CardEdition.class);
        query.setParameter("cardId", cardId);
        return query.getResultList();
    }

    public void saveComment(Comment comment) {
        em.persist(comment);
    }

    public List<Comment> getCardComments(long cardId) {
        TypedQuery query = em.createNamedQuery(Comment.FIND_BY_CARD_ID, Comment.class);
        query.setParameter("cardId", cardId);
        return query.getResultList();
    }

    public List<ExpansionStatus> getExpansionStatus() {
        StringBuilder sb = new StringBuilder();
        sb.append("select e.name, e.code, count(*), ");
        sb.append("(select count(*)");
        sb.append(" from CardEdition cei inner join Card ci on ci.id = cei.card_id inner join CardStatus csi on csi.id = ci.status_id");
        sb.append(" where cei.expansion_id = e.id and csi.implemented=1)");
        sb.append(" from Expansion e inner join CardEdition ce on e.id = ce.expansion_id group by e.id order by e.releaseDate desc");
        Query query = em.createNativeQuery(sb.toString());
        List<Object[]> resultList = query.getResultList();

        List<ExpansionStatus> expansionsData = new LinkedList<ExpansionStatus>();
        for (Object[] object : resultList) {
            expansionsData.add(new ExpansionStatus((String) object[0], (String) object[1], ((BigInteger) object[2]).intValue(), ((BigInteger) object[3]).intValue()));
        }
        return expansionsData;
    }

    public List<Card> getCardsByCriteria(CardCriteria cardCriteria) {
        CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
        CriteriaQuery<Card> criteriaQuery = criteriaBuilder.createQuery(Card.class);

        Root<Card> card = criteriaQuery.from(Card.class);
        card.fetch(Card_.status);

        List<Predicate> restrictions = buildPredicates(cardCriteria, criteriaBuilder, card);
        criteriaQuery.where(restrictions.toArray(new Predicate[0]));

        List<String> expansion = cardCriteria.getExpansion();
        if (cardCriteria.getSortColumn() == null && expansion != null && expansion.size() == 1) {
            Join<Card, CardEdition> cardEdition = card.join(Card_.editions);
            Expression<String> cardNumber = criteriaBuilder.trim('b', cardEdition.get(CardEdition_.cardNumber));
            cardNumber = criteriaBuilder.trim('a', cardNumber);
            cardNumber = criteriaBuilder.concat("0000", cardNumber);
            Expression<Integer> from = criteriaBuilder.sum(criteriaBuilder.length(cardNumber), -3);
            cardNumber = criteriaBuilder.substring(cardNumber, from);

            criteriaQuery.orderBy(criteriaBuilder.asc(cardNumber));
        }

        if (cardCriteria.getSortColumn() != null) {
            Expression column = card.get(cardCriteria.getSortColumn().toLowerCase());
            if (cardCriteria.getSortAscending()) {
                criteriaQuery.orderBy(criteriaBuilder.asc(column));
            } else {
                criteriaQuery.orderBy(criteriaBuilder.desc(column));
            }
        }

        criteriaQuery.select(card);

        TypedQuery<Card> query = em.createQuery(criteriaQuery);

        int page = cardCriteria.getPage();
        int rows = cardCriteria.getRows();
        query.setFirstResult(page * rows);
        query.setMaxResults(rows);

        return query.getResultList();
    }

    public Long getCardsCountByCriteria(CardCriteria cardCriteria) {
        CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
        CriteriaQuery<Long> criteriaQuery = criteriaBuilder.createQuery(Long.class);

        Root<Card> card = criteriaQuery.from(Card.class);

        List<Predicate> restrictions = buildPredicates(cardCriteria, criteriaBuilder, card);
        criteriaQuery.where(restrictions.toArray(new Predicate[0]));

        criteriaQuery.select(criteriaBuilder.countDistinct(card));
        TypedQuery<Long> query = em.createQuery(criteriaQuery);
        return query.getSingleResult();
    }

    private List<Predicate> buildPredicates(CardCriteria cardCriteria, CriteriaBuilder criteriaBuilder, Root<Card> card) {
        List<Predicate> restrictions = new LinkedList<Predicate>();
        if (cardCriteria.getAbilities() != null) {
            restrictions.add(criteriaBuilder.like(card.get(Card_.abilities), "%" + cardCriteria.getAbilities() + "%"));
        }
        if (cardCriteria.getSubtype() != null) {
            restrictions.add(criteriaBuilder.like(card.get(Card_.subType), "%" + cardCriteria.getSubtype() + "%"));
        }
        if (cardCriteria.getType() != null) {
            List<Predicate> typeRestrictions = new LinkedList<Predicate>();
            for (String type : cardCriteria.getType()) {
                typeRestrictions.add(criteriaBuilder.like(card.get(Card_.type), "%" + type + "%"));
            }
            restrictions.add(criteriaBuilder.or(typeRestrictions.toArray(new Predicate[0])));
        }
        if (cardCriteria.getExpansion() != null && !cardCriteria.getExpansion().isEmpty()) {
            Join<Card, CardEdition> cardEdition = card.join(Card_.editions);
            Join<CardEdition, Expansion> expansion = cardEdition.join(CardEdition_.expansion);
            In<String> inExpansion = criteriaBuilder.in(expansion.get(Expansion_.code));
            for (String value : cardCriteria.getExpansion()) {
                inExpansion.value(value);
            }
            restrictions.add(inExpansion);
        }
        if (cardCriteria.getImplemented() != null || cardCriteria.getRequested() != null
                || cardCriteria.getBugged() != null || cardCriteria.getTested() != null
                || cardCriteria.getDeveloper() != null) {
            Join<Card, CardStatus> cardStatus = card.join(Card_.status);
            if (cardCriteria.getImplemented() != null) {
                restrictions.add(criteriaBuilder.equal(cardStatus.get(CardStatus_.implemented), cardCriteria.getImplemented()));
            }
            if (cardCriteria.getRequested() != null) {
                restrictions.add(criteriaBuilder.equal(cardStatus.get(CardStatus_.requested), cardCriteria.getRequested()));
            }
            if (cardCriteria.getBugged() != null) {
                restrictions.add(criteriaBuilder.equal(cardStatus.get(CardStatus_.bugged), cardCriteria.getBugged()));
            }
            if (cardCriteria.getTested() != null) {
                restrictions.add(criteriaBuilder.equal(cardStatus.get(CardStatus_.tested), cardCriteria.getTested()));
            }
            if (cardCriteria.getDeveloper() != null) {
                Join<CardStatus, Account> account = cardStatus.join(CardStatus_.account);
                In<Long> inDeveloper = criteriaBuilder.in(account.get(Account_.id));
                for (Long value : cardCriteria.getDeveloper()) {
                    inDeveloper.value(value);
                }
                restrictions.add(inDeveloper);
            }
        }
        return restrictions;
    }
}
