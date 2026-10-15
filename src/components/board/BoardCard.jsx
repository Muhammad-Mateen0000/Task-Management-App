import {
  LayoutList,
  MoreVertical,
  Pencil,
  Trash2,
  ArrowUpRight,
} from "lucide-react";

const BoardCard = ({ board, onOpen, onRename, onDelete }) => {
  const totalCards = board.lists.reduce(
    (total, list) => total + list.cards.length,
    0,
  );

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10 dark:border-white/10 dark:bg-gray-800 dark:hover:border-blue-500/30">
      {/* Board Cover */}
      <button
        type="button"
        onClick={() => onOpen(board.id)}
        className="block w-full text-left"
      >
        <div className="relative h-36 overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500">
          {/* Decorative Shapes */}
          <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/10" />

          <div className="absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-white/10" />

          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" />

          {/* Open Icon */}
          <div className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-xl bg-white/15 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight size={17} />
          </div>

          {/* Board Information */}
          <div className="absolute inset-x-5 bottom-5">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
              {board.workspace}
            </p>

            <h3 className="font-[Space_Grotesk] text-xl font-bold tracking-tight text-white">
              {board.title}
            </h3>
          </div>
        </div>

        {/* Board Details */}
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <LayoutList size={17} />
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Board Content
                </p>

                <p className="mt-0.5 text-sm font-bold text-slate-700 dark:text-slate-200">
                  {board.lists.length} lists
                  <span className="mx-1.5 text-slate-300 dark:text-slate-600">
                    ·
                  </span>
                  {totalCards} cards
                </p>
              </div>
            </div>

            <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-50 text-slate-400 transition group-hover:bg-blue-50 group-hover:text-blue-600 dark:bg-white/5 dark:text-slate-500 dark:group-hover:bg-blue-500/10 dark:group-hover:text-blue-400">
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>
      </button>

      {/* Board Actions */}
      <div className="absolute right-14 top-4 flex gap-1 opacity-0 transition-all duration-200 group-hover:opacity-100">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onRename(board);
          }}
          className="grid h-8 w-8 place-items-center rounded-lg bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25"
          title="Rename board"
          aria-label="Rename board"
        >
          <Pencil size={14} />
        </button>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onDelete(board);
          }}
          className="grid h-8 w-8 place-items-center rounded-lg bg-red-500/80 text-white backdrop-blur-md transition hover:bg-red-500"
          title="Delete board"
          aria-label="Delete board"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Options Indicator */}
      <div className="absolute right-3 top-3">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-black/10 text-white backdrop-blur-sm">
          <MoreVertical size={16} />
        </div>
      </div>
    </article>
  );
};

export default BoardCard;
