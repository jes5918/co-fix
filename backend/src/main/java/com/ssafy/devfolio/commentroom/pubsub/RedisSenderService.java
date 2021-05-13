package com.ssafy.devfolio.commentroom.pubsub;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.devfolio.commentroom.dto.CommentRoomSocket;
import com.ssafy.devfolio.sentence.Sentence;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisSenderService {

    private final String COMMENT_ROOM_PREFIX = "room:";
    private final String DOCUMENT_PREFIX = "document:";
    private final String MEMBER_ROOM_PREFIX = "member-room:";

    private final RedisTemplate<String, String> redisTemplate;
    private HashOperations<String, String, String> hashOperations;
    private ValueOperations<String, String> valueOperations;
    private ListOperations<String, String> listOperations;

    private final ChannelTopic channelTopic;
    private final ObjectMapper objectMapper;

    public void sendSentenceUpdateService(String roomId, Sentence sentence) {
        // roomId로 방 정보 얻어오고
        valueOperations.get(COMMENT_ROOM_PREFIX + roomId);


        CommentRoomSocket(방정보, sentence);
        redisTemplate.convertAndSend(channel, 위에 소켓객체);

        // 받은 곳
//        redisTemplate.convertAndSend(channelTopic.getTopic(), objectMapper.writeValueAsString());


//        CommentRoomSocket.builder()
//                .roomId()
//                .sentence(sentence)
//                .

        redisTemplate.convertAndSend(channelTopic.getTopic(), hashOperations.get(DOCUMENT_PREFIX + documentId, sentenceId));
    }
}
