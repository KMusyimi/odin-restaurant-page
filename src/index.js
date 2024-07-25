import { HomePage } from "./homepage";
import { Reservations } from "./reservations";

const navBtn = document.querySelectorAll(".header .nav ul li > button");
// TODO: aad and animation class to handle all my animations
document.addEventListener("DOMContentLoaded", function ()
{
    const homepage = new HomePage();
    const reservation = new Reservations();
    const content = document.querySelector("#content");
    const contentSect = document.querySelector(".content_sect");
    const inputWrapper = document.querySelector(".input_wrapper");
    const headerSect = document.querySelector(".header_sect");


    const navBtnEvt = (evt =>
    {
        
        // const contentSect = content.lastElementChild;
        // contentSect.removeChild(contentSect.children[1]);
        navBtn.forEach(btn =>
        {
            if (btn.classList.contains("active"))
            {
                btn.classList.remove("active");
            }
        });
        const cls = evt.target.getAttribute("class");
      
        evt.target.classList.add('active');

        const oldContent = document.querySelector(".visible");
        const newContent = document.getElementById(cls);
        oldContent.classList.add("fade-out");

        oldContent.classList.remove("visible");
        oldContent.addEventListener("animationend", () =>
        {
            oldContent.classList.add("hidden");
            newContent.classList.add("fade-in");
            newContent.classList.remove("hidden");
            oldContent.classList.remove("fade-out");
            newContent.addEventListener("animationstart", () =>
            {
                newContent.classList.remove("fade-in");
                resetHomePage();
                newContent.classList.add("visible");
            }, { once: true })

        }, { once: true });
        const resetHomePage = ()=>{
            if (cls === "home")
            {
                contentSect.childNodes.forEach(node =>
                {
                    if (node.classList.contains("main_sect"))
                    {
                        node.parentElement.removeChild(node);
                        homepage.createMainSection(headerSect);
                        homepage.animateMainSection();
                    }
                })
            }
        }
        // if (newTabId === "home")
        // {
        //     homepage.createMainSection(headerSect);
        //     homepage.animateMainSection();
        // } else if (newTabId === "reservation"){
        //     reservation.initialize();
        // }

    });
    navBtn.forEach(btn =>
    {
        btn.addEventListener("click", navBtnEvt)
    });

})
