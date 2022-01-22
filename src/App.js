import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData } from "./api";

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

  const [autocomplete, setAutocomplete] = useState(null);

  function getCoords() {
    return new Promise((resolve, reject) =>
      navigator.permissions
        ? // Permission API is implemented
          navigator.permissions
            .query({
              name: "geolocation",
            })
            .then((permission) =>
              // is geolocation granted?
              permission.state === "granted"
                ? navigator.geolocation.getCurrentPosition((pos) =>
                    resolve(pos.coords)
                  )
                : resolve(null)
            )
        : // Permission API was not implemented
          reject(
            new Error(
              "Location was not on so now the application is searching default location"
            )
          )
    );
  }

  useEffect(() => {
    getCoords()
      .then((coords) =>
        setCoordinates({ lat: coords.latitude, lng: coords.longitude })
      )
      .catch(function (e) {
        setCoordinates({ lat: 59.32932349999999, lng: 18.068580800000007 });
      });
  }, []);

  const CurrentLocationPing = () => {
    if (window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        try {
          let response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${process.env.REACT_APP_OPENCAGEDATA_GEO_CODE_API_KEY}`
          );
          if (response.ok) {
            console.log("BEFORE POSITION");
            console.log(position);
            let data = await response.json();
            console.log(data.results[0].components);
            console.log("========>> Getting location data with OPENCAGEDATA");
          }
        } catch (error) {
          console.log(error);
          console.log("========>> trying to get location data");
        }
      });
    }
  };

  useEffect(() => {
    const filtered = places?.filter((place) => Number(place.rating) > rating);
    setFilteredPlaces(filtered);
  }, [rating]);

  useEffect(() => {
    setIsLoading(true);
    if (bounds?.sw && bounds?.ne) {
      // console.log(bounds);
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        // console.log(data);
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setIsLoading(false);
      });
    }
  }, [bounds, type]);

  // for auto complete to work it should be connected to google api,
  // To connect set index.html file with script link from google api docs
  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinates({ lat, lng });
  };

  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
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
