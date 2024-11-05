import React, { useState, useRef, useContext } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { MyContext } from "../MyContext";

export default function SplitButton({ optionsProps, selectedIndexProps, hideArrow, fromLang }) {
  const options = optionsProps;
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { state, setState, changeLang } = useContext(MyContext);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleMenuItemClick = (event, index) => {
    selectedIndexProps(event, index);
    setSelectedIndex(index)
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const formattedOptions = options.map((option) => {
    return option
      .split("_") // Sépare les mots en fonction des underscores
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Met en majuscule la première lettre de chaque mot
      .join(" "); // Rejoint les mots avec un espace
  });

  return (
    <React.Fragment>
      <ButtonGroup
        variant="text"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
        sx={{
          color: "orange",
        }}
      >
        <Button
          sx={{
            color: "orange",
            border: 0,
            borderColor: "grey.500",
          }}
          onClick={handleClick}
        >
          {fromLang ? (state.lang? state.lang.slice(0,-3) : formattedOptions[selectedIndex].slice(0,-3)) : formattedOptions[selectedIndex]}
        </Button>
        {!hideArrow && <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          sx={{
            color: "orange",
          }}
        >
          <ArrowDropDownIcon />
        </Button>}
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
                background: "dimgrey",
                color: "orange",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {formattedOptions.map((option, index) => (
                    <MenuItem
                      key={option}
                    //   disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {fromLang ? option.slice(0,-3) : option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
