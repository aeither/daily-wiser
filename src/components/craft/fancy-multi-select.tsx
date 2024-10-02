"use client";

import { X } from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

type Framework = Record<"value" | "label", string>;

const FRAMEWORKS = [
  { label: "Group Chat", value: "group_chat" },
  { label: "Magical", value: "magical" },
  { label: "Pokemon", value: "pokemon" },
  { label: "Monster", value: "monster" },
  { label: "Assistant", value: "assistant" },
  { label: "Sci-Fi", value: "sci_fi" },
  { label: "Game", value: "game" },
  { label: "Action", value: "action" },
  { label: "Monster Girl", value: "monster_girl" },
  { label: "Non-English", value: "non_english" },
  { label: "Omegaverse", value: "omegaverse" },
  { label: "Anime", value: "anime" },
  { label: "Alien", value: "alien" },
  { label: "Demon", value: "demon" },
  { label: "Robot", value: "robot" },
  { label: "Tomboy", value: "tomboy" },
  { label: "Politics", value: "politics" },
  { label: "Horror", value: "horror" },
  { label: "Philosophy", value: "philosophy" },
  { label: "Mafia", value: "mafia" },
  { label: "Comedy", value: "comedy" },
  { label: "Vampire", value: "vampire" },
  { label: "Giant", value: "giant" },
  { label: "RPG", value: "rpg" },
  { label: "Religion", value: "religion" },
  { label: "Angel", value: "angel" },
  { label: "Cute", value: "cute" },
  { label: "OC", value: "oc" },
  { label: "Fictional", value: "fictional" },
  { label: "Movie", value: "movie" },
  { label: "Historical", value: "historical" },
  { label: "VTuber", value: "vtuber" },
  { label: "Dominant", value: "dominant" },
  { label: "Books", value: "books" },
  { label: "Fairytale", value: "fairytale" },
  { label: "Mythology", value: "mythology" },
  { label: "Cartoon", value: "cartoon" },
  { label: "Caring", value: "caring" },
  { label: "Friend", value: "friend" },
  { label: "Feral", value: "feral" },
  { label: "Royalty", value: "royalty" },
  { label: "Submissive", value: "submissive" },
  { label: "Detective", value: "detective" },
  { label: "Yandere", value: "yandere" },
  { label: "Story", value: "story" },
  { label: "Hero", value: "hero" },
  { label: "Villain", value: "villain" },
  { label: "Tsundere", value: "tsundere" },
  { label: "Fantasy", value: "fantasy" },
] satisfies Framework[];

export function FancyMultiSelect({
  selected,
  onSelectionChange,
}: {
  selected: Framework[];
  onSelectionChange: (frameworks: Framework[]) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback(
    (framework: Framework) => {
      onSelectionChange(selected.filter((s) => s.value !== framework.value));
    },
    [onSelectionChange, selected]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            onSelectionChange(selected.slice(0, -1));
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [onSelectionChange, selected]
  );

  const selectables = FRAMEWORKS.filter(
    (framework) => !selected.some((s) => s.value === framework.value)
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((framework) => {
            return (
              <Badge key={framework.value} variant="secondary">
                {framework.label}
                <button
                  type="button"
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(framework);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(framework)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select..."
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((framework) => {
                  return (
                    <CommandItem
                      key={framework.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(value) => {
                        setInputValue("");
                        onSelectionChange([...selected, framework]);
                      }}
                      className={"cursor-pointer"}
                    >
                      {framework.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
