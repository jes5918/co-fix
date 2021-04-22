package com.ssafy.devfolio.image;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.devfolio.image.config.AwsConfig;
import com.ssafy.devfolio.image.config.AwsS3Property;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AwsS3Service {

    private final AwsConfig awsConfig;
    private final AwsS3Property awsS3Property;
    private AmazonS3 amazonS3;

    public static final String CLOUD_FRONT_DOMAIN_NAME = "dwn3lgqqms2ns.cloudfront.net";

    @Transactional
    public String uploadProfileImage(MultipartFile image) throws IOException {
        amazonS3 = awsConfig.setS3Client();
        String imgName = image.getOriginalFilename();

        amazonS3.putObject(new PutObjectRequest(awsS3Property.getBucket(), imgName, image.getInputStream(), null)
                .withCannedAcl(CannedAccessControlList.PublicRead));

        return imgName;
    }

    @Transactional
    public List<String> uploadImages(List<MultipartFile> images) throws IOException {
        amazonS3 = awsConfig.setS3Client();
        List<String> fileNames = new ArrayList<>();
        String imgName = "imgName";

        for (MultipartFile file : images) {
            imgName = file.getOriginalFilename();
            fileNames.add(new String(imgName));

            amazonS3.putObject(new PutObjectRequest(awsS3Property.getBucket(), imgName, file.getInputStream(), null)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        }

        return fileNames;
    }

}
