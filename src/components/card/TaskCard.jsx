import {
  CalendarDays,
  MessageSquareText,
  Trash2,
} from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Label from "./Label";

const TaskCard = ({
  card,
  onOpen,
  onDelete,
  isOverlay = false,
}) => {
  const sortable = useSortable({
    id: card.id,
    disabled: isOverlay,
    data: {
      type: "card",
      card,
    },
  });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = sortable;

  const style = isOverlay
    ? undefined
    : {
        transform: CSS.Transform.toString(transform),
        transition,
      };

  return (
    <article
      ref={isOverlay ? undefined : setNodeRef}
      style={style}
      {...(isOverlay ? {} : attributes)}
      {...(isOverlay ? {} : listeners)}
      className={`group cursor-pointer rounded-xl border border-blue-200 bg-blue-50 p-3 shadow-md shadow-blue-500/10 transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-100/70 hover:shadow-lg hover:shadow-blue-500/15 dark:border-blue-400/20 dark:bg-[#1e293b] dark:shadow-black/20 dark:hover:border-blue-400/30 dark:hover:bg-[#24354d] dark:hover:shadow-black/30 ${
        isDragging ? "opacity-40" : ""
      } ${isOverlay ? "shadow-xl" : ""}`}
      onClick={() => onOpen(card)}
    >
      {card.labels?.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {card.labels.map((label) => (
            <Label
              key={`${card.id}-${label.name}`}
              label={label}
            />
          ))}
        </div>
      )}

      <div className="flex items-start gap-2">
        <h3 className="flex-1 text-sm font-semibold leading-5 text-slate-800 dark:text-slate-100">
          {card.title}
        </h3>

        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            onDelete(card);
          }}
          className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-slate-400 opacity-0 transition hover:bg-red-50 hover:text-red-500 group-hover:opacity-100 dark:text-slate-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          title="Delete card"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {card.description && (
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
          {card.description}
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {card.dueDate && (
          <span className="flex items-center gap-1 rounded-md bg-blue-100 px-2 py-1 text-[11px] font-medium text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <CalendarDays size={12} />
            {card.dueDate}
          </span>
        )}

        {card.description && (
          <span className="flex items-center gap-1 text-[11px] text-slate-400">
            <MessageSquareText size={13} />
          </span>
        )}

        {card.members?.length > 0 && (
          <div className="ml-auto flex -space-x-2">
            {card.members.slice(0, 3).map((member) => (
              <div
                key={`${card.id}-${member}`}
                title={member}
                className="grid h-7 w-7 place-items-center rounded-full border-2 border-blue-50 bg-[var(--primary)] text-[10px] font-bold text-white dark:border-[#1e293b]"
              >
                {member.charAt(0).toUpperCase()}
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default TaskCard;