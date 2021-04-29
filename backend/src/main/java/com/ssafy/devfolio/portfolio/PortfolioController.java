package com.ssafy.devfolio.portfolio;

import com.ssafy.devfolio.portfolio.dto.PortfolioRequest;
import com.ssafy.devfolio.portfolio.dto.PortfolioResponse;
import com.ssafy.devfolio.response.ResponseService;
import com.ssafy.devfolio.response.dto.SingleDataResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/portfolio")
@Api(value = "포트폴리오 api")
public class PortfolioController {

    private final PortfolioService portfolioService;
    private final ResponseService responseService;

    @ApiOperation(value = "포트폴리오 작성", notes = "포트폴리오 html을 문자열로 요청")
    @PostMapping
    public ResponseEntity createPortfolio(@ApiParam(value = "Html String", required = true)
                                              @RequestBody PortfolioRequest request) {

        PortfolioResponse data = portfolioService.createPortfolio(request);

        SingleDataResponse<PortfolioResponse> response = responseService.getSingleDataResponse(data, HttpStatus.CREATED);

        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
