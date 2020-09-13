import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
} from "@material-ui/core";
import box from "assets/box.svg";
import React from "react";
import LoInfoButton from "components/commons/LoInfoButton/LoInfoButton";

const useStyles = makeStyles({
  root: {
    height: "100%",
    width: "100%",
    "margin-bottom": "15px",
    "box-shadow":
      "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  header: {
    padding: "15px",
    "font-weight": 600,
    "font-size": "18px",
    "border-bottom": "solid 1px lightgrey",
  },
});

export default function Piece({ piece }) {
  const classes = useStyles();

  // console.log(piece);

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={<img src={box} alt="Box" height={30} />}
        title={
          <strong style={{ fontSize: "18px" }}>
            {`Piece #${piece["https://onerecord.iata.org/Piece#upid"]}`}
            <LoInfoButton loUri={piece["@id"]} loType={"Piece"}></LoInfoButton>
          </strong>
        }
      />
      <CardContent>
        <table>
          <tr>
            <td>
              <strong>{"Weight"}:</strong>
            </td>
            <td>{`${piece["https://onerecord.iata.org/Piece#grossWeight"]["https://onerecord.iata.org/Value#value"]}${piece["https://onerecord.iata.org/Piece#grossWeight"]["https://onerecord.iata.org/Value#unit"]}`}</td>
            <td>
              <strong>{"Height"}:</strong>
            </td>
            <td>{`${piece["https://onerecord.iata.org/Piece#dimensions"]["https://onerecord.iata.org/Dimensions#height"]["https://onerecord.iata.org/Value#value"]}${piece["https://onerecord.iata.org/Piece#dimensions"]["https://onerecord.iata.org/Dimensions#height"]["https://onerecord.iata.org/Value#unit"]}`}</td>
          </tr>
          <tr>
            <td>
              <strong>{"Length"}:</strong>
            </td>
            <td>{`${piece["https://onerecord.iata.org/Piece#dimensions"]["https://onerecord.iata.org/Dimensions#length"]["https://onerecord.iata.org/Value#value"]}${piece["https://onerecord.iata.org/Piece#dimensions"]["https://onerecord.iata.org/Dimensions#length"]["https://onerecord.iata.org/Value#unit"]}`}</td>
            <td>
              <strong>{"Volume"}:</strong>
            </td>
            <td>{`${piece["https://onerecord.iata.org/Piece#dimensions"]["https://onerecord.iata.org/Dimensions#volume"]["https://onerecord.iata.org/Value#value"]}${piece["https://onerecord.iata.org/Piece#dimensions"]["https://onerecord.iata.org/Dimensions#volume"]["https://onerecord.iata.org/Value#unit"]}`}</td>
          </tr>
          <tr>
            <td>
              <strong>{"Width"}:</strong>
            </td>
            <td>{`${piece["https://onerecord.iata.org/Piece#dimensions"]["https://onerecord.iata.org/Dimensions#width"]["https://onerecord.iata.org/Value#value"]}${piece["https://onerecord.iata.org/Piece#dimensions"]["https://onerecord.iata.org/Dimensions#width"]["https://onerecord.iata.org/Value#unit"]}`}</td>
            <td>
              <strong>{"SLAC"}:</strong>
            </td>
            <td>{`${piece["https://onerecord.iata.org/Piece#slac"]}`}</td>
          </tr>
        </table>
      </CardContent>
    </Card>
  );
}

const Description = ({ label, value }) => {
  return (
    <>
      <Typography variant="body2">
        <strong>{label}:</strong>&nbsp;{value}
      </Typography>
    </>
  );
};
