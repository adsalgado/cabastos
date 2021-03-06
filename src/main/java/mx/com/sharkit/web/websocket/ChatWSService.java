package mx.com.sharkit.web.websocket;

import static mx.com.sharkit.config.WebsocketConfiguration.IP_ADDRESS;

import java.security.Principal;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import mx.com.sharkit.security.SecurityUtils;
import mx.com.sharkit.web.websocket.dto.MessageDTO;

@Controller
public class ChatWSService implements ApplicationListener<SessionDisconnectEvent> {

    private static final Logger log = LoggerFactory.getLogger(ChatWSService.class);

    private DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private final SimpMessageSendingOperations messagingTemplate;

    public ChatWSService(SimpMessageSendingOperations messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }


    @SubscribeMapping("/chat/public")
    public void subscribe(StompHeaderAccessor stompHeaderAccessor, Principal principal) {
    	log.debug("Principal: {}", principal);
        String login = SecurityUtils.getCurrentUserLogin().orElse("anonymoususer");
        String ipAddress = stompHeaderAccessor.getSessionAttributes().get(IP_ADDRESS).toString();
        log.debug("User {} subscribed to Chat from IP {}", login, ipAddress);
        MessageDTO messageDTO = new MessageDTO();
        messageDTO.setUserLogin("System");
        messageDTO.setTime(dateTimeFormatter.format(ZonedDateTime.now()));
        messageDTO.setMessage(login + " joined the chat");
        messagingTemplate.convertAndSend("/chat/public", messageDTO);
    }

    @MessageMapping("/chat")
    @SendTo("/chat/public")
    public MessageDTO sendChat(@Payload MessageDTO messageDTO, StompHeaderAccessor stompHeaderAccessor, Principal principal) {
        messageDTO.setUserLogin(principal.getName());
        return setupMessageDTO(messageDTO, stompHeaderAccessor, principal);
    }

    @Override
    public void onApplicationEvent(SessionDisconnectEvent event) {
        // when the user disconnects, send a message saying that hey are leaving
        log.info("{} disconnected from the chat websockets", event.getUser().getName());
        MessageDTO messageDTO = new MessageDTO();
        messageDTO.setUserLogin("System");
        messageDTO.setTime(dateTimeFormatter.format(ZonedDateTime.now()));
        messageDTO.setMessage(event.getUser().getName() + " left the chat");
        messagingTemplate.convertAndSend("/chat/public", messageDTO);
    }

    private MessageDTO setupMessageDTO (MessageDTO messageDTO, StompHeaderAccessor stompHeaderAccessor, Principal principal) {
        messageDTO.setTime(dateTimeFormatter.format(ZonedDateTime.now()));
        log.debug("Sending user chat data {}", messageDTO);
        return messageDTO;
    }
    
}
