package mage.tracker.dto;

import java.util.List;

/**
 *
 * @author North
 */
public class CardCriteria {

    private Integer page;
    private Integer rows;
    private List<String> expansion;
    private Boolean implemented;
    private Boolean requested;
    private Boolean bugged;
    private String abilities;

    public String getAbilities() {
        return abilities;
    }

    public void setAbilities(String abilities) {
        this.abilities = abilities;
    }

    public Boolean getBugged() {
        return bugged;
    }

    public void setBugged(Boolean bugged) {
        this.bugged = bugged;
    }

    public List<String> getExpansion() {
        return expansion;
    }

    public void setExpansion(List<String> expansion) {
        this.expansion = expansion;
    }

    public Boolean getImplemented() {
        return implemented;
    }

    public void setImplemented(Boolean implemented) {
        this.implemented = implemented;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Boolean getRequested() {
        return requested;
    }

    public void setRequested(Boolean requested) {
        this.requested = requested;
    }

    public Integer getRows() {
        return rows;
    }

    public void setRows(Integer rows) {
        this.rows = rows;
    }
}
