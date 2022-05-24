import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

const CompetitionItem = () => {
  const theme = useTheme();
  return (
    <div
      style={{
        background: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
      }}
      className="flex justify-center align-middle p-6 rounded-6"
    >
      <Typography className="h3 font-semibold">Ethereum</Typography>
    </div>
  );
};

export default CompetitionItem;
