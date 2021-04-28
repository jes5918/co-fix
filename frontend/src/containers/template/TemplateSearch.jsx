import InputForm from "../../components/common/InputForm";
import React from "react";

function TemplateSearch() {
  const SearchRefSubmitHandler = (keyword) => {
    console.log("SearchRefSubmitHandler = ", keyword);
  };
  return (
    <InputForm width={600} height={50} onSubmit={SearchRefSubmitHandler} />
  );
}

export default TemplateSearch;
