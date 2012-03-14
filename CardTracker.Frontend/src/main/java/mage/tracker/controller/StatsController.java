package mage.tracker.controller;

import java.util.List;
import mage.tracker.dto.ExpansionStatus;
import mage.tracker.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author North
 */
@Controller
public class StatsController {

    @Autowired
    CardService cardService;

    @RequestMapping(value = "/stats")
    public String viewStats() {
        return "stats";
    }

    @RequestMapping(value = "/stats", params = "action=load")
    @ResponseBody
    public List<ExpansionStatus> load() {
        return cardService.getExpansionStatus();
    }
}
