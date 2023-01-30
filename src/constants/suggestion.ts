export function renderSuggestion(component) {
  return () => {
    const { mentionConfig } = component;

    return {
      onStart: props => {
        mentionConfig.show = true;
        mentionConfig.items = props.items;
        mentionConfig.command = props.command;
        mentionConfig.selected = 0;

        const { x, y } = props.clientRect();
        mentionConfig.x = x;
        mentionConfig.y = y + 24;
      },

      onUpdate(props) {
        mentionConfig.items = props.items;
      },
      scrollComment(id) {
        const element = document.getElementById(id);
        element.scrollIntoView({ behavior: 'smooth', block: "nearest" });
      },

      onKeyDown(props) {
        const { event } = props;

        if (event.key === "Escape") {
          mentionConfig.show = false;

          return true;
        }

        if (event.key === "ArrowUp") {
          mentionConfig.selected =
            (mentionConfig.selected + mentionConfig.items.length - 1) %
            mentionConfig.items.length;

          const item = mentionConfig.items[mentionConfig.selected]
          setTimeout(() => {
            this.scrollComment(item.value);
          }, 200);
          return true;
        }

        if (event.key === "ArrowDown") {
          mentionConfig.selected = (mentionConfig.selected + 1) % mentionConfig.items.length;
          const item = mentionConfig.items[mentionConfig.selected]
          setTimeout(() => {
            this.scrollComment(item.value);
          }, 200);
          return true;
        }

        if (event.key === "Enter") {
          component.selectMention(mentionConfig.selected);

          return true;
        }

        return false;
      },

      onExit() {
        mentionConfig.show = false;
      },
    };
  };
}
