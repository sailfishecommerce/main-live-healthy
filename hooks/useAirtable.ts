import axios from "axios";
import { useEffect } from "react";

export default function useAirtable() {
  useEffect(() => {
    axios
      .get("/api/from-airtable-to-swell")
      .then((response) => console.log("response airtable", response))
      .catch((error) => console.error("error", error));
  }, []);
}
