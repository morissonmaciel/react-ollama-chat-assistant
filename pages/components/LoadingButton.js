import React, { useState } from "react";
import { PaperAirplaneIcon, StopIcon } from "@heroicons/react/24/solid";
import styled from "styled-components";

const Button = styled.button`
  appearance: none;
  background-color: transparent;
  border: 0;
  color: rgb(255, 255, 255);
`;

const LoadingButton = ({ loading }) => {
  return (
    <Button type="submit">
      {loading ? (
        <StopIcon width={24} height={24} />
      ) : (
        <PaperAirplaneIcon width={24} height={24} />
      )}
    </Button>
  );
};

export default LoadingButton;
