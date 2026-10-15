import { ArrowLeft, Plus, Search } from "lucide-react";

const BoardHeader = ({ board, onBack, search, setSearch, onAddList }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-blue-500/20 bg-[var(--primary)] text-white shadow-sm">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center gap-3 px-3 sm:px-4 lg:px-5">
        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 transition hover:bg-white/20"
          aria-label="Back to boards"
        >
          <ArrowLeft size={19} />
        </button>

        {/* Board Info */}
        <div className="min-w-0">
          <p className="truncate font-[Space_Grotesk] text-base font-bold tracking-tight sm:text-lg">
            {board.title}
          </p>

          <p className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-white/60 sm:block">
            {board.workspace}
          </p>
        </div>

        <div className="flex-1" />

        {/* Search */}
        <div className="flex h-10 w-full max-w-xs items-center gap-2 rounded-xl bg-white/10 px-3 transition focus-within:bg-white/15">
          <Search size={17} className="shrink-0 text-white/70" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search cards..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/50"
          />
        </div>

        {/* Add List */}
        <button
          type="button"
          onClick={onAddList}
          className="flex h-10 shrink-0 items-center gap-2 rounded-xl bg-white/10 px-3 text-sm font-semibold transition hover:bg-white/20"
          title="Add list"
        >
          <Plus size={17} />
          <span className="hidden sm:inline">Add List</span>
        </button>
      </div>
    </header>
  );
};

export default BoardHeader;
