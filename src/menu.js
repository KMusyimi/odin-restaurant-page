import { menuData } from "./menu-data";

const foodCategory = ["starter", "main_dish", "salad", "dessert"];
const drinksCategory = ["whiskey", "vodka", "gin", "spirit"];

const navArr = [{
    symbol: "previous",
    svg: `<svg fill="currentColor" viewBox="0 0 32 32" id="previous_ic" class="icon">
            <path
                d="M10.1,23a1,1,0,0,0,0-1.41L5.5,17H29.05a1,1,0,0,0,0-2H5.53l4.57-4.57A1,1,0,0,0,8.68,9L2.32,15.37a.9.9,0,0,0,0,1.27L8.68,23A1,1,0,0,0,10.1,23Z" />
        </svg>`
},
{
    symbol: "next",
    svg: `<svg fill="currentColor" viewBox="0 0 32 32" id="next_ic" class="icon">
            <path
                d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
        </svg>`
}];


const menuCategory = [
    {
        "type": "drinks",
        "svg": `<svg height="24px" id="drinks_ic" viewBox="0 0 24 24" width="24px" fill="currentColor"><rect height="2" width="2" x="11"/><path d="M13,7.1V3h-2v4.1c-1.7,0.4-3,2-3,3.9v12c0,0.6,0.4,1,1,1h6c0.6,0,1-0.4,1-1V11C16,9.1,14.7,7.6,13,7.1z M14,22h-4v-6h4V22z    M14,15h-4v-3h4V15z M10,11c0-1.1,0.9-2,2-2s2,0.9,2,2H10z"/></svg>`
    },
    {
        "type": "food",
        "svg": `<svg viewBox="0 0 24 24" id="food_ic" height="24px" width="24px" fill="currentColor"><path d="M4.222 3.808l6.717 6.717-2.828 2.829-3.89-3.89a4 4 0 0 1 0-5.656zm10.046 8.338l-.854.854 7.071 7.071-1.414 1.414L12 14.415l-7.071 7.07-1.414-1.414 9.339-9.339c-.588-1.457.02-3.555 1.62-5.157 1.953-1.952 4.644-2.427 6.011-1.06s.892 4.058-1.06 6.01c-1.602 1.602-3.7 2.21-5.157 1.621z"/></svg>`

    }];
let counter = 0;
const gap = 1.6 * 16;
let count = 0;
let delay = 100;

export class MenuPage
{
    constructor(btnId)
    {
        this.btnId = btnId;
        this.createBtnMenu();
    }

    initialize()
    {
        const mainSect = document.querySelector(".main_sect");
        const menuWrapper = document.createElement("div");
        const menuItems = document.createElement("div");
        const btnWrapper = document.createElement("div");
        const menuBtn = document.createElement("div");

        let arr = [];
        menuWrapper.className = "menu_wrapper";
        btnWrapper.className = "btn_wrapper slide-y";
        btnWrapper.style.animationDelay = "250ms";
        menuBtn.className = "menu_btn";

        menuItems.className = "menu_items";
        if (this.btnId === "food")
        {
            arr = foodCategory;
        } else if (this.btnId == "drinks")
        {
            arr = drinksCategory;
        }


        for (let i = 0; i < arr.length; i++)
        {
            const btn = document.createElement("button");
            btn.setAttribute("id", arr[i]);
            btn.setAttribute("type", "button");
            btn.innerHTML = arr[i];
            if (arr[i] === "main_dish")
            {
                let mainDish = arr[i];
                btn.innerHTML = mainDish.replace("_", " ");
            }

            menuBtn.appendChild(btn);

            menuBtn.firstChild.className = "active";
            btn.addEventListener("click", this.menuBtnEvt.bind(this));
        }


        btnWrapper.appendChild(menuBtn);
        menuWrapper.appendChild(btnWrapper);

        this.createNavBtn(btnWrapper);
        menuWrapper.insertAdjacentElement("beforeend", menuItems);
        mainSect.insertAdjacentElement("beforeend", menuWrapper);
        this.populateMenu();
        // TODO: edit later
        this.removeAnimationEnd("slide-y");

    }
    createNavBtn(el)
    {
        const navWrapper = document.createElement("div");
        navWrapper.className = "nav_wrapper";
        navArr.forEach(obj =>
        {
            const btn = document.createElement("button");
            btn.id = obj.symbol;
            btn.type = "button";
            btn.innerHTML = obj.svg;
            navWrapper.appendChild(btn);
            btn.addEventListener("click", this.navBtnEvt);
        });
        el.insertAdjacentElement("beforeend", navWrapper);

    }
    createBtnMenu()
    {
        const divWrapper = document.querySelector(".main_sect > div");
        const div = document.createElement("div");
        div.className = "icon_wrapper slide-y";
        menuCategory.forEach(menu =>
        {
            const button = document.createElement("button");
            button.type = "button";
            button.id = menu.type;
            div.appendChild(button);
            button.innerHTML = menu.svg;
            button.addEventListener("click", this.menuButtonEvt.bind(this));
            if (this.btnId === button.id)
            {
                button.classList.add("active");
            }
        });
        divWrapper.appendChild(div);

    }
    removeAnimationEnd(cls)
    {
        const els = document.querySelectorAll(`.${cls}:not(.menu_card)`);
        els.forEach(el =>
        {
            el.addEventListener("animationend", () =>
            {
                el.style.removeProperty("animation-delay");
                el.classList.remove(`${cls}`);
            });
        })

    }
    menuButtonEvt(evt)
    {
        const icons = document.querySelectorAll(".icon_wrapper > button");
        const mainSect = document.querySelector(".main_sect");
        let btnId = evt.target.id;
        if (btnId === "")
        {
            btnId = evt.target.parentElement.id;
        }

        icons.forEach(icon =>
        {
            icon.classList.remove("active");
        });
        btnId = btnId.split("_")[0];
        this.btnId = btnId;
        document.getElementById(this.btnId).classList.add("active");
        mainSect.removeChild(mainSect.lastChild);
        this.initialize();

    }

