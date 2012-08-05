package mage.tracker.dto;

import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import mage.tracker.domain.Account;
import mage.tracker.domain.Card;
import mage.tracker.domain.CardEdition;
import mage.tracker.domain.CardStatus;

/**
 *
 * @author North
 */
public class CardData {

    private Long id;
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
    private Long otherSide;

    public CardData(Card card) {
        this.id = card.getId();
        this.name = card.getName();
        this.cost = card.getCost();
        this.type = (card.getSuperType() != null ? card.getSuperType() + " " : "") + card.getType();
        this.subType = card.getSubType();
        this.power = card.getPower();
        this.toughness = card.getToughness();
        this.abilities = card.getAbilities();

        CardStatus status = card.getStatus();
        this.implemented = status.getImplemented();
        this.requested = status.getRequested();
        this.tested = status.getTested();
        this.bugged = status.getBugged();

        this.otherSide = card.getOtherSide();

        Account account = status.getAccount();
        if (account != null) {
            this.developer = account.getName();
        }

        editions = new LinkedList<EditionData>();
        List<CardEdition> cardEditions = card.getEditions();
        Collections.sort(cardEditions, new Comparator<CardEdition>() {
            @Override
            public int compare(CardEdition o1, CardEdition o2) {
                return o1.getExpansion().getReleaseDate().compareTo(o2.getExpansion().getReleaseDate());
            }
        });
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

    public Long getOtherSide() {
        return otherSide;
    }
}
