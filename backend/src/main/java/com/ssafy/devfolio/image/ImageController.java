package com.ssafy.devfolio.image;

import com.ssafy.devfolio.response.ResponseService;
import com.ssafy.devfolio.response.dto.SingleDataResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;
    private final ResponseService responseService;

    @ApiOperation(value = "이미지 생성", notes = "이미지 생성 통신 시 S3, Cloud Front 처리 후 db에 들어가는 지 확인용")
    @PostMapping("/image")
    public ResponseEntity createImage(@ApiParam(value = "Image File", required = true)
                                          @RequestPart MultipartFile image) throws IOException {

        ImageDto data = imageService.createImage(image);

        SingleDataResponse<ImageDto> response = responseService.getSingleDataResponse(data, HttpStatus.OK);

        return ResponseEntity.status(response.getStatus()).body(response);
    }

}
