package com.ssafy.devfolio.commentroom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.listener.ChannelTopic;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChannelDto {
    private String id;
    private ChannelTopic channel;
}
