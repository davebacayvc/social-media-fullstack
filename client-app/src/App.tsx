import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

interface IActivities {
  id: string,
  title: string,
  date: Date,
  description: string,
  category: string,
  city: string,
  venue: string
}
function App() {

  const [acitivities, setActivities] = useState<IActivities[]>([])

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities/").then((res) => setActivities(res.data)).catch((err) => console.log(err))
    console.log(acitivities)
  }, [])

  return (
    <div className="App">
      <Header as="h2" icon="users" content="Reactivities" />
      <List>
        {acitivities.map((data) => {
          return (
            <List.Item key={data.id}>
              {data.title}
            </List.Item>
          )
        })}
      </List>
    </div>
  );
}

export default App;
