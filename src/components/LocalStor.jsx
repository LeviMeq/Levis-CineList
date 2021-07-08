import React from "react";
import Try from "./Try";
import { Button, Box } from "@material-ui/core";

export default function LocalStor() {

  // let storeMovie = localStorage.map((movie, index) => {

  // })

  return (
    <Box>
      <Box>
        {Object.values(localStorage).map((film, index) => {
          //   console.log("fls " + (film) );

          let mov = JSON.parse(film);
          console.log("mov" + mov, index);

          return (
            <Box className="localstor">
              <Box>
                <Try
                  movie={mov}
                  btn={
                    <Button
                      size="small"
                      color="primary"
                      onClick={() =>
                        localStorage.removeItem(localStorage.key(mov))
                      }
                    >
                      remove
                    </Button>
                  }
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
