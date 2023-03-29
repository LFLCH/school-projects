package org.acme;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GreetingService {
    
    public String greetting(String name) {
        return "hello " + name;
    }

}
