package com.ssafy.devfolio.utils.property;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "redis.prefix")
@Getter @Setter
public class RedisKeyPrefixProperties {
    private String commentRoom;
    private String document;
    private String memberRoom;
    private String sentence;
    private String pinCheck;
    private String participant;
}