    menuBtnEvt(evt)
    {
        const menuBtn = document.querySelectorAll(".menu_btn > button");
        menuBtn.forEach(btn =>
        {
            if (btn.classList.contains("active"))
            {
                btn.classList.remove("active");
            }
        })
        evt.target.classList.add("active");
        this.populateMenu();
    }

    navBtnEvt()
    {
        const menuItems = document.querySelector(".menu_items");
        const width = document.querySelector(".menu_card").offsetWidth;
        let btnId = this.id;

        if (btnId === "next")
        {
            counter++;
            if (counter === count)
            {
                counter = count - 1;
            }
            setLeftPosition(counter, width, gap, menuItems);
        }
        else if (btnId === "previous")
        {
            counter--;
            if (counter < 0)
            {
                counter = 0;
            }
            setLeftPosition(counter, width, gap, menuItems);
        }
    }
    populateMenu()
    {
        const menuBtn = document.querySelectorAll(".menu_btn > button");
        const menuItems = document.querySelector(".menu_items");

        menuItems.innerHTML = '';

        if (menuItems.classList.contains("empty"))
        {
            menuItems.className = 'menu_items';
        }

        menuBtn.forEach(btn =>
        {
            const btnId = btn.getAttribute("id");
            if (btn.classList.contains("active"))
            {
                menuItems.id = `${btnId}_menu`;
                menuData.forEach(menu =>
                {
                    if (menu.type === btnId)
                    {
                        menuCardElement(menuItems, menu);
                        resetMenuLeft(menuItems);

                    }
                });
                if (menuItems.children.length === 0)
                {
                    menuItems.classList.add("empty");
                    menuItems.style.width = "100%";

                    const html = `
                        <div style="height:210px; margin-bottom: 0;">
                           <iframe style="border:none;" src="https://lottie.host/embed/c6341566-1f30-4f47-860d-447e5c2e2b16/fkDDGR1bYi.json"></iframe>
                            <p class="light-txt" style="font-size:1rem; font-weight:500; "><span style="text-transform:uppercase; font-weight:700;">${btnId}</span> is currently out of stock.</p>
                        </div>`

                    menuItems.innerHTML = html;

                }
            }
        });
        animateCards();
    }

}
// TODO: animate class
const animateCards = () =>
{

    const cards = document.querySelectorAll(".menu_card");
    cards.forEach(card =>
    {
        card.classList.add("fade-in");
        delay = delay + 100;

        if (delay >= 500)
        {
            delay = 500;
        }
        card.style.animationDelay = `${delay}ms`

    })
    delay = 100;
}

const resetMenuLeft = el =>
{
    const width = document.querySelector(".menu_card").offsetWidth;
    count = document.querySelectorAll(".menu_card").length;
    const totalWidth = `${(width + gap) * count}`;
    el.style.width = `${totalWidth}px `;

    counter = 0;

    setLeftPosition(counter, width, gap, el);
}

const menuCardElement = (parent, menu) =>
{
    const menuCard = document.createElement("div");
    const menuFigure = document.createElement("figure");
    const menuImg = document.createElement("img");
    const div = document.createElement("div");
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const price = document.createElement("p");
    const currency = document.createElement("span");

    menuCard.className = "menu_card";
    menuFigure.className = "menu_img";
    title.className = "title";
    description.className = "description";
    price.className = "price";
    currency.className = "currency";



    title.innerHTML = menu.title;
    description.innerHTML = menu.description;
    price.innerHTML = menu.price;
    currency.innerHTML = menu.currency;
    //  TODO: add images
    menuImg.src = "./assets/images/whiskey.jpg";
    menuImg.alt = "menu image";
    menuImg.loading = "lazy";


    div.appendChild(title);
    div.insertAdjacentElement("beforeend", description);
    div.insertAdjacentElement("beforeend", price);
    price.insertAdjacentElement("afterbegin", currency);
    menuFigure.appendChild(menuImg);

    menuCard.appendChild(div);
    menuCard.appendChild(menuFigure);

    parent.appendChild(menuCard);
}

function setLeftPosition(counter, width, gap, menuItems)
{
    let leftPosition = 0;

    const menuWidth = (width + gap);
    leftPosition = `-${counter * menuWidth}px`;
    menuItems.style.left = leftPosition;
}