import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import Button from "../components/common/Button";
import BoardCard from "../components/board/BoardCard";
import Navbar from "../components/layout/Navbar";

const BoardsScreen = ({
  user,
  boards,
  onOpenBoard,
  onCreateBoard,
  onRenameBoard,
  onDeleteBoard,
  onLogout,
}) => {
  const [search, setSearch] = useState("");

  const filteredBoards = useMemo(() => {
    return boards.filter((board) =>
      board.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [boards, search]);

  return (
    <div className="min-h-screen bg-slate-50 font-[Manrope] dark:bg-gray-950">
      <Navbar user={user} onLogout={onLogout} />

      <main className="mx-auto w-full max-w-[1400px] px-3 py-8 sm:px-4 lg:px-5">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-[Space_Grotesk] text-xs font-bold tracking-[0.18em] text-(--primary)">
              YOUR WORKSPACE
            </span>

            <h1 className="mt-2 font-[Space_Grotesk] text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Your Boards
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Manage your projects and keep your tasks organized.
            </p>
          </div>

          <Button onClick={onCreateBoard}>
            <Plus size={18} />
            Create New Board
          </Button>
        </div>

        {/* Search */}
        <div className="mb-7 flex w-full max-w-md items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 shadow-sm transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 dark:border-white/10 dark:bg-gray-800">
          <Search size={18} className="shrink-0 text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search boards..."
            className="h-11 w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
          />
        </div>

        {/* Boards */}
        {filteredBoards.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center shadow-sm dark:border-white/10 dark:bg-gray-800">
            <h2 className="font-[Space_Grotesk] font-bold text-slate-700 dark:text-slate-200">
              No boards found
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Create a new board to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBoards.map((board) => (
              <BoardCard
                key={board.id}
                board={board}
                onOpen={onOpenBoard}
                onRename={onRenameBoard}
                onDelete={onDeleteBoard}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BoardsScreen;
