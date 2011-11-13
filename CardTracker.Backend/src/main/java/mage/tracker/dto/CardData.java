package mage.tracker.dto;

import mage.tracker.domain.Card;
import mage.tracker.domain.CardStatus;

/**
 *
 * @author North
 */
public class CardData {

    private String name;
    private Boolean implemented;
    private Boolean requested;

    public CardData(Card card) {
        this.name = card.getName();
        CardStatus status = card.getStatus();
        this.implemented = status.getImplemented();
        this.requested = status.getRequested();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getImplemented() {
        return implemented;
    }

    public void setImplemented(Boolean implemented) {
        this.implemented = implemented;
    }

    public Boolean getRequested() {
        return requested;
    }

    public void setRequested(Boolean requested) {
        this.requested = requested;
    }
}
