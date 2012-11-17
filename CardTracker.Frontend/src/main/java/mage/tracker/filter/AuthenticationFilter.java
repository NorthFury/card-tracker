package mage.tracker.filter;

import java.io.IOException;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import mage.tracker.authentication.AuthenticationContext;
import mage.tracker.domain.Account;
import mage.tracker.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author North
 */
public class AuthenticationFilter implements Filter {

    public static final String ACCOUNT_KEY = "AuthenticatedUser";
    @Autowired
    private AccountService accountService;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpSession session = httpRequest.getSession();

        String name = httpRequest.getParameter("name");
        String password = httpRequest.getParameter("password");
        Account account = (Account) session.getAttribute(ACCOUNT_KEY);
        if (name != null && !name.isEmpty() && password != null && !password.isEmpty()
                && (account == null || (account != null && !account.getName().equals(name) || !account.getPassword().equals(password)))) {
            account = accountService.authenticateAccount(name, password);
            session.setAttribute(ACCOUNT_KEY, account);
        }

        AuthenticationContext.setAccount(account);
        if (chain != null) {
            chain.doFilter(request, response);
        }
    }

    @Override
    public void destroy() {
    }
}
