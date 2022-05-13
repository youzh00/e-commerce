import React from "react";
import { SpinnerDotted } from "spinners-react";
import style from "../Styles/Spinner.module.css";

const Spinner = () => {
  return (
    <>
      <div className={style.Spinner}>
        <SpinnerDotted
          size={90}
          thickness={180}
          speed={104}
          color="rgba(57, 150, 172, 1)"
        />
      </div>
    </>
  );
};
export default Spinner;
