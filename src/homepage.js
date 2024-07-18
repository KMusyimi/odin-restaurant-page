import { MenuPage } from "./menu";

const navItemsData = [
    {
        "parent": "header_sect",
        "cls": "inbox",
        "img": "./assets/icons/inbox.svg",
        "alt": "inbox icon image"
    },
    {
        "parent": "header_sect",
        "cls": "profile",
        "img": "./assets/icons/profile.svg",
        "alt": "profile icon image"
    },
    {
        "parent": "footer",
        "cls": "fb-ic",
        "img": "./assets/icons/facebook-icon.svg",
        "alt": "facebook icon image"
    },
    {
        "parent": "footer",
        "cls": "x-ic",
        "img": "./assets/icons/x-icon.svg",
        "alt": "X icon image"
    },
    {
        "parent": "footer",
        "cls": "insta-ic",
        "img": "./assets/icons/insta-icon.svg",
        "alt": "instagram icon image"
    }
];

const menuCardData = [
    {
        "type": "drinks",
        "img": "./assets/images/drinks.jpg",
        "alt": "sample drinks image",
        "arrowSvg": `<svg fill="currentColor" id="drinks_ar" viewBox="0 0 32 32">
            <path
            d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
        </svg>`

    },
    {
        "type": "food",
        "img": "./assets/images/food.jpg",
        "alt": "sample food image",
        "arrowSvg": `<svg fill="currentColor" id="food_ar" viewBox="0 0 32 32">
            <path
            d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
        </svg>`
    }
];

const objY = {
    x: 0,
    y: 100
};

const objX = {
    x: 100,
    y: 0
};



export class HomePage
{
    constructor()
    {
        this.initialize();

    }
    initialize()
    {
        const container = document.querySelector(".container");

        const content = document.createElement("main");
        const img_wrapper = document.createElement("figure");
        const restaurantImg = document.createElement("img");


        content.setAttribute("id", "content");

        img_wrapper.setAttribute("class", "img_wrapper");
        restaurantImg.src = "./assets/images/restaurant.jpg";
        restaurantImg.alt = "sample restaurant image";
        restaurantImg.loading = "lazy";

        img_wrapper.insertAdjacentElement('beforeend', restaurantImg);
        content.insertAdjacentElement("beforeend", img_wrapper);

        this.createContentSection(content);
        container.insertAdjacentElement("beforeend", content);
        this.animateMainSection();

    }

    createContentSection(parent)
    {
        const content_sect = document.createElement("div");
        const header_sect = document.createElement("div");

        const year = document.createElement("span");

        const footer = document.createElement("footer");
        const footerH1 = document.createElement("h1");

        content_sect.className = "content_sect";

        header_sect.className = "header_sect";
        year.className = "year";

        year.innerText = new Date().getFullYear();
        header_sect.appendChild(year);
        this.createNavItems(header_sect);

        content_sect.appendChild(header_sect);

        this.createMainSection(header_sect);


        footer.appendChild(footerH1);
        footer.className = "footer";
        footerH1.innerText = "Explore";

        this.createNavItems(footer);

        content_sect.appendChild(footer);

        parent.insertAdjacentElement("beforeend", content_sect);
    }

    createMainSection(parent)
    {

        const main_sect = document.createElement("main");
        const lightTxt = document.createElement("p");
        const menuTxt = document.createElement("h1");
        const divWrapper = document.createElement("div");
        const div = document.createElement("div");

        main_sect.className = "main_sect";
        main_sect.id = "hidden";
        menuTxt.innerText = "our menu";

        lightTxt.className = "light-txt";
        lightTxt.innerText = "Let us satisfy your cravings";

        div.appendChild(lightTxt);
        div.appendChild(menuTxt);
        divWrapper.appendChild(div);
        main_sect.appendChild(divWrapper);

        this.createCard(main_sect);
        parent.insertAdjacentElement("afterend", main_sect);
    }

    animateMainSection()
    {
        const mainSection = document.querySelector(".main_sect");
        const firstChildNodes = mainSection.firstChild.childNodes;
        const lastChildNodes = mainSection.lastChild.childNodes;

        let delay = 100;

        animateChildren(firstChildNodes[0].childNodes, objY);
        animateChildren(lastChildNodes, objX);

        function animateChildren(node, obj)
        {
            node.forEach(child =>
            {
                delay = delay + 125;
                child.classList.add("fade-in");
                child.style.transform = `translate3d(-${obj.x}px, -${obj.y}px, 0px) scale3d(1, 1, 1)`;
                child.style.animationDelay = `${delay}ms`;

                child.addEventListener("animationend", () =>
                {
                    child.classList.remove("fade-in");
                    child.removeAttribute("style");
                }, { once: true });
            });
            delay = 100;
        }
    }

    displayMenuEvt(evt)
    {
        const cardWrapper = document.querySelector(".card_wrapper");
        let btnId = evt.target.id;
        if (btnId === "")
        {
            btnId = evt.target.parentElement.id;
        }
        btnId = btnId.split("_")[0];
        cardWrapper.classList.add("fade-out");
        cardWrapper.addEventListener("animationend", () =>
        {
            cardWrapper.parentElement.removeChild(cardWrapper);
            const menuPage = new MenuPage(btnId);
            menuPage.initialize();
        });
    }

    createCard(parent)
    {
        const cardWrapper = document.createElement("div");

        cardWrapper.classList.add("card_wrapper");
        for (let i = 0; i < menuCardData.length; i++)
        {
            const card = document.createElement("section");
            const cardH1 = document.createElement("h1");

            const cardHeader = document.createElement("header");
            const cardFigure = document.createElement("figure");

            const cardImg = document.createElement("img");
            const cardButton = document.createElement("button");

            card.className = "card";
            cardButton.id = menuCardData[i].type;
            cardH1.innerText = menuCardData[i].type;
            cardImg.src = menuCardData[i].img;
            cardImg.alt = menuCardData[i].alt;

            cardButton.innerText = "view menu";

            cardButton.insertAdjacentHTML("beforeend", menuCardData[i].arrowSvg);
            cardButton.addEventListener("click", this.displayMenuEvt.bind(this));

            cardHeader.appendChild(cardH1);
            cardFigure.appendChild(cardImg);

            card.appendChild(cardHeader);
            card.appendChild(cardFigure);

            card.appendChild(cardButton);
            cardWrapper.appendChild(card);

        }
        parent.appendChild(cardWrapper);
    }
    createNavItems(parent)
    {
        const nav = document.createElement("nav");
        const navItems = document.createElement("ul");

        navItems.className = 'nav_items';

        for (let i = 0; i < navItemsData.length; i++)
        {

            const el = navItemsData[i].parent;
            if (el == parent.className)
            {
                const navList = document.createElement("li");
                const navLink = document.createElement("a");
                const icon = document.createElement("img");

                navLink.setAttribute('href', '#');
                icon.className = `icon ${navItemsData[i].cls}`;
                icon.src = navItemsData[i].img;
                icon.alt = navItemsData[i].alt;
                navLink.appendChild(icon);
                navList.appendChild(navLink);
                navItems.appendChild(navList);
            }
        }
        nav.appendChild(navItems);
        parent.appendChild(nav);
    }

}

