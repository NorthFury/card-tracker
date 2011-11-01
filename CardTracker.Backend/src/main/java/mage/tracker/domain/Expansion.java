package mage.tracker.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author North
 */
@Entity
public class Expansion implements Serializable {

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
    private List<CardEdition> editions;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }
}
