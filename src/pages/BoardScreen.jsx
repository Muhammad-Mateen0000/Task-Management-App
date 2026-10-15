import { useState } from "react";

import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import BoardHeader from "../components/board/BoardHeader";
import CardModal from "../components/card/CardModal";
import ListColumn from "../components/list/ListColumn";
import TaskCard from "../components/card/TaskCard";

const MAX_LISTS = 5;

const BoardScreen = ({ board, onBack, onUpdateBoard }) => {
  const [search, setSearch] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeCard, setActiveCard] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
  );

  const renameList = (list) => {
    const title = window.prompt("Enter new list name:", list.title);

    if (!title?.trim()) return;

    onUpdateBoard({
      ...board,
      lists: board.lists.map((item) =>
        item.id === list.id
          ? {
              ...item,
              title: title.trim(),
            }
          : item,
      ),
    });
  };

  const deleteList = (list) => {
    if (!list) return;

    const confirmed = window.confirm(
      `Delete "${list.title}" and all its cards?`,
    );

    if (!confirmed) return;

    onUpdateBoard({
      ...board,
      lists: board.lists.filter((item) => item.id !== list.id),
    });
  };

  const addList = () => {
    if (board.lists.length >= MAX_LISTS) {
      window.alert("You can have a maximum of 5 lists.");
      return;
    }

    const title = window.prompt("Enter list name:");

    if (!title?.trim()) return;

    const cleanTitle = title.trim();

    const newList = {
      id: `list-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      title: cleanTitle,
      cards: [],
    };

    onUpdateBoard({
      ...board,
      lists: [...board.lists, newList],
    });
  };

  const addCard = (listId) => {
    const title = window.prompt("Enter card title:");

    if (!title?.trim()) return;

    const newCard = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      title: title.trim(),
      description: "",
      labels: [],
      dueDate: "",
      members: [],
    };

    onUpdateBoard({
      ...board,
      lists: board.lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: [...list.cards, newCard],
            }
          : list,
      ),
    });
  };

  const deleteCard = (card) => {
    const confirmed = window.confirm(`Delete "${card.title}"?`);

    if (!confirmed) return;

    onUpdateBoard({
      ...board,
      lists: board.lists.map((list) => ({
        ...list,
        cards: list.cards.filter((item) => item.id !== card.id),
      })),
    });

    setSelectedCard(null);
  };

  const saveCard = (updatedCard) => {
    onUpdateBoard({
      ...board,
      lists: board.lists.map((list) => ({
        ...list,
        cards: list.cards.map((card) =>
          card.id === updatedCard.id ? updatedCard : card,
        ),
      })),
    });

    setSelectedCard(updatedCard);
  };

  const findCard = (cardId) => {
    for (const list of board.lists) {
      const card = list.cards.find((item) => item.id === cardId);

      if (card) {
        return {
          card,
          listId: list.id,
        };
      }
    }

    return null;
  };

  const handleDragStart = ({ active }) => {
    const result = findCard(active.id);

    if (result) {
      setActiveCard(result.card);
    }
  };

  const handleDragCancel = () => {
    setActiveCard(null);
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveCard(null);

    if (!over || active.id === over.id) {
      return;
    }

    const activeResult = findCard(active.id);

    if (!activeResult) return;

    const overResult = findCard(over.id);

    let targetListId = overResult?.listId;

    if (!targetListId) {
      targetListId = over.data.current?.listId;
    }

    if (!targetListId) return;

    const sourceListId = activeResult.listId;

    // Same list reorder
    if (sourceListId === targetListId) {
      const list = board.lists.find((item) => item.id === sourceListId);

      if (!list) return;

      const oldIndex = list.cards.findIndex((card) => card.id === active.id);

      const newIndex = overResult
        ? list.cards.findIndex((card) => card.id === over.id)
        : list.cards.length - 1;

      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
        return;
      }

      const updatedCards = arrayMove(list.cards, oldIndex, newIndex);

      onUpdateBoard({
        ...board,
        lists: board.lists.map((item) =>
          item.id === sourceListId
            ? {
                ...item,
                cards: updatedCards,
              }
            : item,
        ),
      });

      return;
    }

    // Move card between lists
    const sourceList = board.lists.find((list) => list.id === sourceListId);

    const targetList = board.lists.find((list) => list.id === targetListId);

    if (!sourceList || !targetList) return;

    const movingCard = sourceList.cards.find((card) => card.id === active.id);

    if (!movingCard) return;

    const newSourceCards = sourceList.cards.filter(
      (card) => card.id !== active.id,
    );

    const newTargetCards = [...targetList.cards];

    const targetIndex = overResult
      ? newTargetCards.findIndex((card) => card.id === over.id)
      : -1;

    if (targetIndex === -1) {
      newTargetCards.push(movingCard);
    } else {
      newTargetCards.splice(targetIndex, 0, movingCard);
    }

    onUpdateBoard({
      ...board,
      lists: board.lists.map((list) => {
        if (list.id === sourceListId) {
          return {
            ...list,
            cards: newSourceCards,
          };
        }

        if (list.id === targetListId) {
          return {
            ...list,
            cards: newTargetCards,
          };
        }

        return list;
      }),
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50 font-[Inter] dark:bg-gray-950">
      <BoardHeader
        board={board}
        onBack={onBack}
        search={search}
        setSearch={setSearch}
        onAddList={addList}
      />

      <main className="flex-1 overflow-hidden">
        <div className="mx-auto h-full w-full max-w-[1400px] px-3 py-4 sm:px-4 lg:px-5">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragCancel={handleDragCancel}
            onDragEnd={handleDragEnd}
          >
            <div className="flex h-full min-h-[calc(100vh-120px)] gap-2.5 overflow-x-auto pb-2 lg:gap-3">
              {board.lists.slice(0, MAX_LISTS).map((list) => (
                <div
                  key={list.id}
                  className="h-full min-w-[280px] flex-1 lg:min-w-[300px]"
                >
                  <ListColumn
                    list={list}
                    onRenameList={renameList}
                    onDeleteList={deleteList}
                    onAddCard={addCard}
                    onOpenCard={setSelectedCard}
                    onDeleteCard={deleteCard}
                    search={search}
                  />
                </div>
              ))}
            </div>

            <DragOverlay>
              {activeCard ? (
                <TaskCard
                  card={activeCard}
                  onOpen={() => {}}
                  onDelete={() => {}}
                  isOverlay
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </main>

      <CardModal
        card={selectedCard}
        isOpen={Boolean(selectedCard)}
        onClose={() => setSelectedCard(null)}
        onSave={saveCard}
        onDelete={deleteCard}
      />
    </div>
  );
};

export default BoardScreen;
