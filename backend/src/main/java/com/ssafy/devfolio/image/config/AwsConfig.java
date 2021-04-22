package com.ssafy.devfolio.image.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

@Configuration
@EnableConfigurationProperties(value = {AwsS3Property.class})
@RequiredArgsConstructor
public class AwsConfig {

    private final AwsS3Property awsS3Property;

    @PostConstruct
    public AmazonS3 setS3Client() {
        AWSCredentials credentials = new BasicAWSCredentials(awsS3Property.getAccessKey(), awsS3Property.getSecretKey());

        return AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(awsS3Property.getRegion())
                .build();
    }

}
