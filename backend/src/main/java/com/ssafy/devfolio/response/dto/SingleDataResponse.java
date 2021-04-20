package com.ssafy.devfolio.response.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SingleDataResponse<T> extends BaseResponse{
    T data;
}
