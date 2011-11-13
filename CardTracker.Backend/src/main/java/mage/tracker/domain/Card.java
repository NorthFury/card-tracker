package mage.tracker.domain;

import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

/**
 *
 * @author North
 */
@NamedQueries({
    @NamedQuery(name = "Card.findByName",
    query = "select c from Card c where c.name = ?1")
})
@Entity
public class Card implements Serializable {

    // Named Queries
    public static final String FIND_BY_NAME = "Card.findByName";
    // Columns
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(length = 64, nullable = false)
    private String name;
    @Column(length = 1024, nullable = false)
    private String abilities;
    @Column(length = 64, nullable = false)
    private String cost;
    @Column(length = 64, nullable = false)
    private String type;
    @Column(length = 64)
    private String subType;
    @Column(length = 8)
    private String power;
    @Column(length = 8)
    private String toughness;
    // TODO: refactor cardStatus to status
    @OneToOne(fetch = FetchType.EAGER)
    private CardStatus cardStatus;
    @OneToMany(mappedBy = "card")
    private List<CardEdition> editions;
    @OneToMany(mappedBy = "card", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<Comment> comments;

    public String getAbilities() {
        return abilities;
    }

    public void setAbilities(String abilities) {
        this.abilities = abilities;
    }

    public CardStatus getStatus() {
        return cardStatus;
    }

    public void setStatus(CardStatus status) {
        this.cardStatus = status;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public String getCost() {
        return cost;
    }

    public void setCost(String cost) {
        this.cost = cost;
    }

    public List<CardEdition> getEditions() {
        return editions;
    }

    public void setEditions(List<CardEdition> editions) {
        this.editions = editions;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
