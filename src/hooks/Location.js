import { useQuery } from "@apollo/client";
import LOCATIONS_QUERY from "../graphql/locations.query";

export const useLocations = () => useQuery(LOCATIONS_QUERY);
