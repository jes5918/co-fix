package com.ssafy.devfolio.portfolio.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PortfolioResponse {

    private Long id;
    private String strHtml; // 포트폴리오 내용 html

}
