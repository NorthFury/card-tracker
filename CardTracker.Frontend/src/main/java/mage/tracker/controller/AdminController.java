package mage.tracker.controller;

import java.util.ArrayList;
import java.util.GregorianCalendar;
import java.util.HashMap;
import mage.tracker.authentication.AuthenticationContext;
import mage.tracker.domain.Account;
import mage.tracker.domain.Card;
import mage.tracker.domain.CardStatus;
import mage.tracker.domain.Expansion;
import mage.tracker.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author North
 */
@Controller
public class AdminController {

    @Autowired
    CardService cardService;

    /**
     * Handler for the admin page
     *
     * @return admin page
     */
    @RequestMapping(value = "/admin")
    public String viewAdmin() {
        return "admin";
    }

    /**
     * Handler for the import Cards Data request
     *
     * @return success message
     */
    @RequestMapping(value = "/admin", params = "action=importCardsData")
    @ResponseBody
    public HashMap<String, Object> importCardsData(@RequestParam("data") String data) {
        String[] cards = data.split("\n");
        for (int i = 0; i < cards.length; i++) {
            cardService.updateCardData(cards[i]);
        }

        HashMap<String, Object> model = new HashMap<String, Object>();
        model.put("success", Boolean.TRUE);
        return model;
    }

    /**
     * Handler for the import Expansion Data request
     *
     * @return success message
     */
    @RequestMapping(value = "/admin", params = "action=importExpansionData")
    @ResponseBody
    public HashMap<String, Object> importExpansionData(@RequestParam("data") String data) {
        String[] expansions = data.split("\n");
        for (int i = 0; i < expansions.length; i++) {
            String[] expansionData = expansions[i].split("\\|");
            Expansion expansion = new Expansion();
            expansion.setName(expansionData[0]);
            expansion.setCode(expansionData[1]);
            expansionData = expansionData[2].split(", ");
            expansion.setReleaseDate(new GregorianCalendar(Integer.parseInt(expansionData[0]), Integer.parseInt(expansionData[1]), Integer.parseInt(expansionData[2])).getTime());
            cardService.saveExpansion(expansion);
        }

        HashMap<String, Object> model = new HashMap<String, Object>();
        model.put("success", Boolean.TRUE);
        return model;
    }

    /**
     * Handler for the import Implemented Cards request
     *
     * @return success message
     */
    @RequestMapping(value = "/admin", params = "action=importImplementedCards")
    @ResponseBody
    public HashMap<String, Object> importImplementedCards(@RequestParam("data") String data) {
        ArrayList<Integer> failed = new ArrayList<Integer>();
        String[] cards = data.split("\n");
        for (int i = 0; i < cards.length; i++) {
            Card card = cardService.findCardByName(cards[i]);
            if (card != null) {
                CardStatus cardStatus = card.getStatus();
                cardStatus.setImplemented(Boolean.TRUE);
                cardStatus.setRequested(Boolean.FALSE);
                cardStatus.setAccount(null);
                cardService.updateCardStatus(cardStatus);
            } else {
                failed.add(i);
            }
        }

        HashMap<String, Object> model = new HashMap<String, Object>();
        model.put("success", Boolean.TRUE);
        model.put("failed", failed);
        return model;
    }

    /**
     * Handler for the import Requested Cards request
     *
     * @return success message
     */
    @RequestMapping(value = "/admin", params = "action=importRequestedCards")
    @ResponseBody
    public HashMap<String, Object> importRequestedCards(@RequestParam("data") String data) {
        ArrayList<Integer> failed = new ArrayList<Integer>();
        String[] cards = data.split("\n");
        for (int i = 0; i < cards.length; i++) {
            Card card = cardService.findCardByName(cards[i]);
            if (card != null) {
                CardStatus cardStatus = card.getStatus();
                if (!cardStatus.getImplemented()) {
                    cardStatus.setRequested(Boolean.TRUE);
                    cardService.updateCardStatus(cardStatus);
                }
            } else {
                failed.add(i);
            }
        }

        HashMap<String, Object> model = new HashMap<String, Object>();
        model.put("success", Boolean.TRUE);
        model.put("failed", failed);
        return model;
    }

    /**
     * Handler for the import MTGO data request
     *
     * @return success message
     */
    @RequestMapping(value = "/admin", params = "action=importMtgoData")
    @ResponseBody
    public HashMap<String, Object> importMtgoData(@RequestParam("data") String data) {
        ArrayList<Integer> failed = new ArrayList<Integer>();
        String[] cards = data.split("\n");
        for (int i = 0; i < cards.length; i++) {
            if (!cardService.updateCardEditionMtgoImageId(cards[i])) {
                failed.add(i);
            }
        }

        HashMap<String, Object> model = new HashMap<String, Object>();
        model.put("success", Boolean.TRUE);
        model.put("failed", failed);
        return model;
    }

    /**
     * Handler for the register user request
     *
     * @return success message
     */
    @RequestMapping(value = "/admin", params = "action=registerAccount")
    @ResponseBody
    public HashMap<String, Object> registerAccount(@ModelAttribute Account account) {
        Boolean success = false;
        if (!account.getName().isEmpty() && !account.getPassword().isEmpty()) {
            success = cardService.saveAccount(account);
        }

        HashMap<String, Object> model = new HashMap<String, Object>();
        model.put("success", success);
        return model;
    }

    /**
     * Handler for the update account request
     *
     * @return success message
     */
    @RequestMapping(value = "/admin", params = "action=updateAccount")
    @ResponseBody
    public HashMap<String, Object> updateAccount(
            @RequestParam("newEmail") String newEmail,
            @RequestParam("newPassword") String newPassword,
            @RequestParam("oldName") String name) {
        Boolean success = false;
        Account currentAccount = AuthenticationContext.getAccount();
        if (currentAccount != null && currentAccount.getName().equals(name)) {
            if (!newEmail.isEmpty()) {
                currentAccount.setEmail(newEmail);
            }
            if (!newPassword.isEmpty()) {
                currentAccount.setPassword(newPassword);
            }
            success = cardService.updateAccount(currentAccount);
        }

        HashMap<String, Object> model = new HashMap<String, Object>();
        model.put("success", success);
        return model;
    }

    /**
     * Handler for the login request
     *
     * @return success message
     */
    @RequestMapping(value = "/admin", params = "action=login")
    @ResponseBody
    public HashMap<String, Object> login(@RequestParam("name") String name, @RequestParam("password") String password) {
        Boolean success = cardService.authenticateAccount(name, password) != null;

        HashMap<String, Object> model = new HashMap<String, Object>();
        model.put("success", success);
        return model;
    }
}
