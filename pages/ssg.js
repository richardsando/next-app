import axios from "axios";
import { useState, useEffect } from "react";

const url = "https://pokeapi.co/api/v2/pokemon?limit=151";
const headers = {
  "Cache-Control": "no-cache",
};

const StaticSide = (props) => {
  return props.pokemon.map((p) => {
    return (
      <div key={p.name}>
        <img src={p.imgUrl} alt="" />
        <p>{p.name}</p>
        <hr />
      </div>
    );
  });
  return <p>yo</p>;
};

export const getStaticProps = async () => {
  const response = await axios.get(url, { headers });
  const promises = response.data.results.map((result) => {
    return axios.get(result.url, { headers });
  });
  const responses = await Promise.all(promises);
  const pokeData = responses.map((r) => {
    return {
      name: r.data.name,
      imgUrl: r.data.sprites.front_default,
    };
  });
  return {
    props: {
      pokemon: pokeData,
    },
  };
};

export default StaticSide;
