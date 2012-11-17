package mage.tracker.domain;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;

/**
 *
 * @author North
 */
@NamedQueries({
    @NamedQuery(name = Comment.FIND_BY_CARD_ID,
    query = "select c from Comment c where c.card.id = :cardId order by c.postTime")
})
@Entity
public class Comment implements Serializable {

    /**
     * parameters: cardId
     */
    public static final String FIND_BY_CARD_ID = "Comment.findByCardId";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(length = 1024, nullable = false)
    private String text;
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date postTime;
    @ManyToOne
    @JoinColumn(nullable = false)
    private Card card;
    @OneToOne
    private Account account;

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getPostTime() {
        return postTime;
    }

    public void setPostTime(Date postTime) {
        this.postTime = postTime;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }
}
