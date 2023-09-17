import React from "react";
import stylesheet from "../../styles/header.module.css";
import { MenuItem, Menu } from "@mui/material";
import { styled } from "styled-components";
import Link from "next/link";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: 1,
    minWidth: 180,
    color:
      theme?.palette?.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme?.palette?.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
      // width:'80px',
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme?.palette?.text?.secondary,
        marginRight: "1.5rem",
      },
      "&:active": {
        //  backgroundColor:'red'
      },
    },
  },
}));
function CustomMenuItem({ title, options, setOpen }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <div>
      <div className={stylesheet.menu_item} onClick={handleOpenUserMenu}>
        {title}
      </div>
      {options.length ? (
        <StyledMenu
          sx={{ mt: "45px", marginLeft: "3.3rem", padding: "2rem" }}
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {options.map((setting, i) => {
            return( <Link
              style={{ color: "black" }}
              key={i}
              href={`/cefr/${setting.slug}`}
              // to={`/${setting.slug}`}
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              <MenuItem
                key={setting.title}
                onClick={() => {
                  // handleNavigate();
                }}
              >
                {setting.title}
              </MenuItem>
            </Link>)
          })}
        </StyledMenu>
      ) : (
        ""
      )}
    </div>
  );
}

export default CustomMenuItem;
