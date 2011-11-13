package mage.tracker.controller;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import mage.tracker.domain.Card;
import mage.tracker.dto.CardData;
import mage.tracker.dto.PaginatedResult;
import mage.tracker.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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
    public String viewCards() {
        return "cards";
    }

    @RequestMapping(value = "/cards", params = "action=load")
    @ResponseBody
    public HashMap<String, Object> importImplementedCards(@RequestParam("page") int page, @RequestParam("rows") int rows, HttpServletRequest request) {
        String expansionCode = request.getParameter("expansion");
        if (expansionCode == null) {
            expansionCode = "M12";
        }

        PaginatedResult<Card> searchResult = cardService.getCardsByCriteria(expansionCode, page, rows);
        List<Card> cards = searchResult.getRows();
        List<CardData> cardsData = new LinkedList<CardData>();
        for (Card card : cards) {
            cardsData.add(new CardData(card));
        }

        HashMap<String, Object> model = new HashMap<String, Object>();
        model.put("cards", cardsData);
        model.put("totalRows", searchResult.getTotalCount());
        return model;
    }
}
