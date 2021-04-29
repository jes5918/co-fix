import InputForm from '../../components/common/InputForm';
import React from 'react';

function TemplateSearch({ width, height }) {
  const SearchRefSubmitHandler = (keyword) => {
    console.log('SearchRefSubmitHandler = ', keyword);
  };
  return (
    <InputForm
      width={width}
      height={height}
      onSubmit={SearchRefSubmitHandler}
    />
  );
}

export default TemplateSearch;
