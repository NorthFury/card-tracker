package mage.tracker.dto;

import mage.tracker.domain.Card;
import mage.tracker.domain.CardStatus;

/**
 *
 * @author North
 */
public class CardData {

    private long id;
    private String name;
    private String cost;
    private String type;
    private String subType;
    private String power;
    private String toughness;
    private Boolean implemented;
    private Boolean requested;
    private Boolean tested;
    private Boolean bugged;

    public CardData(Card card) {
        this.id = card.getId();
        this.name = card.getName();
        this.cost = card.getCost();
        this.type = card.getType();
        this.subType = card.getSubType();
        this.power = card.getPower();
        this.toughness = card.getToughness();

        CardStatus status = card.getStatus();
        this.implemented = status.getImplemented();
        this.requested = status.getRequested();
        this.tested = status.getTested();
        this.bugged = status.getTested();
    }

    public String getCost() {
        return cost;
    }

    public void setCost(String cost) {
        this.cost = cost;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Boolean getImplemented() {
        return implemented;
    }

    public void setImplemented(Boolean implemented) {
        this.implemented = implemented;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPower() {
        return power;
    }

    public void setPower(String power) {
        this.power = power;
    }

    public Boolean getRequested() {
        return requested;
    }

    public void setRequested(Boolean requested) {
        this.requested = requested;
    }

    public Boolean getTested() {
        return tested;
    }

    public void setTested(Boolean tested) {
        this.tested = tested;
    }

    public Boolean getBugged() {
        return bugged;
    }

    public void setBugged(Boolean bugged) {
        this.bugged = bugged;
    }

    public String getSubType() {
        return subType;
    }

    public void setSubType(String subType) {
        this.subType = subType;
    }

    public String getToughness() {
        return toughness;
    }

    public void setToughness(String toughness) {
        this.toughness = toughness;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
