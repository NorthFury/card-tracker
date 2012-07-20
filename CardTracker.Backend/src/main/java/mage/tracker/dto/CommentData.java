package mage.tracker.dto;

import java.util.Date;
import mage.tracker.domain.Account;
import mage.tracker.domain.Comment;

/**
 *
 * @author North
 */
public class CommentData {

    private String text;
    private Date postTime;
    private String accountName;
    private Long accountId;

    public CommentData(Comment comment) {
        this.text = comment.getText();
        this.postTime = comment.getPostTime();
        Account account = comment.getAccount();
        if (account != null) {
            this.accountName = account.getName();
            this.accountId = account.getId();
        }
    }

    public String getText() {
        return text;
    }

    public Date getPostTime() {
        return postTime;
    }

    public String getAccountName() {
        return accountName;
    }

    public Long getAccountId() {
        return accountId;
    }
}
