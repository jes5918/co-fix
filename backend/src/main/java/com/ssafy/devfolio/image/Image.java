package com.ssafy.devfolio.image;

import com.ssafy.devfolio.entity.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Image extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long id;

    @Column(name = "image_path")
    private String imgPath;

    @Column(name = "img_full_path")
    private String imgFullPath;

    public static ImageDto toImageDto(Image image) {
        ImageDto imageDto = new ImageDto();
        imageDto.setId(image.getId());
        imageDto.setImgPath(image.getImgPath());
        imageDto.setImgFullPath(image.getImgFullPath());
        return imageDto;
    }

}
