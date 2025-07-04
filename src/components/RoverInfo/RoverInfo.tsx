import { useEffect, useState } from 'react';
import { ROVERS,  API_KEY, APIRequest } from '../Routes/Home';
import { Table, TD, TR, TH } from '../Styles/Table';
import './RoverInfo.scss';

interface RoverManifestResponse {
    photo_manifest: {
        name: string
        landing_date: string
        launch_date: string
        status: string
        max_date: string
    };
  }

interface RoverManifest {
    name: string
    landing_date: string
    launch_date: string
    status: string
    max_date: string
}

interface RoverInfoProps {
    rover: ROVERS;
  }

function RoverInfo(props: RoverInfoProps) {
    const api = `https://api.nasa.gov/mars-photos/api/v1/manifests/${props.rover}?api_key=${API_KEY}`;

    const [roverManifest, setRoverManifest] = useState <RoverManifest | null> (null);

    useEffect(() => {
        const fetchData = async() => {
            const result = await APIRequest<RoverManifestResponse>(api);
            if (result != null) {
                const data: RoverManifestResponse = result;
                if (data.photo_manifest != null) {
                    setRoverManifest({
                        name: data.photo_manifest.name,
                        landing_date: data.photo_manifest.landing_date,
                        launch_date: data.photo_manifest.launch_date,
                        status: data.photo_manifest.status,
                        max_date: data.photo_manifest.max_date
                    });
                } else {
                    console.log("No data is available");
                }
            }
            else {
                console.log("API request is failed.");
            }
        }
        fetchData();
    }, []);

    if (roverManifest==null) {
        return <div className="Error">Photos are unavailable.</div>;
    }

    return (
        <div className="RoverInfo">
            <p className='RoverName'>{roverManifest.name}</p>
            <Table>
                <tbody>
                    <TR key="status">
                        <TH className="Heading">Status :</TH>
                        <TD className="Info">{roverManifest.status}</TD>
                    </TR>
                    <TR key="LaunchDate">
                        <TH className="Heading">Launch Date :</TH>
                        <TD className="Info">{roverManifest.launch_date}</TD>   
                    </TR>
                    <TR key="LandingDate">
                        <TH className="Heading">Landing Date :</TH>
                        <TD className="Info">{roverManifest.landing_date}</TD>
                    </TR>
                </tbody>
            </Table>
        </div>
    );
};

export default RoverInfo;