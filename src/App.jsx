import Table from "./components/Table";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://raw.githubusercontent.com/topac/assignment/master/books.5000.json"
    )
      .then(response => response.json())
      .then(data => {
        setData(data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <>
      <h1 className="text-2xl font-bold">Loading...</h1>
      <p>Name: Andrea Lo Cicero</p>
      <p>Start: 12:47 - End: 14:03</p>
    </>
  ) : isError ? (
    <>
      <h1 className="text-2xl font-bold">Error</h1>
      <p>Something went wrong</p>
      <p>Please reload the page</p>
    </>
  ) : (
    <Table data={data}></Table>
  );
}

export default App;
