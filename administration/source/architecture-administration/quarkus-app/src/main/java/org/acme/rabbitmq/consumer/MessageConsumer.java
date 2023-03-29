package org.acme.rabbitmq.consumer;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.acme.rabbitmq.model.Message;
import org.eclipse.microprofile.reactive.messaging.Incoming;
import org.jboss.logging.Logger;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.reactive.ReactiveMailer;
import io.smallrye.mutiny.Uni;
import io.vertx.core.json.JsonObject;

@ApplicationScoped
public class MessageConsumer {

    private final Logger logger = Logger.getLogger(Message.class);

    @Inject
    ReactiveMailer reactiveMailer;

    /**
     * Récupération du message sous forme JSON via la queue 'messages' de RabbitMQ
     * pour l'envoyer par mail
     * 
     * @param payload : JSON contenant le message à envoyer par mail
     * @return Uni<Void>
     */
    @Incoming("messages")
    public Uni<Void> consumeMessage(JsonObject payload) {
        JsonObject jsonObject = payload.getJsonObject("data");
        Message msg = jsonObject.mapTo(Message.class);
        logger.infof(msg.toString());

        return reactiveMailer.send(
                Mail.withText(msg.email, msg.subject, msg.text));
    }

}
