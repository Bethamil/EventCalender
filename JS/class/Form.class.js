export class Form {
    constructor(form, event) {
        this.form = form;
        this.event = event;
    }

    submit() {
        return new Promise((resolve, reject) => {
            fetch("http://localhost:3000/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.event)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Event data submitted:", data);
                    this.form.reset();
                    resolve(true);
                })
                .catch(error => {
                    console.error("Error submitting event data:", error);
                    reject(false);
                });
        });
    }
}
