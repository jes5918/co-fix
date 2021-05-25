package com.ssafy.devfolio.pubsub.pubsub;

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
        ChannelTopic channel = channels.get(roomId);

        // 현재 roomId로 된 채널 없으면 생성
        if (channel == null) {
            channel = ChannelTopic.of(roomId);
        }
        redisMessageListener.addMessageListener(redisRoomSubscriber, channel);
        channels.put(roomId, channel);
    }

    public void createSentenceTopic(String sentenceId) {
        // 해당 채널이 존재하는 지 확인
        // 해당 채널이 없다면 채널 생성
        ChannelTopic channel = channels.get(sentenceId);

        if ( channel == null ){
            channel = new ChannelTopic(sentenceId);
        }
        redisMessageListener.addMessageListener(redisSentenceSubscriber, channel);
        channels.put(sentenceId, channel);
    }

}
