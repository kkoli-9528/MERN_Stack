import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "68485ee2c407a0febb598202",
      user: "6846a636885e3c7fc911389d",
      title: "Grocery List",
      description: "Buy milk, eggs, and bread",
      tag: "shopping",
      date: "2025-06-11T08:15:30.000Z",
      __v: 0,
    },
    {
      _id: "68485ee2c407a0febb598203",
      user: "6846a636885e3c7fc911389d",
      title: "Workout Plan",
      description: "Run 5km and do strength training",
      tag: "fitness",
      date: "2025-06-12T06:30:00.000Z",
      __v: 0,
    },
    {
      _id: "68485ee2c407a0febb598204",
      user: "6846a636885e3c7fc911389d",
      title: "Project Deadline",
      description: "Finish the frontend and deploy app",
      tag: "work",
      date: "2025-06-13T17:45:15.000Z",
      __v: 0,
    },
    {
      _id: "68485ee2c407a0febb598205",
      user: "6846a636885e3c7fc911389d",
      title: "Birthday Reminder",
      description: "Don't forget to call Amit!",
      tag: "reminder",
      date: "2025-06-14T10:00:00.000Z",
      __v: 0,
    },
    {
      _id: "68485ee2c407a0febb598206",
      user: "6846a636885e3c7fc911389d",
      title: "Book to Read",
      description: "Start reading 'Atomic Habits'",
      tag: "personal",
      date: "2025-06-15T19:20:00.000Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
