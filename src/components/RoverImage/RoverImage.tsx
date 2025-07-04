import { useEffect, useState } from 'react';
import { ROVERS, CAMERAS, API_KEY, APIRequest } from '../Routes/Home';
import Carousel from '../Carousel/Carousel';
import './RoverImage.scss';

interface RoverPhotosResponse {
    photos: {
      id: number;
      img_src: string;
      earth_date: string;
      camera: {
        name: string;
      };
      rover: {
        name: string;
      };
    }[];
  }

export interface Photos {
    id: number
    img_src: string
    earth_date: string
    camera: string
    rover: string
}

interface RoverImageProps {
    rover: ROVERS;
    camera: CAMERAS;
  }

function RoverImage(props: RoverImageProps) {
    let api = "";
    if (props.camera===CAMERAS.ALL){
        api=`https://api.nasa.gov/mars-photos/api/v1/rovers/${props.rover}/photos?sol=1000&api_key=${API_KEY}`;
    } else{
        api=`https://api.nasa.gov/mars-photos/api/v1/rovers/${props.rover}/photos?sol=1000&camera=${props.camera}&api_key=${API_KEY}`
    }
    const [photos, setPhotos] = useState<Photos[]>([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            const data = await APIRequest<RoverPhotosResponse>(api);
            if (data && data.photos) {
                const fetchedPhotos: Photos[] = data.photos.map((photo: any) => ({
                    id: photo.id,
                    img_src: photo.img_src,
                    earth_date: photo.earth_date,
                    camera: photo.camera.name,
                    rover: photo.rover.name
                }));
                setPhotos(fetchedPhotos);
            } else {
                console.error("No photos found or API returned an error.");
            }
        };
    
        fetchPhotos();
    }, []); // Use props.rover and props.camera as dependencies

    if (photos===null || photos.length===0) {
        return <div>Photos are unavailable.</div>;
    }
   
    return (
        <div className="Image">
            <Carousel photos={photos} />
        </div>
    );
};

export default RoverImage;