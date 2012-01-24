package mage.tracker.domain;

import java.io.Serializable;
import javax.persistence.*;

/**
 *
 * @author North
 */
@NamedQueries({
    @NamedQuery(name = "CardEdition.findByNameAndExpansion",
    query = "select c from CardEdition c where c.card.name = ?1 and c.expansion.name = ?2"),
    @NamedQuery(name = "CardEdition.findByNameAndExpansionCode",
    query = "select c from CardEdition c where c.card.name = ?1 and c.expansion.code = ?2"),
    @NamedQuery(name = "CardEdition.findByCardId",
    query = "select c from CardEdition c where c.card.id = ?1"),
    @NamedQuery(name = "CardEdition.findByCardNumberAndExpansionId",
    query = "select c from CardEdition c where c.cardNumber = ?1 and c.expansion.id = ?2")
})
@Entity
public class CardEdition implements Serializable {

    // Named Queries
    public static final String FIND_BY_NAME_AND_EXPANSION = "CardEdition.findByNameAndExpansion";
    public static final String FIND_BY_NAME_AND_EXPANSION_CODE = "CardEdition.findByNameAndExpansionCode";
    public static final String FIND_BY_CARD_NUMBER_AND_EXPANSION_ID = "CardEdition.findByCardNumberAndExpansionId";
    public static final String FIND_BY_CARD_ID = "CardEdition.findByCardId";
    // Columns
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    private Card card;
    @ManyToOne(fetch = FetchType.EAGER)
    private Expansion expansion;
    @Column(length = 64)
    private String gathererId;
    @Column(length = 64)
    private String cardNumber;
    @Column(length = 64)
    private String mtgoImageId;
    @Enumerated(EnumType.ORDINAL)
    @Column(nullable = false)
    private CardRarity rarity;

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public Expansion getExpansion() {
        return expansion;
    }

    public void setExpansion(Expansion expansion) {
        this.expansion = expansion;
    }

    public String getGathererId() {
        return gathererId;
    }

    public void setGathererId(String gathererId) {
        this.gathererId = gathererId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMtgoImageId() {
        return mtgoImageId;
    }

    public void setMtgoImageId(String mtgoImageId) {
        this.mtgoImageId = mtgoImageId;
    }

    public CardRarity getRarity() {
        return rarity;
    }

    public void setRarity(CardRarity rarity) {
        this.rarity = rarity;
    }
}
