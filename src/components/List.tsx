import {useEffect, useState} from "react";
import { Building } from "./Form";
import axios from "axios";

function List() {

    const [buildings, setBuildings] = useState<Building[]>([]);
    const [selectedBuilding, setSelectedBuilding] = useState (null)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setErrors] = useState<string>("");

    useEffect(() => {
      setIsLoading(true);
      document.title = "Kris Wilson's Final";
      listBuildings();
  }, []);

    const listBuildings = () => 
    {
      axios.get<Building[]>('http://localhost:5109/Buildings').then((response) => {
          setBuildings(response.data);
          setIsLoading(false);
      })
      .catch((error => {
          console.log(error);
          setErrors(error.message);
          setIsLoading(false);
      }));
    }


    const handleDeleteClick = (building: Building) => 
    {
      const originalBuildings = [...buildings];
      setBuildings(buildings.filter((b) => b.id !== building.id));
      axios.delete(`http://localhost:5109/Buildings/${building.id}`)
        .catch((error => {
          console.log(error);
          setErrors(error.message);
          setBuildings(originalBuildings);
        }));
    }

    const handleUpdateClick = (building: Building) =>
    {
      const originalBuildings = [...buildings];
      const updatedBuilding = {...building, name: building.name + " Updated by Kris"};
      setBuildings(buildings.map((b) => b.id === building.id ? updatedBuilding : b));
      axios.put(`http://localhost:5109/Buildings/${updatedBuilding.id}?name=${updatedBuilding.name}`)
      .then((response) => {
        listBuildings();
      })
        .catch((error => {
          console.log(error);
          setErrors(error.message);
          setBuildings(originalBuildings);
        }));
    }

  return (
    <>
    <h3>OCU Buildings</h3>
    <ul>
      {buildings.map((building) => (<li key = {building.id}>{building.id} - {building.name}
        <div>
          <button className='btn btn-outline-primary' onClick = {() => {handleUpdateClick(building)} }>Update</button>
          <button className='btn btn-outline-danger' onClick = {() => {handleDeleteClick(building)} }>Delete</button>
        </div>
      </li>) )}
    </ul>
    </>
  );
}

export default List;