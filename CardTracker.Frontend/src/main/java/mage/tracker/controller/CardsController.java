package mage.tracker.controller;

import mage.tracker.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    public ModelAndView viewAdmin(@RequestParam("expansion") String expansion) {
        ModelAndView modelAndView = new ModelAndView("expansion");

        modelAndView.addObject("expansion", expansion);
        modelAndView.addObject("cards", cardService.getCardsByExpansion(expansion));
        return modelAndView;
    }
}
