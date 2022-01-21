import React from "react";
import styles from "./banner.module.css";

type BannerProps = {
  handleOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonText: string;
};

const Banner: React.FC<BannerProps> = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}>Connoisseur</span>
      </h1>
      <p className={styles.subTitle}>Discover your local coffee shops!</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={props.handleOnClick}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;
