package com.ssafy.devfolio.portfolio;

import com.ssafy.devfolio.portfolio.dto.PortfolioResponse;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Portfolio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "portfolio_id")
    private Long id;

    @Column(name = "portfolio_html", columnDefinition = "TEXT")
    private String strHtml; // 포트폴리오 내용 html

    public static PortfolioResponse toPortfolioDto(Portfolio portfolio) {
        PortfolioResponse portfolioResponse = new PortfolioResponse();
        portfolioResponse.setId(portfolio.getId());
        portfolioResponse.setStrHtml(portfolio.getStrHtml());
        return portfolioResponse;
    }

}
