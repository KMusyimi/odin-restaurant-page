import { HomePage } from "./homepage";

const navBtn = document.querySelectorAll(".header .nav ul li > button");
// TODO: aad and animation class to handle all my animations
document.addEventListener("DOMContentLoaded", function ()
{
    // const homepage = new HomePage();
    const content = document.querySelector("#content");
    const headerSect = document.querySelector(".header_sect");


    const navBtnEvt = (evt =>
    {
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
            const contentSect = content.lastElementChild;
            contentSect.removeChild(contentSect.children[1]);
            homepage.createMainSection(headerSect);
            homepage.animateMainSection();
        }

    });
    navBtn.forEach(btn =>
    {
        btn.addEventListener("click", navBtnEvt)
    });

})
