package mage.tracker.controller;

import mage.tracker.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author North
 */
@Controller
public class StatsController {

    @Autowired
    CardService cardService;

    /**
     * Handler for the stats page
     *
     * @return stats page
     */
    @RequestMapping(value = "/stats")
    public ModelAndView viewAdmin() {
        ModelAndView modelAndView = new ModelAndView("stats");

        modelAndView.addObject("expansionData", cardService.getExpansionStatus());
        return modelAndView;
    }
}
