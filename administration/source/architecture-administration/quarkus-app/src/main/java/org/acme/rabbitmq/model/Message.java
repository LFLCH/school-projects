package org.acme.rabbitmq.model;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class Message {

    public String email;
    public String subject;
    public String text;
    public String ical;

    public Message() {
    }

    public Message(String email, String subject, String text, String ical) {
        this.email = email;
        this.subject = subject;
        this.text = text;
        this.ical = ical;
    }

    @Override
    public String toString() {
        return "Message reçu :\nEmail: " + this.email + "\nSubject: " + this.subject + "\nText: " + this.text
                + "\nical: " + this.ical;
    }

}
