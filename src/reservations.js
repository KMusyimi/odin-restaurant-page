import moment from "moment";

let date = new Date().toLocaleDateString();
console.log('moment :>> ', moment().add(5, 'days').calendar());

const formData = [
    {
        label: "name",
        // for will be similar for name and id for input
        for: "fullname",
        inputType: "text",
        placeholder: "eg. joe doe"
    },
    {
        label: "person",
        // for will be similar for name and id for input
        for: "persons",
        inputType: "number",
        placeholder: "01",
        min: 1,
        max: 50
    },
    {
        label: "reserve date",
        // for will be similar for name and id for input
        for: "rsvdate",
        inputType: "date",
        placeholder: "2024-04-04",
        min: moment().format('L'),
        max: moment().add(5, 'days').format('L')
    },
    {
        label: "reserve time",
        // for will be similar for name and id for input
        for: "rsvtime",
        inputType: "time",
        placeholder: "18:00",
        min: moment().format('LT'),
        max: "22:00"
    },
]

export class Reservations
{
    constructor()
    {

    }
    initialize()
    {
        const headerSection = document.querySelector(".header_sect");
        const reservationForm = document.createElement("form");
        const header = document.createElement("header");
        const formH1 = document.createElement("h1");
        const lightTxt = document.createElement("p");
        const inputContainer = document.createElement("div");
        const name = document.createElement('label');
        const person = document.createElement('label');
        const reserve_date = document.createElement('label');
        const reserve_time = document.createElement('label');

        inputContainer.className = "input_container";
        reservationForm.className = "reserve_form";
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
            label.htmlFor = formData[i].for;
            input.id = formData[i].for;
            input.placeholder = formData[i].placeholder;
            if (i >= 1)
            {
                const wrapper = document.createElement("div");
                const btn = document.createElement("button");
                const dropdownIcon = document.createElement("img");
                input.min = formData[i].min;
                input.max = formData[i].max;


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

            } else
            {
                inputWrapper.append(border);
            }
            input.required = true;
            border.insertAdjacentElement("afterend", label);
            inputWrapper.appendChild(input);
            inputContainer.appendChild(inputWrapper);
        }
        header.appendChild(formH1);
        header.appendChild(lightTxt);
        reservationForm.appendChild(header);
        reservationForm.appendChild(inputContainer);
        headerSection.insertAdjacentElement("afterend", reservationForm);
    }
}