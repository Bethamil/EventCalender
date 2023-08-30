import { Event } from './class/Event.class.js';
import { Form } from './class/Form.class.js';


if (document.getElementById("event-form-container")) {
    handleForm();
} else if (document.getElementById("event-container")) {
    addAllEventCards();
}

function handleForm() {
    const formElement = document.getElementById("event-form");
    const submitButton = formElement.querySelector(".submit-button");
 
    submitButton.addEventListener("click", function (e) {
        e.preventDefault();

        const eventType = document.getElementById("event-type").value;
        const title = document.getElementById("event-title").value;
        const date = document.getElementById("event-date").value;
        const startTime = document.getElementById("event-start-time").value;
        const endTime = document.getElementById("event-end-time").value;
        const location = document.getElementById("event-location").value;
        const url = document.getElementById("event-url").value;
        const description = document.getElementById("event-description").value;

        if (!eventType || !title || !date) {
            alert("Please fill out all required fields.");
            return;
        }

        const eventInstance = new Event(
            eventType,
            title,
            date,
            startTime,
            endTime,
            location,
            url,
            description
        );

        const form = new Form(formElement, eventInstance);
        form.submit()
            .then(success => {
                console.log("successfully submitted");
                showMessage(true);

            })
            .catch(error => {
                console.error("Error:", error);
                showMessage(false);
            });

    });
}

function addAllEventCards() {
    document.addEventListener("DOMContentLoaded", function () {
        Event.getAllCards()
            .then(allEvents => {
                allEvents.forEach(event => {
                    createSingleEventCard(event);
                });
            })
            .catch(error => {
                console.error("Error:", error);
            });
    });
}

function createSingleEventCard(event) {
    const eventContainer = document.getElementById("event-container")
    const card = document.createElement("div");
    card.classList.add("card");
    const inPast = event.daysDifference() == 'Too late' ? 'in-past' : '';
    let cardContent = `<div class="till-today ${inPast}"><p>${event.daysDifference()}</p></div> <div class="card-text">`;

    cardContent += `<h2>${event.title}</h2>`;
    cardContent += `<p>${event.type}</p>`;
    cardContent += `<p>Date: ${event.date}</p>`;

    if (event.startTime && event.endTime) {
        cardContent += `<p>Time: ${event.startTime} - ${event.endTime}</p>`;
    }

    if (event.location) {
        cardContent += `<p>Location: ${event.location}</p>`;
    }

    if (event.url) {
        cardContent += `Website: <a href="${event.url}" target="_blank">${event.url}</a>`;
    }

    if (event.description) {
        cardContent += `<p>${event.description}</p>`;
    }

    cardContent += `</div>`;
    card.innerHTML = cardContent;
    eventContainer.appendChild(card);
}

function showMessage(success) {
    const formMessage = document.querySelector('.form-message');
    if (formMessage) {
        formMessage.remove();
    }

    const message = document.createElement("div");
    message.classList.add("form-message");

    if (success) {
        message.textContent = "Form submitted successfully";
        message.classList.add('success-message');
    } else {
        message.textContent = "Form has not been submitted";
        message.classList.add('error-message');

    }

    const container = document.getElementById("event-form-container");
    const form = document.getElementById('event-form');
    container.insertBefore(message, form);
}


