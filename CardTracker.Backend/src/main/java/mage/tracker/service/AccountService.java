package mage.tracker.service;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import mage.tracker.domain.Account;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author North
 */
@Service
@Transactional(readOnly = true)
public class AccountService {

    @PersistenceContext
    private EntityManager em;

    @Transactional(readOnly = false)
    public Boolean saveAccount(Account account) {
        Account result = findByName(account.getName());
        if (result == null) {
            em.persist(account);
            return true;
        }
        return false;
    }

    @Transactional(readOnly = false)
    public Boolean updateAccount(Account account) {
        Account result = em.find(Account.class, account.getId());
        if (result != null) {
            em.merge(account);
            return true;
        }
        return false;
    }

    public Account authenticateAccount(String name, String password) {
        Account account = findByName(name);
        if (account != null && account.getPassword().equals(password)) {
            return account;
        }
        return null;
    }

    public List<Account> getActiveAccounts() {
        TypedQuery query = em.createNamedQuery(Account.FIND_ACTIVE, Account.class);
        return query.getResultList();
    }

    public Account findByName(String name) {
        TypedQuery query = em.createNamedQuery(Account.FIND_BY_NAME, Account.class);
        query.setParameter("name", name);
        List<Account> resultList = query.getResultList();
        if (resultList.isEmpty()) {
            return null;
        } else {
            return resultList.get(0);
        }
    }
}
