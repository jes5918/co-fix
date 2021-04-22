package com.ssafy.devfolio.image;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ImageDto {

    private Long id;
    private String imgPath;
    private String imgFullPath;

}
