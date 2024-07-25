import moment from "moment";

const formData = [
    {
        label: "name",
        inputId: "fullname"
    },
    {
        label: "person",
        inputId: "persons"
    },
    {
        label: "reserve date",
        inputId: "rsvdate"
     
    },
    {
        label: "reserve time",
        inputId: "rsvtime"
    },
];

const arrowSvg = `
    <svg fill="currentColor" viewBox="0 0 32 32">
        <path
        d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
    </svg>`;

export class Reservations
{
    constructor()
    {
        this.currentTime = moment().format("HH:mm");
        this.startDate = moment().format('YYYY-MM-DD');
        this.endDate = moment().add(5, 'days').format('YYYY-MM-DD');
        this.initialize();
    }
    initialize()
    {
        const headerSection = document.querySelector(".header_sect");
        const reservationForm = document.createElement("form");
        const header = document.createElement("header");
        const formH1 = document.createElement("h1");
        const lightTxt = document.createElement("p");
        const inputContainer = document.createElement("div");
        const submitBtn = document.createElement("button");

        submitBtn.type = "submit";
        submitBtn.innerText = "book a table";

        inputContainer.className = "input_container";
        reservationForm.className = "reserve_form hidden";
        reservationForm.id = "reservation";
        lightTxt.className = "light_txt";


        formH1.innerText = "make a reservation";
        lightTxt.innerText = "Kindly fill the form below to make a reservation.";

        for (let i = 0; i < formData.length; i++)
        {
            const inputWrapper = document.createElement("div");
            const input = document.createElement("input");
            const border = document.createElement("div");
            const label = document.createElement("label");
            inputWrapper.className = "input_wrapper";
            border.className = "divide";

            label.innerText = formData[i].label;
            label.htmlFor = formData[i].inputId;
            input.id = formData[i].inputId;
            input.name =  formData[i].inputId;

            this.setInputAttributes(input);
            if (i >= 1)
            {
                const wrapper = document.createElement("div");
                const btn = document.createElement("button");
                const dropdownIcon = document.createElement("img");


                inputWrapper.classList.add("input_wrapper--drop");
                wrapper.className = "wrapper";
                btn.className = "btn_input";
                btn.type = "button";

                dropdownIcon.className = "drop-ic";
                dropdownIcon.src = "./assets/icons/drop_down.png";
                dropdownIcon.alt = "dropdown icon image"

                btn.appendChild(dropdownIcon)
                wrapper.appendChild(border);
                wrapper.appendChild(btn);
                inputWrapper.appendChild(wrapper);
                btn.addEventListener("click", this.dropdownBtnEvt);
                input.addEventListener("focus", this.inputFocusEvt);

            } else
            {
                inputWrapper.append(border);
            }
            input.required = true;
            border.insertAdjacentElement("afterend", label);
            inputWrapper.appendChild(input);
            inputContainer.appendChild(inputWrapper);
        }

        submitBtn.insertAdjacentHTML("beforeend", arrowSvg);
        submitBtn.addEventListener("click", this.submitFormEvt);
        header.appendChild(formH1);
        header.appendChild(lightTxt);
        reservationForm.appendChild(header);
        reservationForm.appendChild(inputContainer);
        reservationForm.insertAdjacentElement("beforeend", submitBtn);
        headerSection.insertAdjacentElement("afterend", reservationForm);
    }

    dropdownBtnEvt()
    {
        const wrapper = this.parentElement.parentElement;
        expandInputWrapper(wrapper)

    }
    inputFocusEvt()
    {
        const wrapper = this.parentElement;
        if (!wrapper.classList.contains("expanded"))
        {
            expandInputWrapper(wrapper);
        }
    }
    setInputAttributes(el)
    {
        switch (el.id)
        {
            case "rsvdate":
                el.type = "date";
                el.min = this.startDate;
                el.max = this.endDate;
                el.value = this.startDate;
                break;
            case "rsvtime":
                el.type = "time";
                el.min = this.currentTime;
                el.max = "22:00";
                el.value = this.currentTime;
                break;
            case "fullname":
                el.type = "text";
                el.maxLength = 25;
                el.placeholder = "eg. joe doe"
                break;
            case "persons":
                el.type = "number";
                el.min = 1;
                el.max = 20;
                el.value = 1;
                break;
        }
    }
    submitFormEvt(evt){
        evt.preventDefault();
        const fName = document.querySelector('#fullname');
        const fullName = document.querySelector('#fullname').value;
        const persons = document.querySelector('#persons').value;
        const rsvtime = document.querySelector('#rsvtime').value;
        const rsvdate = document.querySelector('#rsvdate').value;
        if (fullName === ""){
            fName.focus();
            return;
        }
        console.log('object :>> ', object);
        console.log('fullName :>> ', fullName, persons, rsvtime, rsvdate);
    }
    successMsg(){
        let html = `
            <h1>Thank You!</h1>
            <p>
            Thanks for making a reservation! We hope you have fun
            using our platform. If you ever need support, please feel free
            to email us at support@loremgaming.com.
            </p>
        `
    }
};

const expandInputWrapper = ((el) =>
{
    const inputField = el.lastElementChild;
    el.classList.toggle("expanded");
    el.addEventListener("animationend", ()=>{
        inputField.classList.toggle("visible");
    });
});