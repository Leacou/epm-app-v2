import React from 'react';
import {
  List, ListItem, ListItemButton, ListItemText, Avatar,
  Box, Typography, Divider, useTheme, Chip
} from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import MovieIcon from '@mui/icons-material/Movie';
import AssignmentIcon from '@mui/icons-material/Assignment';

const menuItems = [
  { key: 'last30', label: 'Últimos 30 días', icon: <TimelineIcon sx={{ color: "#083963" }} /> },
  { key: 'lastPosts', label: 'Últimas publicaciones', icon: <MovieIcon sx={{ color: "#EB8957" }} /> },
  { key: 'Solicitareportes', label: 'Solicita tu reporte', icon: <AssignmentIcon sx={{ color: "#5DA9DD" }} /> }
];

export default function AsideMenu({ selected, onSelect }) {
  let igProfile;
  try {
    igProfile = JSON.parse(localStorage.getItem('epm_instagram_profile'));
  } catch {
    igProfile = null;
  }
  const username = igProfile?.username || "Sin cuenta seleccionada";
  const profilePicture = igProfile?.profile_picture_url || "";

  return (
    <aside>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
          bgcolor: "#fff",
          boxShadow: "0 4px 24px 0 #08396313",
          borderRadius: 4,
          mx: 2,
          mt: 4,
        }}
      >
        <Avatar
          src={profilePicture}
          alt={username}
          sx={{
            width: 80,
            height: 80,
            bgcolor: "#EBE4DD",
            fontWeight: 700,
            fontSize: 36,
            mb: 2,
            boxShadow: "0 2px 10px 0 #08396318"
          }}
        >
          {!profilePicture && username ? username[0].toUpperCase() : ""}
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 700, textAlign: 'center', color: "#083963" }}>
          {username}
        </Typography>
        <Chip
          label="Instagram"
          sx={{
            bgcolor: "#5DA9DD",
            color: "#fff",
            mt: 1,
            fontWeight: 500,
            fontSize: 13,
            px: 1
          }}
          size="small"
        />
      </Box>
      <Divider sx={{ my: 3, mx: 2 }} />
      <List sx={{ px: 2 }}>
        {menuItems.map(item => (
          <ListItem key={item.key} disablePadding>
            <ListItemButton
              selected={selected === item.key}
              onClick={() => onSelect(item.key)}
              sx={{
                my: 0.5,
                borderRadius: 2,
                bgcolor: selected === item.key ? "#EBE4DD" : "transparent",
                transition: "background 0.15s",
                "&:hover": { bgcolor: "#f3f0ee" }
              }}
            >
              {item.icon}
              <ListItemText
                primary={item.label}
                sx={{
                  ml: 1,
                  '& .MuiListItemText-primary': {
                    fontWeight: selected === item.key ? 700 : 500,
                    color: selected === item.key ? "#083963" : "#333"
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </aside>
  );
}