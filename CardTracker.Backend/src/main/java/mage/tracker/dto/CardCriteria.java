package mage.tracker.dto;

import java.util.List;

/**
 *
 * @author North
 */
public class CardCriteria {

    private Integer page;
    private Integer rows;
    private List<String> type;
    private List<String> expansion;
    private List<Long> developer;
    private Boolean implemented;
    private Boolean requested;
    private Boolean bugged;
    private Boolean tested;
    private String abilities;
    private String subtype;
    private String sortColumn;
    private Boolean sortAscending;

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

    public Boolean getTested() {
        return tested;
    }

    public List<String> getType() {
        return type;
    }

    public void setType(List<String> type) {
        this.type = type;
    }

    public void setTested(Boolean tested) {
        this.tested = tested;
    }

    public List<String> getExpansion() {
        return expansion;
    }

    public void setExpansion(List<String> expansion) {
        this.expansion = expansion;
    }

    public List<Long> getDeveloper() {
        return developer;
    }

    public void setDeveloper(List<Long> developer) {
        this.developer = developer;
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

    public Boolean getSortAscending() {
        return sortAscending;
    }

    public void setSortAscending(Boolean sortAscending) {
        this.sortAscending = sortAscending;
    }

    public String getSortColumn() {
        return sortColumn;
    }

    public void setSortColumn(String sortColumn) {
        this.sortColumn = sortColumn;
    }

    public String getSubtype() {
        return subtype;
    }

    public void setSubtype(String subtype) {
        this.subtype = subtype;
    }
}
