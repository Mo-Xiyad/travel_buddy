import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData } from "./api";
// import PlaceDetails from "./components/PlaceDetails/PlaceDetails";

const App = () => {
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  // All the state from below should be added to redux later
  const [places, setPlaces] = useState();
  const [ItemClicked, setItemClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState();
  const [type, setType] = useState("restaurants");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filtered = places?.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating]);

  useEffect(() => {
    setIsLoading(true);
    if (bounds) {
      console.log(coordinates);
      // getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
      //   console.log(data);
      //   setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
      //   setFilteredPlaces([]);
      //   setIsLoading(false);
      // });
    }
  }, [bounds, type]);
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces?.length ? filteredPlaces : places}
            ItemClicked={ItemClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            places={filteredPlaces?.length ? filteredPlaces : places}
            setBounds={setBounds}
            setItemClicked={setItemClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
