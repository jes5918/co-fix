package com.ssafy.devfolio.utils;

import com.ssafy.devfolio.member.domain.MemberDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.List;

public class Utility {

    public static Long getMemberIdFromAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ((MemberDetails) authentication.getPrincipal()).getMemberId();
    }

    private static boolean isOpenBracket(char current) {
        return current == '\'' || current == '\"' || current == '(' || current == '{' || current == '[';
    }

    private static boolean isCloseBracket(char current) {
        return current == '\'' || current == '\"' || current == ')' || current == '}' || current == ']';
    }

    private static boolean isNumber(char current) {
        return current == '0' || current == '1' || current == '2' || current == '3' || current == '4'
                || current == '5' || current == '6' || current == '7' || current == '8' || current == '9';
    }

    public static List<String> splitDocument(String content) {
        List<String> sentences = new ArrayList<>();

        String[] paragraphs = content.split("[\n]+");

        for (String paragraph : paragraphs) {
            StringBuilder sentence = new StringBuilder();
            boolean punctuation = false; // 현재 구두점(.)찍힌 상태인지 아닌지 (....같은 부분 체크 위함)
            boolean inBrackets = false; // (, [, {, ', " 안에 있는 경우 확인
            boolean canBeDecimal = false; // 3.5 등 소수는 문장구분 제외

            for (int i = 0; i < paragraph.length(); i++) {
                char current = paragraph.charAt(i);

                if (isOpenBracket(current)) {
                    inBrackets = true;
                } else if (inBrackets && isCloseBracket(current)) {
                    inBrackets = false;
                }

                if (inBrackets) {
                    // (, [, {, ', " 안에 있는 경우는 문장 나누지 않음
                    sentence.append(current);
                } else {
                    if (current == '?' || current == '!') {
                        sentence.append(current);
                        sentences.add(sentence.toString().trim());
                        sentence = new StringBuilder();
                    } else if (current == '.') {
                        // .인 경우 ...을 체크하기 위해 더 탐색
                        sentence.append(current);
                        punctuation = !canBeDecimal; // 바로 앞에 숫자있으면 소수니까 구두점 아님
                    } else if (punctuation) {
                        // 구두점이 여러개 찍히는 경우 (.., ... 등) 문장 추가
                        sentences.add(sentence.toString().trim());
                        sentence = new StringBuilder();
                        sentence.append(current);
                        punctuation = false;
                    } else {
                        sentence.append(current);
                        canBeDecimal = isNumber(current);
                    }
                }

            }
            String lastSentence = sentence.toString().trim();
            if (lastSentence.length() > 0) {
                sentences.add(lastSentence);
            }
        }

        return sentences;
    }
}
