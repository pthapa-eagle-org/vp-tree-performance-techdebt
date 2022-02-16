import { makeStyles } from "@material-ui/core/styles";
/* .App {
  text-align: center;
  background-color: black;
}
.Arrow {
  position: "absolute";
  top: 0;
  bottom: 0;
  left: 0;
  margin: "auto";
  padding: "8px 2px";
  cursor: "pointer"
}
.Item {
  display: "flex";
  align-items: "center";
  padding: "0 5px 0 30px"
} */
export const useStyles = makeStyles({
  arrow: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    margin: "auto",
    padding: "8px 2px",
    cursor: "pointer"
  },
  item: {
    display: "flex",
    alignItems: "center",
    padding: "0 5px 0 30px"
  }
});