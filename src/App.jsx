import { useEffect, useState } from "react";
import { initialBoards } from "./data/initialData";
import StartScreen from "./pages/StartScreen";
import BoardsScreen from "./pages/BoardsScreen";
import BoardScreen from "./pages/BoardScreen";

const getLocalData = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);

    if (!saved) {
      return fallback;
    }

    const parsed = JSON.parse(saved);

    return parsed ?? fallback;
  } catch {
    return fallback;
  }
};

const createId = (prefix) =>
  `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;

const createList = (id, title) => ({
  id,
  title,
  cards: [],
});

const App = () => {
  const [user, setUser] = useState(() =>
    getLocalData("task-user", null),
  );

  const [boards, setBoards] = useState(() =>
    getLocalData("task-boards", initialBoards),
  );

  const [activeBoardId, setActiveBoardId] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "task-user",
        JSON.stringify(user),
      );
    } else {
      localStorage.removeItem("task-user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(
      "task-boards",
      JSON.stringify(boards),
    );
  }, [boards]);

  const activeBoard = boards.find(
    (board) => board.id === activeBoardId,
  );

  const handleStart = (userData) => {
    if (!userData?.name?.trim()) {
      return;
    }

    setUser({
      name: userData.name.trim(),
      avatar: userData.avatar || "",
    });
  };

  const handleLogout = () => {
    setUser(null);
    setActiveBoardId(null);
  };

  const handleCreateBoard = () => {
    const title = window.prompt("Enter board name:");

    if (!title?.trim()) {
      return;
    }

    const cleanTitle = title.trim();
    const timestamp = Date.now();

    const newBoard = {
      id: createId("board"),
      title: cleanTitle,
      workspace: "IT Beam Solutions",
      lists: [
        createList(`${timestamp}-todo`, "To Do"),
        createList(`${timestamp}-progress`, "In Progress"),
        createList(`${timestamp}-pending`, "Pending"),
        createList(`${timestamp}-done`, "Done"),
      ],
    };

    setBoards((currentBoards) => [
      ...currentBoards,
      newBoard,
    ]);
  };

  const handleRenameBoard = (board) => {
    if (!board) {
      return;
    }

    const title = window.prompt(
      "Enter new board name:",
      board.title,
    );

    if (!title?.trim()) {
      return;
    }

    const cleanTitle = title.trim();

    setBoards((currentBoards) =>
      currentBoards.map((item) =>
        item.id === board.id
          ? {
              ...item,
              title: cleanTitle,
            }
          : item,
      ),
    );
  };

  const handleDeleteBoard = (board) => {
    if (!board) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${board.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    setBoards((currentBoards) =>
      currentBoards.filter(
        (item) => item.id !== board.id,
      ),
    );

    if (activeBoardId === board.id) {
      setActiveBoardId(null);
    }
  };

  const handleUpdateBoard = (updatedBoard) => {
    if (!updatedBoard?.id) {
      return;
    }

    setBoards((currentBoards) =>
      currentBoards.map((board) =>
        board.id === updatedBoard.id
          ? updatedBoard
          : board,
      ),
    );
  };

  if (!user) {
    return <StartScreen onStart={handleStart} />;
  }

  if (activeBoard) {
    return (
      <BoardScreen
        board={activeBoard}
        onBack={() => setActiveBoardId(null)}
        onUpdateBoard={handleUpdateBoard}
      />
    );
  }

  return (
    <BoardsScreen
      user={user}
      boards={boards}
      onOpenBoard={setActiveBoardId}
      onCreateBoard={handleCreateBoard}
      onRenameBoard={handleRenameBoard}
      onDeleteBoard={handleDeleteBoard}
      onLogout={handleLogout}
    />
  );
};

export default App;