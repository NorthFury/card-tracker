package mage.tracker.controller;

import java.util.Calendar;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import mage.tracker.authentication.AuthenticationContext;
import mage.tracker.domain.Account;
import mage.tracker.domain.Card;
import mage.tracker.domain.CardStatus;
import mage.tracker.domain.Comment;
import mage.tracker.dto.CardCriteria;
import mage.tracker.dto.CardData;
import mage.tracker.dto.CardName;
import mage.tracker.dto.CommentData;
import mage.tracker.service.AccountService;
import mage.tracker.service.CardService;
import mage.tracker.service.ExpansionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author North
 */
@Controller
public class CardsController {

    @Autowired
    CardService cardService;
    @Autowired
    AccountService accountService;
    @Autowired
    private ExpansionService expansionService;

    @RequestMapping(value = {"/cards", "/"})
    public ModelAndView viewCards() {
        ModelAndView modelAndView = new ModelAndView("cards");
        modelAndView.addObject("expansions", expansionService.findAll());
        modelAndView.addObject("accounts", accountService.getActiveAccounts());
        return modelAndView;
    }

    private CardData getCardData(Card card) {
        if (card == null) {
            return null;
        }

        CardData cardData = new CardData(card);
        if (card.getOtherSide() != null) {
            Card otherSide = cardService.findCardById(card.getOtherSide());
            if (otherSide != null) {
                cardData.setOtherSide(new CardData(otherSide));
            }
        }
        return cardData;
    }

    @RequestMapping(value = "/cards/load")
    @ResponseBody
    public HashMap<String, Object> loadCards(@RequestBody CardCriteria cardCriteria) {
        Long count = cardService.getCardsCountByCriteria(cardCriteria);
        List<Card> cards = cardService.getCardsByCriteria(cardCriteria);

        List<CardData> cardsData = new LinkedList<CardData>();
        for (Card card : cards) {
            cardsData.add(getCardData(card));
        }

        HashMap<String, Object> model = new HashMap<String, Object>();
        model.put("totalRows", count);
        model.put("rowsData", cardsData);
        return model;
    }

    @RequestMapping(value = "/cards", params = "action=getCard")
    @ResponseBody
    public CardData getCard(@RequestParam("cardId") long cardId) {
        Card card = cardService.findCardById(cardId);
        return getCardData(card);
    }

    @RequestMapping(value = "/cards", params = "action=findCard")
    @ResponseBody
    public List<CardName> findCard(@RequestParam("term") String name) {
        return cardService.findCardsLikeName(name);
    }

    @RequestMapping(value = "/cards", params = "action=comment")
    @ResponseBody
    public HashMap<String, Object> comment(@RequestParam("cardId") long cardId, @RequestParam("text") String text) {
        Card card = cardService.findCardById(cardId);
        Account account = AuthenticationContext.getAccount();
        boolean success = false;

        if (card != null && account != null) {
            Comment comment = new Comment();
            comment.setAccount(account);
            comment.setCard(card);
            comment.setPostTime(Calendar.getInstance().getTime());
            comment.setText(text);

            cardService.saveComment(comment);
            if (card.getOtherSide() != null) {
                card = cardService.findCardById(card.getOtherSide());

                if (card != null) {
                    comment.setCard(card);
                    cardService.saveComment(comment);
                }
            }
            success = true;
        }

        HashMap<String, Object> model = new HashMap<String, Object>();
        model.put("success", success);
        return model;
    }

    @RequestMapping(value = "/cards", params = "action=getComments")
    @ResponseBody
    public List<CommentData> getComments(@RequestParam("cardId") long cardId) {
        List<Comment> commentList = cardService.getCardComments(cardId);
        List<CommentData> result = new LinkedList<CommentData>();
        for (Comment comment : commentList) {
            result.add(new CommentData(comment));
        }
        return result;
    }

    @RequestMapping(value = "/cards", params = "action=markIp")
    @ResponseBody
    public HashMap<String, Object> markIp(@RequestParam("cardId") long cardId) {
        Card card = cardService.findCardById(cardId);
        Account account = AuthenticationContext.getAccount();
        boolean success = markIpStatus(card, account);

        if (card.getOtherSide() != null) {
            card = cardService.findCardById(card.getOtherSide());
            if (card != null) {
                markIpStatus(card, account);
            }
        }

        HashMap<String, Object> model = new HashMap<String, Object>();
        model.put("success", success);
        return model;
    }

