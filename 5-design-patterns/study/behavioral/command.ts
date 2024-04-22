abstract class Command {
    protected app: Application;
    protected editor: Editor;
    protected backup: string;
  
    constructor (app: Application, editor: Editor) {
        this.app = app;
        this.editor = editor;
    }
  
    saveBackup() {
      this.backup = this.editor.text;
    }
  
    undo() {
      this.editor.text = this.backup;
    }
  
    abstract execute();
  }

class CopyCommand extends Command {
    execute() {
      this.app.clipboard = this.editor.getSelection();
    }
  }
  class PasteCommand extends Command {
    execute() {
      this.saveBackup();
      this.editor.replaceSelection(this.app.clipboard);
    }
  }
  class CommandHistory {
    private history: Command[];
  
    push(c: Command) { this.history.push(c); }
    pop(): Command { return this.history[this.history.length -1]; }
  }

  class Editor {
    text: string;
  
    getSelection() { return 'some selection'; }
    replaceSelection(clipboard) { return `some ${clipboard} selection`; }
  }


  class Application {
    clipboard: string;
    editor: Editor;
    activeEditor: Editor;
    history: CommandHistory;
  
    bindComands() {
      shortcuts.onkeypress('Ctrl+C', () => {
        return this.executeCommand(new CopyCommand(this, this.editor));
      });
      shortcuts.onkeypress('Ctrl+V', () => {
        return this.executeCommand(new PasteCommand(this, this.editor));
      });
    }
  
    executeCommand(command: Command) {
      this.history.push(command);
      command.execute();
    }
  
    undo() {
      const command = this.history.pop();
      command.undo();
    }
  }