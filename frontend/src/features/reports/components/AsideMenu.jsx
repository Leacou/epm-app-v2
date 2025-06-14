import React from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const menuItems = [
  { key: 'last30', label: 'Últimos 30 días' },
  { key: 'lastPosts', label: 'Últimas publicaciones' },
  { key: 'custom', label: 'Solicita tu reporte' }
];

export default function AsideMenu({ selected, onSelect }) {
  return (
    <aside>
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