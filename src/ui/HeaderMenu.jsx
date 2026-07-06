import React from "react";
import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "./ButtonIcon";
const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

const HeaderMenu = () => {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <FaUser />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
