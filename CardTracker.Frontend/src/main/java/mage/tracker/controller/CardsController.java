package mage.tracker.controller;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import mage.tracker.domain.Card;
import mage.tracker.domain.CardEdition;
import mage.tracker.dto.CardCriteria;
import mage.tracker.dto.CardData;
import mage.tracker.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
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

    /**
     * Handler for the expansion page
     *
     * @return expansion page
     */
    @RequestMapping(value = "/cards")
    public ModelAndView viewCards() {
        ModelAndView modelAndView = new ModelAndView("cards");
        modelAndView.addObject("expansions", cardService.getExpansions());
        return modelAndView;
    }

    @RequestMapping(value = "/cards", params = "action=load")
    @ResponseBody
    public HashMap<String, Object> loadCards(@ModelAttribute CardCriteria cardCriteria) {
        List<Card> cards = cardService.getCardsByCriteria(cardCriteria);

        List<CardData> cardsData = new LinkedList<CardData>();
        for (Card card : cards) {
            cardsData.add(new CardData(card));
        }

        HashMap<String, Object> model = new HashMap<String, Object>();
        model.put("cards", cardsData);
        return model;
    }

    @RequestMapping(value = "/cards", params = "action=getCount")
    @ResponseBody
    public HashMap<String, Object> getCount(@ModelAttribute CardCriteria cardCriteria) {
        Long count = cardService.getCardsCountByCriteria(cardCriteria);

        HashMap<String, Object> model = new HashMap<String, Object>();
        model.put("totalRows", count);
        return model;
    }

    @RequestMapping(value = "/cards", params = "action=getEdition")
    @ResponseBody
    public HashMap<String, Object> getCardEdition(@RequestParam("cardId") long cardId) {
        List<CardEdition> cardEditions = cardService.getCardEditions(cardId);

        HashMap<String, Object> model = new HashMap<String, Object>();
        model.put("gathererId", cardEditions.get(0).getGathererId());
        return model;
    }
}
