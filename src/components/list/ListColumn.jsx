import { Plus } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ListHeader from "./ListHeader";
import TaskCard from "../card/TaskCard";

const ListColumn = ({
  list,
  onRenameList,
  onDeleteList,
  onAddCard,
  onOpenCard,
  onDeleteCard,
  search,
}) => {
  const { setNodeRef } = useDroppable({
    id: list.id,
    data: {
      type: "list",
      listId: list.id,
    },
  });

  const filteredCards = list.cards.filter((card) =>
    card.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm dark:border-white/10 dark:bg-[#211f27]">
      {/* List Header */}
      <div className="shrink-0 pt-3">
        <ListHeader
          list={list}
          onRename={onRenameList}
          onDelete={onDeleteList}
        />
      </div>

      {/* Cards */}
      <div
        ref={setNodeRef}
        className="min-h-0 flex-1 overflow-y-auto px-2.5 py-1"
      >
        <SortableContext
          items={filteredCards.map((card) => card.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2.5 pb-2">
            {filteredCards.map((card) => (
              <TaskCard
                key={card.id}
                card={card}
                onOpen={onOpenCard}
                onDelete={onDeleteCard}
              />
            ))}

            {filteredCards.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 px-3 py-8 text-center dark:border-white/10">
                <p className="font-[Space_Grotesk] text-xs font-medium text-slate-400">
                  {search ? "No matching cards" : "No cards yet"}
                </p>
              </div>
            )}
          </div>
        </SortableContext>
      </div>

      {/* Add Card */}
      <div className="shrink-0 p-2.5 pt-1">
        <button
          type="button"
          onClick={() => onAddCard(list.id)}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white/70 font-[Space_Grotesk] text-xs font-bold text-slate-500 transition hover:border-(--primary) hover:bg-blue-50 hover:text-(--primary) dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
        >
          <Plus size={16} />
          Add Card
        </button>
      </div>
    </section>
  );
};

export default ListColumn;
