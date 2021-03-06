package mage.tracker.domain;

import java.io.Serializable;
import javax.persistence.*;

/**
 *
 * @author North
 */
@Entity
public class CardStatus implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private Boolean requested;
    @Column(nullable = false)
    private Boolean tested;
    @Column(nullable = false)
    private Boolean implemented;
    @Column(nullable = false)
    private Boolean bugged;
    @OneToOne(fetch = FetchType.EAGER)
    private Account account;

    public CardStatus() {
        this.requested = false;
        this.implemented = false;
        this.tested = false;
        this.bugged = false;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}
