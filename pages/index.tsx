/* eslint-disable react-hooks/exhaustive-deps */
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useContext, useState } from "react";
import Banner from "../components/banner";
import useTrackLocation from "../hooks/use-track-location";
import {
  ACTION_TYPES,
  CoffeeStore,
  StoreContext,
} from "../store/store-context";
import styles from "../styles/Home.module.css";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import Card from "../components/cart";
import React from "react";

type HomeProps = {
  coffeeStores: CoffeeStore[];
};

const Home: NextPage<HomeProps> = (props) => {
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  // const [coffeeStores, setCoffeeStores] = useState("");

  const [coffeeStoresError, setCoffeeStoresError] = useState(null);

  const { dispatch, state } = useContext(StoreContext);

  const { coffeeStores, latLong } = state;

  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  };
  React.useEffect(() => {
    const getLatLong = async () => {
      if (latLong) {
        try {
          const response = await fetch(
            `/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=30`
          );

          const coffeeStores = await response.json();

          // setCoffeeStores(fetchedCoffeeStores);
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {
              coffeeStores,
            },
          });
          setCoffeeStoresError(null);
          //set coffee stores
        } catch (e: any) {
          //set error
          setCoffeeStoresError(e.message);
        }
      }
    };
    getLatLong();
  }, [latLong]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="description"
          content="allows you to discover coffee stores"
        ></meta>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Coffee Connoisseour</h1>
        <Banner
          buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
          handleOnClick={handleOnBannerBtnClick}
        />

        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        {coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}
        <Image
          src="/static/hero-image.png"
          width={700}
          height={400}
          alt="hero image"
        />
        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Stores near me</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                    href={`/coffee-store/${coffeeStore.id}`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {props.coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Toronto stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                    href={`/coffee-store/${coffeeStore.id}`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const coffeeStores = await fetchCoffeeStores();
  return {
    props: { coffeeStores },
  };
};
