package mage.tracker.authentication;

import mage.tracker.domain.Account;

/**
 *
 * @author North
 */
public class AuthenticationContext {

    private static final ThreadLocal<Account> Account = new ThreadLocal<Account>();

    public static Account getAccount() {
        return Account.get();
    }

    public static void setAccount(Account Account) {
        AuthenticationContext.Account.set(Account);
    }
}
