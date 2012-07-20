function cardGen(card, otherSide, flip) {
    var i, j, newElement;
    var background, ptBox;
    var cost;
    if (card.cost) {
        cost = card.cost.split('$');
    }
    function setBackground() {
        var i, match, backgroundString, manaPattern, landPattern, ability, abilities, colors, ptColor;
        if (card.type.indexOf("Land") !== -1) {
            if (card.name === "Swamp") {
                backgroundString = "B_BASIC_SWAMP";
            } else if (card.name === "Island") {
                backgroundString = "U_BASIC_ISLAND";
            } else if (card.name === "Plains") {
                backgroundString = "W_BASIC_PLAINS";
            } else if (card.name === "Mountain") {
                backgroundString = "R_BASIC_MOUNTAIN";
            } else if (card.name === "Forest") {
                backgroundString = "G_BASIC_FOREST";
            } else {
                abilities = [];
                colors = "";
                if (card.abilities && card.abilities.length > 0) {
                    abilities = card.abilities.split('$');
                    manaPattern = /\{([RGWUB])(?=\})/g;
                    landPattern = /Forest|Island|Mountain|Plains|Swamp/g;

                    for (i = 0; i < abilities.length; i++) {
                        ability = abilities[i];
                        if (ability.indexOf("to your mana pool") !== -1) {
                            while ((match = manaPattern.exec(ability))) {
                                if (colors.indexOf(match[1]) === -1) {
                                    colors += match[1];
                                }
                            }
                        }
                        if (ability.indexOf("Search your library") !== -1) {
                            while ((match = landPattern.exec(ability))) {
                                if (match[0] === "Forest") {
                                    colors += "G";
                                }
                                if (match[0] === "Island") {
                                    colors += "U";
                                }
                                if (match[0] === "Mountain") {
                                    colors += "R";
                                }
                                if (match[0] === "Plains") {
                                    colors += "W";
                                }
                                if (match[0] === "Swamp") {
                                    colors += "B";
                                }
                            }
                        }
                    }
                }
                backgroundString = (colors || 'C') + "_LAND";
            }
            background = backgroundString;
        } else {
            ptColor = "A";
            colors = "";
            for (i = 0; i < card.cost.length; i++) {
                if ("GRUWB".indexOf(card.cost[i]) !== -1 && colors.indexOf(card.cost[i]) === -1) {
                    colors += card.cost[i];
                }
            }

            if (colors.length > 1) {
                if (colors.length > 2) {
                    colors = "Z";
                }
                colors += "_GOLD";
                ptColor = "GOLD";
            } else {
                if (colors.length === 1) {
                    ptColor = colors;
                }
            }

            if (card.type.indexOf("Artifact") !== -1 || colors.length === 0) {
                colors += (!colors.length ? "A" : "_ARTIFACT");
            }

            background = colors;
            ptBox = ptColor;
        }
    }

    function renderText(card) {
        var i, container, newElement, abilities;

        container = document.createElement('div');
        document.body.appendChild(container);
        container.className = 'text';

        if (card.abilities && card.abilities.length > 0) {
            abilities = card.abilities.split('$');
            for (i = 0; i < abilities.length; i++) {
                if (abilities[i].length > 1) {
                    var text = abilities[i].replace(/\{([\w]{1,2})\}/g, '<img style="height: 16px;" src="resources/img/textCosts/$1.png"/>');
                    text = text.replace(/\{tap\}/g, '<img style="height: 16px;" src="resources/img/textCosts/T.png"/>');
                    text = text.replace(/\{untap\}/g, '<img style="height: 16px;" src="resources/img/textCosts/Q.png"/>');

                    newElement = document.createElement('div');
                    newElement.className = 'regular';
                    newElement.innerHTML = text;
                    container.appendChild(newElement);
                }
            }
        }
        if (card.flavor) {
            newElement = document.createElement('div');
            newElement.className = 'italic';
            newElement.innerHTML = card.flavor;
            container.appendChild(newElement);
        }

        function fitText(parent) {
            var innerElements = $(parent).children(':visible');
            var imgs = $(parent).find('img');
            var fontSize = 19; // use current font-size by default
            var maxHeight = $(parent).height();
            var maxWidth = $(parent).width();
            var innerHeight, innerWidth;

            do {
                innerElements.css('font-size', fontSize);
                imgs.css('height', (fontSize - 3) + 'px');

                // use the combined height of all children, eg. multiple <p> elements.
                innerHeight = $.map(innerElements, function (e) {
                    return $(e).outerHeight();
                }).reduce(function (p, c) {
                    return p + c;
                }, 0);

                innerWidth = innerElements.outerWidth(); // assumes that all inner elements have the same width
                fontSize = fontSize - 1;

            } while ((innerHeight > maxHeight || innerWidth > maxWidth) && fontSize > 7);
        }
        setTimeout(fitText, 20, container);

        return container;
    }

    setBackground();
    var edition;
    i = card.editions.length;
    do {
        i--;
        edition = card.editions[i];
    } while (i > 0 && !edition.mtgoImageId);

    var container = document.createElement('div');
    container.className = 'card';
    container.style.backgroundImage = 'url(resources/img/textures/' + background + '.png)';

    newElement = document.createElement('div');
    newElement.className = 'name';
    newElement.innerHTML = card.name;
    container.appendChild(newElement);

    newElement = document.createElement('div');
    newElement.className = 'type';
    newElement.innerHTML = card.type + (card.subType ? ' - ' + card.subType : '');
    container.appendChild(newElement);

    if (edition.cropImage) {
        container.appendChild(edition.cropImage);
    } else if (edition.mtgoImageId || otherSide) {
        var cropImage = document.createElement('img');
        cropImage.className = 'crop';
        if (typeof otherSide === 'undefined') {
            cropImage.src = 'http://mtgodownload1.onlinegaming.wizards.com/mtgov3/Graphics/Cards/Pics/' + edition.mtgoImageId + '_typ_reg_sty_010.jpg';
        } else {
            cropImage.src = 'http://mtgodownload1.onlinegaming.wizards.com/mtgov3/Graphics/Cards/Pics/' + (edition.mtgoImageId || otherSide.editions[i].mtgoImageId) + '_typ_flip_sty_013.jpg';
            if (flip) {
                cropImage.className += ' flip-vertical';
            }
        }
        cropImage.onerror = function () {
            cropImage.onerror = null;
            cropImage.src = 'http://mtgodownload1.onlinegaming.wizards.com/mtgov3/Graphics/Cards/Pics/' + edition.mtgoImageId + '_typ_reg_sty_001.jpg';
        };
        cropImage.onload = function () {
            cropImage.onload = null;
            edition.cropImage = cropImage;
            container.appendChild(cropImage);
        };
    }

    var sets = ['5ED', 'USG', 'ULG', 'UDS', 'INV', 'PLS', 'WTH', 'TMP', 'APC', 'COK'];
    var setsReplace = ['5E', 'UZ', 'GU', 'CG', 'IN', 'PS', 'WL', 'TE', 'AP', 'CHK'];
    var expansion = edition.expansionCode;
    for (j = 0; j < sets.length; j++) {
        expansion = expansion.replace(sets[j], setsReplace[j]);
    }

    newElement = document.createElement('img');
    newElement.className = 'symbol';
    newElement.src = 'http://gatherer.wizards.com/handlers/image.ashx?size=small&type=symbol&set=' + expansion + '&rarity=' + edition.rarity[0];
    container.appendChild(newElement);

    if (cost) {
        for (i = 0; i < cost.length; i++) {
            newElement = document.createElement('img');
            newElement.className = 'cost';
            newElement.src = 'resources/img/costs/MANA_' + cost[cost.length - i - 1] + '.png';
            newElement.style.right = (7 + 21 * i) + 'px';
            container.appendChild(newElement);
        }
    }

    if (card.toughness) {
        newElement = document.createElement('img');
        newElement.className = 'ptbox';
        newElement.src = 'resources/img/pt/PTBOX_' + ptBox + '.png';
        container.appendChild(newElement);

        newElement = document.createElement('div');
        newElement.className = 'pt';
        newElement.innerHTML = (card.power ? card.power + '/' : '') + card.toughness;
        container.appendChild(newElement);
    }

    container.appendChild(renderText(card));

    return container;
}
