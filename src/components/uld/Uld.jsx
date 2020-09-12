import { Card, CardContent, CardHeader, makeStyles, Typography } from '@material-ui/core';
import uldImage from 'assets/uld.svg';
import Piece from 'components/piece/Piece';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

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

export default function Uld({ uld }) {
  const classes = useStyles();
  const pieces = uld['https://onerecord.iata.org/ULD#upid']['https://onerecord.iata.org/Piece#containedPiece'];
  console.log(uld);
  console.log(pieces);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<img src={uldImage} alt='Box' height={30} />}
        title={`ULD #${uld['https://onerecord.iata.org/ULD#serialNumber']}`}
      />
      <CardContent>
        <PieceList pieces={pieces} />
      </CardContent>
    </Card>
  );
}

const PieceList = ({ pieces }) => {
  return pieces.map((piece) => <AsyncPiece key={piece['@id']} piece={piece} />);
};

const AsyncPiece = ({ piece }) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(piece['@id'])
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setResult(data);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, [piece]);

  // console.log(status, value, error);
  return (
    <>
      {loading && <Skeleton count={1} height='100px' />}
      {result && <Piece piece={result} />}
      {error && <Typography>{error.message}</Typography>}
    </>
    // null
  );
};
