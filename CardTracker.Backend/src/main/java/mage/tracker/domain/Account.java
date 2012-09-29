package mage.tracker.domain;

import java.io.Serializable;
import javax.persistence.*;

/**
 *
 * @author North
 */
@NamedQueries({
    @NamedQuery(name = "Account.findByName",
    query = "select a from Account a where a.name = :name"),
    @NamedQuery(name = "Account.findAll",
    query = "select a from Account a order by a.name"),
    @NamedQuery(name = "Account.findActive",
    query = "select a from Account a where exists(select 'found' from Card c where c.status.account.id = a.id) order by a.name")
})
@Entity
public class Account implements Serializable {

    /**
     * parameters: name
     */
    public static final String FIND_BY_NAME = "Account.findByName";
    public static final String FIND_ALL = "Account.findAll";
    public static final String FIND_ACTIVE = "Account.findActive";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(length = 64, nullable = false, unique = true)
    private String name;
    @Column(length = 64, nullable = false)
    private String password;
    @Column(length = 64, nullable = false)
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
