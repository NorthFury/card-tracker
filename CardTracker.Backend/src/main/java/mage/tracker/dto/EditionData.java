package mage.tracker.dto;

import java.util.HashMap;
import mage.tracker.domain.CardEdition;
import mage.tracker.domain.CardRarity;

/**
 *
 * @author North
 */
public class EditionData {

    private static final HashMap<String, String> expansionCodeFix = new HashMap<String, String>();

    static {
        expansionCodeFix.put("4ED", "4E");
        expansionCodeFix.put("5ED", "5E");
        expansionCodeFix.put("6ED", "6E");
        expansionCodeFix.put("7ED", "7E");
        expansionCodeFix.put("USG", "UZ");
        expansionCodeFix.put("ULG", "GU");
        expansionCodeFix.put("UDS", "CG");
        expansionCodeFix.put("INV", "IN");
        expansionCodeFix.put("PLS", "PS");
        expansionCodeFix.put("WTH", "WL");
        expansionCodeFix.put("TMP", "TE");
        expansionCodeFix.put("APC", "AP");
        expansionCodeFix.put("COK", "CHK");
        expansionCodeFix.put("ODY", "OD");
        expansionCodeFix.put("PCY", "PR");
        expansionCodeFix.put("NMS", "NE");
        expansionCodeFix.put("MMQ", "MM");
        expansionCodeFix.put("EXO", "EX");
        expansionCodeFix.put("STH", "ST");
        expansionCodeFix.put("VIS", "VI");
        expansionCodeFix.put("MIR", "MI");
    }
    private CardRarity rarity;
    private String gathererId;
    private String mtgoImageId;
    private String expansionCode;
    private String expansionName;
    private String cardNumber;

    public EditionData(CardEdition edition) {
        this.rarity = edition.getRarity();
        this.gathererId = edition.getGathererId();
        this.mtgoImageId = edition.getMtgoImageId();
        this.expansionName = edition.getExpansion().getName();
        this.cardNumber = edition.getCardNumber();

        String code = edition.getExpansion().getCode();
        if (expansionCodeFix.containsKey(code)) {
            code = expansionCodeFix.get(code);
        }
        this.expansionCode = code;
    }

    public CardRarity getRarity() {
        return rarity;
    }

    public String getGathererId() {
        return gathererId;
    }

    public String getMtgoImageId() {
        return mtgoImageId;
    }

    public String getExpansionCode() {
        return expansionCode;
    }

    public String getExpansionName() {
        return expansionName;
    }

    public String getCardNumber() {
        return cardNumber;
    }
}
