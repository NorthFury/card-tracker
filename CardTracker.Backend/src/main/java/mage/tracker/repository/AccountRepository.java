package mage.tracker.repository;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import mage.tracker.domain.Account;
import org.springframework.stereotype.Repository;

/**
 *
 * @author North
 */
@Repository
public class AccountRepository extends GenericRepository<Account> {

    @PersistenceContext
    private EntityManager em;

    public Account findByName(String name) {
        TypedQuery query = em.createNamedQuery(Account.FIND_BY_NAME, Account.class);
        query.setParameter(1, name);
        List<Account> resultList = query.getResultList();
        if (resultList.isEmpty()) {
            return null;
        } else {
            return resultList.get(0);
        }
    }

    public List<Account> findAll() {
        TypedQuery query = em.createNamedQuery(Account.FIND_ALL, Account.class);
        return query.getResultList();
    }
}
