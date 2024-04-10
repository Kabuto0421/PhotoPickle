import ScoreAndPersonIcon from '@/libs/components/ScoreAndPerson';
import ThreeButtons from '@/libs/components/ThreeButtons';
import MapProvider from "@/providers/map-provider";
import MapComponent from "@/libs/components/Map";

export default function MapShow() {

    return (
        <MapProvider>
            <MapComponent />
        </MapProvider>
    );
}