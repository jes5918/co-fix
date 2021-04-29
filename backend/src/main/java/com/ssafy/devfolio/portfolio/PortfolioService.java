package com.ssafy.devfolio.portfolio;

import com.ssafy.devfolio.portfolio.dto.PortfolioRequest;
import com.ssafy.devfolio.portfolio.dto.PortfolioResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;

    public PortfolioResponse createPortfolio(PortfolioRequest request) {

        Portfolio portfolio = Portfolio.builder()
                .strHtml(request.getStrHtml())
                .build();

        portfolioRepository.save(portfolio);

        return Portfolio.toPortfolioDto(portfolio);

    }
}
