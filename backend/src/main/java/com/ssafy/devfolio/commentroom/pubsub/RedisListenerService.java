package com.ssafy.devfolio.commentroom.pubsub;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class RedisListenerService {

    private final RedisMessageListenerContainer redisMessageListener;
    private final RedisRoomSubscriber redisRoomSubscriber;
    private final RedisSentenceSubscriber redisSentenceSubscriber;
    private final Map<String, ChannelTopic> channels;


    public void createRoomTopic(String roomId) {
        ChannelTopic channel = new ChannelTopic(roomId);
        redisMessageListener.addMessageListener(redisRoomSubscriber, channel);
        channels.put(roomId, channel);
    }

    public void createSentenceTopic(String sentenceId) {
        ChannelTopic channel = new ChannelTopic(sentenceId);
        redisMessageListener.addMessageListener(redisSentenceSubscriber, channel);
        channels.put(sentenceId, channel);
    }

}
