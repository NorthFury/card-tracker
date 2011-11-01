package mage.tracker.util;

import java.security.Principal;
import sun.security.acl.PrincipalImpl;

/**
 *
 * @author North
 */
public class AuthenticationContext {

    private static final ThreadLocal<Principal> principal = new ThreadLocal<Principal>() {

        @Override
        protected Principal initialValue() {
            return new PrincipalImpl("anonymous");
        }
    };

    public static Principal getPrincipal() {
        return principal.get();
    }

    public static void setPrincipal(Principal principal) {
        AuthenticationContext.principal.set(principal);
    }
}
