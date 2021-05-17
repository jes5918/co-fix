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
        // 해당 채널이 존재하는 지 확인
        // 해당 채널이 없다면 채널 생성
        ChannelTopic channel = channels.get(sentenceId);

        if ( channel == null ){
            channel = new ChannelTopic(sentenceId);
            redisMessageListener.addMessageListener(redisSentenceSubscriber, channel);
            channels.put(sentenceId, channel);
        }

        else {
            redisMessageListener.addMessageListener(redisSentenceSubscriber, channel);
            channels.put(sentenceId, channel);
        }

    }

}
