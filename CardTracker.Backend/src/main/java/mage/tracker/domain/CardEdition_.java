package mage.tracker.domain;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(CardEdition.class)
public abstract class CardEdition_ {

	public static volatile SingularAttribute<CardEdition, Long> id;
	public static volatile SingularAttribute<CardEdition, Expansion> expansion;
	public static volatile SingularAttribute<CardEdition, String> gathererId;
	public static volatile SingularAttribute<CardEdition, CardRarity> rarity;
	public static volatile SingularAttribute<CardEdition, Card> card;
	public static volatile SingularAttribute<CardEdition, String> mtgoImageId;
	public static volatile SingularAttribute<CardEdition, String> cardNumber;

}

