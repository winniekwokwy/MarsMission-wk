import React from 'react'
import styled from 'styled-components';
import RoverInfo from '../RoverInfo/RoverInfo';
import { useState } from 'react';
import RoverImage from '../RoverImage/RoverImage';
import './Home.scss';
import '../../App.css';

type ROVERS = "curiosity" | "opportunity" | "spirit";

const ROVERS = {
  CURIOSITY: "curiosity",
  OPPORTUNITY: "opportunity",
  SPIRIT: "spirit",
} as const;

export { ROVERS };

type CAMERAS = "Front Hazard Avoidance Camera" | "Rear Hazard Avoidance Camera" | "Mast Camera" | "Chemistry and Camera Complex" | "Mars Hand Lens Imager" | "Mars Descent Imager" | "Navigation Camera" | "all";

const CAMERAS = {
  FHAZ: "FHAZ", //Front Hazard Avoidance Camera
  RHAZ: "RHAZ", //Rear Hazard Avoidance Camera
  MAST: "MAST", //Mast Camera
  CHEMCAM: "CHEMCAM", //Chemistry and Camera Complex
  MAHLI: "MAHLI", //Mars Hand Lens Imager
  MARDI: "MARDI", //Mars Descent Imager
  NAVCAM: "NAVCAM", //Navigation Camera
  ALL: "all"
} as const;

export { CAMERAS };

export const API_KEY=import.meta.env.VITE_API_KEY;

export async function APIRequest<T>(api: string): Promise<T | null> {
  try {
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: T = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return null;
  }
}

const Home: React.FunctionComponent = () => {
    const [camera, setCamera] = useState(CAMERAS.ALL);
    return (
        <>
        <p id="Title">Mars Mission</p>
        <RoverImage rover={ROVERS.CURIOSITY} camera={camera}/>
        <RoverInfo rover={ROVERS.CURIOSITY}/>
        </>
    )
}

export default Home