    private boolean markIpStatus(Card card, Account account) {
        CardStatus status = card.getStatus();
        if (account != null && status.getAccount() == null) {
            status.setAccount(account);
            cardService.updateCardStatus(status);
            return true;
        }
        return false;
    }

    @RequestMapping(value = "/cards", params = "action=done")
    @ResponseBody
    public HashMap<String, Object> done(@RequestParam("cardId") long cardId) {
        Card card = cardService.findCardById(cardId);
        Account account = AuthenticationContext.getAccount();
        boolean success = setDoneStatus(card, account);

        if (card.getOtherSide() != null) {
            card = cardService.findCardById(card.getOtherSide());
            if (card != null) {
                setDoneStatus(card, account);
            }
        }

        HashMap<String, Object> model = new HashMap<String, Object>();
        model.put("success", success);
        return model;
    }

    private boolean setDoneStatus(Card card, Account account) {
        CardStatus status = card.getStatus();
        if (account != null && status.getAccount() != null && status.getAccount().getName().equals(account.getName())) {
            status.setAccount(null);
            status.setImplemented(true);
            status.setBugged(false);
            cardService.updateCardStatus(status);
            return true;
        }
        return false;
    }

    @RequestMapping(value = "/cards", params = "action=cancel")
    @ResponseBody
    public HashMap<String, Object> cancel(@RequestParam("cardId") long cardId) {
        Card card = cardService.findCardById(cardId);
        Account account = AuthenticationContext.getAccount();
        boolean success = cancelStatus(card, account);

        if (card.getOtherSide() != null) {
            card = cardService.findCardById(card.getOtherSide());
            if (card != null) {
                cancelStatus(card, account);
            }
        }

        HashMap<String, Object> model = new HashMap<String, Object>();
        model.put("success", success);
        return model;
    }

    private boolean cancelStatus(Card card, Account account) {
        CardStatus status = card.getStatus();
        if (account != null && status.getAccount() != null && status.getAccount().getName().equals(account.getName())) {
            status.setAccount(null);
            cardService.updateCardStatus(status);
            return true;
        }
        return false;
    }

    @RequestMapping(value = "/cards", params = "action=unlock")
    @ResponseBody
    public HashMap<String, Object> unlock(@RequestParam("cardId") long cardId) {
        Card card = cardService.findCardById(cardId);
        Account account = AuthenticationContext.getAccount();
        boolean success = unlockStatus(card, account);

        if (card.getOtherSide() != null) {
            card = cardService.findCardById(card.getOtherSide());
            if (card != null) {
                unlockStatus(card, account);
            }
        }

        HashMap<String, Object> model = new HashMap<String, Object>();
        model.put("success", success);
        return model;
    }

    private boolean unlockStatus(Card card, Account account) {
        CardStatus status = card.getStatus();
        if (account != null && status.getAccount() != null) {
            status.setAccount(null);
            cardService.updateCardStatus(status);
            return true;
        }
        return false;
    }

    @RequestMapping(value = "/cards", params = "action=setBugged")
    @ResponseBody
    public HashMap<String, Object> setBugged(@RequestParam("cardId") long cardId) {
        Card card = cardService.findCardById(cardId);
        Account account = AuthenticationContext.getAccount();
        boolean success = setBuggedStatus(card, account);

        if (card.getOtherSide() != null) {
            card = cardService.findCardById(card.getOtherSide());
            if (card != null) {
                setBuggedStatus(card, account);
            }
        }

        HashMap<String, Object> model = new HashMap<String, Object>();
        model.put("success", success);
        return model;
    }

    private boolean setBuggedStatus(Card card, Account account) {
        CardStatus status = card.getStatus();
        if (account != null) {
            status.setBugged(true);
            cardService.updateCardStatus(status);
            return true;
        }
        return false;
    }

    @RequestMapping(value = "/cards", params = "action=setTested")
    @ResponseBody
    public HashMap<String, Object> setTested(@RequestParam("cardId") long cardId) {
        Card card = cardService.findCardById(cardId);
        Account account = AuthenticationContext.getAccount();
        boolean success = setTestedStatus(card, account);

        HashMap<String, Object> model = new HashMap<String, Object>();
        model.put("success", success);
        return model;
    }

    private boolean setTestedStatus(Card card, Account account) {
        CardStatus status = card.getStatus();
        if (account != null) {
            status.setTested(true);
            cardService.updateCardStatus(status);
            return true;
        }
        return false;
    }
}
