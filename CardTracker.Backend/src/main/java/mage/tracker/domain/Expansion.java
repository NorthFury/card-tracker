package mage.tracker.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.*;

/**
 *
 * @author North
 */
@NamedQueries({
    @NamedQuery(name = Expansion.FIND_BY_NAME,
    query = "select c from Expansion c where c.name = :name"),
    @NamedQuery(name = Expansion.FIND_BY_CODE,
    query = "select c from Expansion c where c.code = :code"),
    @NamedQuery(name = Expansion.FIND_ALL,
    query = "select c from Expansion c order by c.releaseDate desc")
})
@Entity
public class Expansion implements Serializable {

    /**
     * parameters: name
     */
    public static final String FIND_BY_NAME = "Expansion.findByName";
    /**
     * parameters: code
     */
    public static final String FIND_BY_CODE = "Expansion.findByCode";
    public static final String FIND_ALL = "Expansion.findAll";

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
