import styled from "styled-components";
import { TextField } from "@mui/material";
export const WhiteBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: blue;
  }
  & .MuiOutlinedInput-root {
    fieldset {
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
    &:hover fieldset {
      border: 2px solid rgb(0, 132, 199);
    }
    &.Mui-focused fieldset {
      border: 2px solid rgb(0, 132, 199);
    }
  }
`;
