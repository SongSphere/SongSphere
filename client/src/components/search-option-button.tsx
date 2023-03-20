import styled from "styled-components";

const Button = styled.button`
  background-color: white;
  color: black;
  cursor: pointer;
  border-style: solid;
  box-shadow: 0px 2px 2px lightgray;
  inline: block;
  width: 70px;
  &:hover {
    color: grey;
  }

  &:focus {
    color: ;
  }
`;

const SearchOption = (props: { caption: string; onClick: any }) => {
  return (
    <Button className="border-2 border-solid border-lblue focus:bg-navy focus:text-lgrey">
      {props.caption}
    </Button>
  );
};
export default SearchOption;
