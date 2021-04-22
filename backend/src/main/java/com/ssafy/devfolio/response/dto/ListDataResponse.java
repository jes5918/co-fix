package com.ssafy.devfolio.response.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListDataResponse<T> extends BaseResponse{
    List<T> data;
}
