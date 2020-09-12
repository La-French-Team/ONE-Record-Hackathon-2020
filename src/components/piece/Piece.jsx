import { Button, Card, CardActions, CardContent, CardHeader, makeStyles, Typography } from '@material-ui/core';
import box from 'assets/box.svg';
import React from 'react';

const useStyles = makeStyles({
  root: { height: '100%', width: '100%' },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
});

export default function Piece() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader avatar={<img src={box} alt='Box' height={30} />} title='Piece #pieceNumber' />
      <CardContent>
        <Typography variant='body2' component='p'>
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  );
}
