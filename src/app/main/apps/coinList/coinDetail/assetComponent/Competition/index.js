import { Card, Typography } from '@mui/material';
import React from 'react';
import CompetitionItem from './CompetitionItem';

const Competition = () => {
  return (
    <Card className="w-full rounded-20 shadow-1 p-20">
      <div className="pb-24">
        <Typography className="h3 font-medium">Bitcoin Competitors</Typography>
        <CompetitionItem />
      </div>
    </Card>
  );
};

export default Competition;
