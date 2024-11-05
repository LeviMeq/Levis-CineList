import React from "react";
import { styled, Grid, Box } from "@mui/material";
import Try from "./Try";

const RootBox = styled(Box)(({ theme }) => ({
  // padding: 0,
  // margin: 0,
}));

const ScrollContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflowX: 'auto',
  padding: theme.spacing(1),
}));

export default function Cards(props) {
  return (
    // <RootBox>
      <ScrollContainer>
        <Grid container spacing={2} wrap="nowrap">
          {props.datas.map((movie, index) => (
            <Grid item key={index} xs={5} sm={3} md={1.5} style={{ minWidth: 150 }} >
              <Try movie={movie}/>
            </Grid>
          ))}
        </Grid>
      </ScrollContainer>
    // </RootBox>
  );
}