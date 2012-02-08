package mage.tracker.dto;

/**
 *
 * @author North
 */
public class CardName {
    private long id;
    private String value;

    public CardName(long id, String value) {
        this.id = id;
        this.value = value;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
