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

export default function Piece({ piece }) {
  const classes = useStyles();

  console.log(piece);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<img src={box} alt='Box' height={30} />}
        title={`Piece #${piece['https://onerecord.iata.org/Piece#upid']}`}
      />
      <CardContent>
        <Description
          label={'Weight'}
          value={`${piece['https://onerecord.iata.org/Piece#grossWeight']['https://onerecord.iata.org/Value#value']}${piece['https://onerecord.iata.org/Piece#grossWeight']['https://onerecord.iata.org/Value#unit']}`}
        />
        <Description
          label={'Height'}
          value={`${piece['https://onerecord.iata.org/Piece#dimensions']['https://onerecord.iata.org/Dimensions#height']['https://onerecord.iata.org/Value#value']}${piece['https://onerecord.iata.org/Piece#dimensions']['https://onerecord.iata.org/Dimensions#height']['https://onerecord.iata.org/Value#unit']}`}
        />
        <Description
          label={'Length'}
          value={`${piece['https://onerecord.iata.org/Piece#dimensions']['https://onerecord.iata.org/Dimensions#length']['https://onerecord.iata.org/Value#value']}${piece['https://onerecord.iata.org/Piece#dimensions']['https://onerecord.iata.org/Dimensions#length']['https://onerecord.iata.org/Value#unit']}`}
        />
        <Description
          label={'Volume'}
          value={`${piece['https://onerecord.iata.org/Piece#dimensions']['https://onerecord.iata.org/Dimensions#volume']['https://onerecord.iata.org/Value#value']}${piece['https://onerecord.iata.org/Piece#dimensions']['https://onerecord.iata.org/Dimensions#volume']['https://onerecord.iata.org/Value#unit']}`}
        />
        <Description
          label={'Width'}
          value={`${piece['https://onerecord.iata.org/Piece#dimensions']['https://onerecord.iata.org/Dimensions#width']['https://onerecord.iata.org/Value#value']}${piece['https://onerecord.iata.org/Piece#dimensions']['https://onerecord.iata.org/Dimensions#width']['https://onerecord.iata.org/Value#unit']}`}
        />
      </CardContent>
    </Card>
  );
}

const Description = ({ label, value }) => {
  return (
    <>
      <Typography variant='body2'>
        {label}:&nbsp;{value}
      </Typography>
    </>
  );
};
