package com.ssafy.devfolio.image;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final AwsS3Service awsS3Service;
    private final ImageRepository imageRepository;


    /**
     * 프로필 이미지 생성
     */
    public ImageDto createImage(MultipartFile file) throws IOException {
        // 이미지 정보 생성
        String imgPath = awsS3Service.uploadProfileImage(file);
        Image inputImage = Image.builder()
                .imgPath(awsS3Service.uploadProfileImage(file))
                .imgFullPath("https://" + awsS3Service.CLOUD_FRONT_DOMAIN_NAME + "/" + imgPath)
                .build();

        Image image = imageRepository.save(inputImage);
        return Image.toImageDto(inputImage);
    }
}
