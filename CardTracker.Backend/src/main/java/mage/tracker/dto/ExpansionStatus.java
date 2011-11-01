package mage.tracker.dto;

/**
 *
 * @author North
 */
public class ExpansionStatus {

    private String name;
    private String code;
    private Integer total;
    private Integer implemented;

    public ExpansionStatus(String name, String code, Integer total, Integer implemented) {
        this.name = name;
        this.code = code;
        this.total = total;
        this.implemented = implemented;
    }

    public Integer getImplemented() {
        return implemented;
    }

    public String getName() {
        return name;
    }

    public Integer getTotal() {
        return total;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
