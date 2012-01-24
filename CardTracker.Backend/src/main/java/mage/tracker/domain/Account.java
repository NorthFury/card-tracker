package mage.tracker.domain;

import java.io.Serializable;
import javax.persistence.*;

/**
 *
 * @author North
 */
@NamedQueries({
    @NamedQuery(name = "Account.findByName",
    query = "select a from Account a where a.name = ?1"),
    @NamedQuery(name = "Account.findAll",
    query = "select a from Account a order by a.name")
})
@Entity
public class Account implements Serializable {

    // Named Queries
    public static final String FIND_BY_NAME = "Account.findByName";
    public static final String FIND_ALL = "Account.findAll";
    // Columns
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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
