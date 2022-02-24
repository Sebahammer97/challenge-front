import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Summary: Welcome to the user and shows some options that goes to the tasks table
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h2>Welcome to the TO-DO Manager:</h2>
      <div className="home-options">
        <div className="home-option">
          <h3>Do you want to create awesome to-do's?</h3>
          <Button variant="contained" onClick={() => navigate("/tasks")}>
            Create Them
          </Button>
        </div>
        <div className="home-option">
          <h3>Do you want to see your to-do list?</h3>
          <Button variant="contained" onClick={() => navigate("/tasks")}>
            See the list
          </Button>
        </div>
        <div className="home-option">
          <h3>Do you want to complete some to-do's?</h3>
          <Button variant="contained" onClick={() => navigate("/tasks")}>
            Complete Them
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
