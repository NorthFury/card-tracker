package mage.tracker.dto;

import java.util.LinkedList;
import java.util.List;
import mage.tracker.domain.Account;
import mage.tracker.domain.Card;
import mage.tracker.domain.CardEdition;
import mage.tracker.domain.CardRarity;
import mage.tracker.domain.CardStatus;

/**
 *
 * @author North
 */
public class CardData {

    public class EditionData {

        private CardRarity rarity;
        private String gathererId;
        private String mtgoImageId;
        private String expansionCode;
        private String expansionName;

        public EditionData(CardEdition edition) {
            this.rarity = edition.getRarity();
            this.gathererId = edition.getGathererId();
            this.mtgoImageId = edition.getMtgoImageId();
            this.expansionCode = edition.getExpansion().getCode();
            this.expansionName = edition.getExpansion().getName();
        }

        public CardRarity getRarity() {
            return rarity;
        }

        public String getGathererId() {
            return gathererId;
        }

        public String getMtgoImageId() {
            return mtgoImageId;
        }

        public String getExpansionCode() {
            return expansionCode;
        }

        public String getExpansionName() {
            return expansionName;
        }
    }
    private long id;
    private String name;
    private String cost;
    private String type;
    private String subType;
    private String power;
    private String toughness;
    private String abilities;
    private Boolean implemented;
    private Boolean requested;
    private Boolean tested;
    private Boolean bugged;
    private String developer;
    private List<EditionData> editions;

    public CardData(Card card) {
        this.id = card.getId();
        this.name = card.getName();
        this.cost = card.getCost();
        this.type = card.getType();
        this.subType = card.getSubType();
        this.power = card.getPower();
        this.toughness = card.getToughness();
        this.abilities = card.getAbilities();

        CardStatus status = card.getStatus();
        this.implemented = status.getImplemented();
        this.requested = status.getRequested();
        this.tested = status.getTested();
        this.bugged = status.getBugged();

        Account account = status.getAccount();
        if (account != null) {
            this.developer = account.getName();
        }

        editions = new LinkedList<EditionData>();
        List<CardEdition> cardEditions = card.getEditions();
        for (CardEdition edition : cardEditions) {
            editions.add(new EditionData(edition));
        }
    }

    public String getCost() {
        return cost;
    }

    public long getId() {
        return id;
    }

    public Boolean getImplemented() {
        return implemented;
    }

    public String getName() {
        return name;
    }

    public String getPower() {
        return power;
    }

    public Boolean getRequested() {
        return requested;
    }

    public Boolean getTested() {
        return tested;
    }

    public Boolean getBugged() {
        return bugged;
    }

    public String getSubType() {
        return subType;
    }

    public String getToughness() {
        return toughness;
    }

    public String getType() {
        return type;
    }

    public String getAbilities() {
        return abilities;
    }

    public String getDeveloper() {
        return developer;
    }

    public List<EditionData> getEditions() {
        return editions;
    }
}
