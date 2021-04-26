import InputForm from 'components/common/InputForm';
import React from 'react';

interface Props {}

function TemplateSearch(props: Props) {
  const {} = props;
  const SearchRefSubmitHandler = (keyword: string) => {
    console.log('SearchRefSubmitHandler = ', keyword);
  };
  return (
    <InputForm width={600} height={50} onSubmit={SearchRefSubmitHandler} />
  );
}

export default TemplateSearch;
