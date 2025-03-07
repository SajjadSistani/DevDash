import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { translations } from "../translations";

const Todolist = ({ theme, languageId }) => {
  const [taskCount, setTaskCount] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const t = translations[languageId];

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
    setTaskCount(savedTasks.length);
  }, []);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleAddTask = () => {
    const newTask = { id: uuidv4(), description: taskDescription };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    setTaskCount(newTasks.length);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTaskDescription("");
    setDialogOpen(false);
  };

  const handleRemoveTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    setTaskCount(newTasks.length);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  return (
    <>
      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t.taskDescription}
            fullWidth
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            sx={{ fontFamily: "Vazir, sans-serif" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t.cancel}</Button>
          <Button onClick={handleAddTask} autoFocus>
            {t.addTask}
          </Button>
        </DialogActions>
      </Dialog>
      <div className="rounded-md flex flex-col items-center w-full shadow-[0px_0px_8px_3px_rgba(0,_0,_0,_0.1)]">
        <h3 className="border-b-gray-400 border-b-2 pb-1 w-full text-center font-['Vazir']">
          {t.tasks}
        </h3>
        <div className="flex items-center justify-start flex-wrap w-full h-full p-5">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`relative shadow-md cursor-pointer ${
                theme === "light" ? "bg-gray-300/80" : "bg-gray-700"
              } bg-opacity-90 backdrop-filter text-center flex flex-col justify-between items-center m-2 backdrop-blur-lg rounded-md w-35 h-50`}
            >
              <p className="w-full flex-grow break-words text-center pt-5 pb-2 px-2 mt-2 font-['Vazir']">
                {task.description}
              </p>
              <div
                className="absolute top-0 inset-x-0 border-b-1 cursor-pointer"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </div>
          ))}
          <div
            onClick={handleClickOpen}
            className={`${
              taskCount >= 8 ? "hidden" : ""
            } shadow-md cursor-pointer ${
              theme === "light" ? "bg-gray-300/80" : "bg-gray-700"
            } bg-opacity-90 backdrop-filter text-center flex items-center justify-center m-2 backdrop-blur-lg rounded-md w-35 h-50`}
          >
            <p className="flex flex-col font-['Vazir']">
              <FontAwesomeIcon icon={faPlus} /> {t.addTask}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todolist;
