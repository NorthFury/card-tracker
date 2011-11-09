package mage.tracker.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author North
 */
@NamedQueries({
    @NamedQuery(name = "Expansion.findByName",
    query = "select c from Expansion c where c.name = ?1"),
    @NamedQuery(name = "Expansion.findByCode",
    query = "select c from Expansion c where c.code = ?1")
})
@Entity
public class Expansion implements Serializable {

    // Named Queries
    public static final String FIND_BY_NAME = "Expansion.findByName";
    public static final String FIND_BY_CODE = "Expansion.findByCode";
    // Columns
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(length = 64, nullable = false)
    private String name;
    @Column(length = 8, nullable = false)
    private String code;
    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date releaseDate;
    @OneToMany(mappedBy = "expansion")
    private List<CardEdition> cards;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public List<CardEdition> getCards() {
        return cards;
    }

    public void setCards(List<CardEdition> cards) {
        this.cards = cards;
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

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }
}
