import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, Avatar, Box, Typography, Divider } from '@mui/material';

const menuItems = [
  { key: 'last30', label: 'Últimos 30 días' },
  { key: 'lastPosts', label: 'Últimas publicaciones' },
  { key: 'custom', label: 'Solicita tu reporte' }
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
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 3, pb: 2 }}>
        <Avatar
          src={profilePicture}
          alt={username}
          sx={{ width: 60, height: 60, bgcolor: "#F5F6FA", fontWeight: 700, fontSize: 28, mb: 1 }}
        >
          {!profilePicture && username ? username[0].toUpperCase() : ""}
        </Avatar>
        <Typography variant="subtitle1" sx={{ fontWeight: 500, textAlign: 'center' }}>
          {username}
        </Typography>
      </Box>
      <Divider sx={{ mb: 1 }} />
      <List>
        {menuItems.map(item => (
          <ListItem key={item.key} disablePadding>
            <ListItemButton
              selected={selected === item.key}
              onClick={() => onSelect(item.key)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </aside>
  );
}