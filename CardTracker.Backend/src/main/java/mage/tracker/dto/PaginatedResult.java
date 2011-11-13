package mage.tracker.dto;

import java.util.List;

/**
 *
 * @author North
 */
public class PaginatedResult<T> {

    private long totalCount;
    private List<T> rows;

    public PaginatedResult() {
    }

    public PaginatedResult(long totalCount, List<T> rows) {
        this.totalCount = totalCount;
        this.rows = rows;
    }

    public long getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(long totalCount) {
        this.totalCount = totalCount;
    }

    public List<T> getRows() {
        return rows;
    }

    public void setRows(List<T> rows) {
        this.rows = rows;
    }
}
