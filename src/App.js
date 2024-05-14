import CustomChart from "./CustomChart";
import data from "./example_response.json"

function App() {
  return (
    <div className="App">
      
      <CustomChart data={data} />
    </div>
  );
}

export default App;
