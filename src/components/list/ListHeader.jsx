import {
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

const ListHeader = ({
  list,
  onRename,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between gap-2 px-3 pb-3">
      <h2 className="min-w-0 truncate font-[Space_Grotesk] text-sm font-bold text-slate-800 dark:text-slate-100">
        {list.title}
      </h2>

      <div className="group relative">
        <button
          type="button"
          className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-blue-50 hover:text-(--primary) dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
          aria-label={`${list.title} options`}
        >
          <MoreHorizontal size={17} />
        </button>

        <div className="invisible absolute right-0 top-9 z-20 w-36 rounded-xl border border-slate-200 bg-white p-1 opacity-0 shadow-xl transition group-focus-within:visible group-focus-within:opacity-100 dark:border-white/10 dark:bg-[#242b35]">
          <button
            type="button"
            onClick={() => onRename(list)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-(--primary) dark:text-slate-300 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
          >
            <Pencil size={14} />
            Rename
          </button>

          <button
            type="button"
            onClick={() => onDelete(list)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-500 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListHeader;