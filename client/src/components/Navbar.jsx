

import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import { setLogout } from "state/index";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(
      setLogout()
    );
    navigate("/login");
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <AppBar
        position="static">
        <Toolbar sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" onClick={()=> navigate("/")} sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          <Typography variant="h6" component="div" onClick={()=> navigate("/createRecipe")} sx={{ flexGrow: 1 }}>
            Add a Recipe
          </Typography>
          <Typography variant="h6" component="div" onClick={logout} sx={{ flexGrow: 1 }}>
            Logout
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
