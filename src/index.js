import { HomePage } from "./homepage";
import { Reservations } from "./reservations";

const navBtn = document.querySelectorAll(".header .nav ul li > button");
// TODO: aad and animation class to handle all my animations
document.addEventListener("DOMContentLoaded", function ()
{
    const homepage = new HomePage();
    const reservation = new Reservations();
    const content = document.querySelector("#content");
    const headerSect = document.querySelector(".header_sect");


    const navBtnEvt = (evt =>
    {
        const contentSect = content.lastElementChild;
        contentSect.removeChild(contentSect.children[1]);
        navBtn.forEach(btn =>
        {
            if (btn.classList.contains("active"))
            {
                btn.classList.remove("active");
            }
            evt.target.className = 'active';
        });
        const newTabId = evt.target.id;
        if (newTabId === "home")
        {
            homepage.createMainSection(headerSect);
            homepage.animateMainSection();
        } else if (newTabId === "reservation"){
            reservation.initialize();
        }

    });
    navBtn.forEach(btn =>
    {
        btn.addEventListener("click", navBtnEvt)
    });

})
