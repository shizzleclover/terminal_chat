import type { Message } from '../types/terminal';

export const getManPage = (command: string): string => {
  const manPages: { [key: string]: string } = {
    'help': `HELP(1)                    Matrix Terminal Manual                    HELP(1)

NAME
       help - Display available commands and their descriptions

SYNOPSIS
       help

DESCRIPTION
       The help command displays a list of all available commands in the Matrix
       Terminal Chat System along with brief descriptions of their functionality.

EXAMPLES
       help
              Display the command list

SEE ALSO
       man(1), clear(1), whoami(1)`,

    'man': `MAN(1)                     Matrix Terminal Manual                     MAN(1)

NAME
       man - Display manual pages for commands

SYNOPSIS
       man [command]

DESCRIPTION
       The man command displays detailed manual pages for system commands.
       Each manual page provides comprehensive information about command usage,
       options, examples, and related commands.

EXAMPLES
       man help
              Display manual page for the help command
       man clear
              Display manual page for the clear command

SEE ALSO
       help(1)`,

    'clear': `CLEAR(1)                   Matrix Terminal Manual                   CLEAR(1)

NAME
       clear - Clear the terminal screen

SYNOPSIS
       clear

DESCRIPTION
       The clear command removes all messages from the terminal display,
       providing a clean slate for new interactions.

EXAMPLES
       clear
              Clear all terminal content

SEE ALSO
       help(1), man(1)`,

    'whoami': `WHOAMI(1)                  Matrix Terminal Manual                  WHOAMI(1)

NAME
       whoami - Display current user information

SYNOPSIS
       whoami

DESCRIPTION
       The whoami command displays information about the currently authenticated
       user, including username, system details, and access level.

EXAMPLES
       whoami
              Display current user information

SEE ALSO
       help(1), man(1)`,

    'date': `DATE(1)                    Matrix Terminal Manual                    DATE(1)

NAME
       date - Display current date and time

SYNOPSIS
       date

DESCRIPTION
       The date command displays the current system date and time in a
       human-readable format.

EXAMPLES
       date
              Display current date and time

SEE ALSO
       help(1), man(1)`,

    'theme': `THEME(1)                   Matrix Terminal Manual                   THEME(1)

NAME
       theme - Change terminal color theme

SYNOPSIS
       theme

DESCRIPTION
       The theme command cycles through available color themes for the terminal
       interface. Available themes include Matrix (green), Cyber (cyan),
       Retro (amber), and Neon (pink).

EXAMPLES
       theme
              Cycle to the next color theme

SEE ALSO
       help(1), man(1), align(1)`,

    'align': `ALIGN(1)                   Matrix Terminal Manual                   ALIGN(1)

NAME
       align - Change text alignment

SYNOPSIS
       align

DESCRIPTION
       The align command cycles through text alignment options for the terminal
       content. Available alignments are left, center, and right.

EXAMPLES
       align
              Cycle to the next alignment option

SEE ALSO
       help(1), man(1), theme(1)`,

    'exit': `EXIT(1)                    Matrix Terminal Manual                    EXIT(1)

NAME
       exit - Logout from the system

SYNOPSIS
       exit

DESCRIPTION
       The exit command logs out the current user and returns to the login
       prompt. All session data is cleared.

EXAMPLES
       exit
              Logout and return to login screen

SEE ALSO
       help(1), man(1)`,

    'theme list': `THEME-LIST(1)              Matrix Terminal Manual              THEME-LIST(1)

NAME
       theme list - List all available color themes

SYNOPSIS
       theme list

DESCRIPTION
       The theme list command displays all available color themes including
       built-in themes (matrix, cyber, retro, neon) and any custom themes
       created by the user.

EXAMPLES
       theme list
              Display all available themes

SEE ALSO
       theme(1), theme create(1), theme set(1)`,

    'theme create': `THEME-CREATE(1)            Matrix Terminal Manual            THEME-CREATE(1)

NAME
       theme create - Create a custom color theme

SYNOPSIS
       theme create [name]

DESCRIPTION
       The theme create command creates a new custom color theme with the
       specified name. The theme will be saved to local storage and can be
       applied using the theme set command.

EXAMPLES
       theme create mytheme
              Create a custom theme named "mytheme"

SEE ALSO
       theme(1), theme list(1), theme set(1)`,

    'theme set': `THEME-SET(1)                Matrix Terminal Manual                THEME-SET(1)

NAME
       theme set - Apply a custom color theme

SYNOPSIS
       theme set [name]

DESCRIPTION
       The theme set command applies a previously created custom theme.
       The theme must exist in the user's custom themes list.

EXAMPLES
       theme set mytheme
              Apply the custom theme named "mytheme"

SEE ALSO
       theme(1), theme list(1), theme create(1)`
  };

  if (!command || !manPages[command]) {
    return `No manual entry for "${command || 'undefined'}"
Available manual pages: ${Object.keys(manPages).join(', ')}`;
  }

  return manPages[command];
};

export const createSystemMessage = (content: string): Message => ({
  id: Date.now().toString(),
  type: 'system',
  content,
  timestamp: new Date()
});

export const createUserMessage = (content: string, prompt: string): Message => ({
  id: Date.now().toString(),
  type: 'user',
  content: `${prompt}${content}`,
  timestamp: new Date()
});

export const getHelpMessage = (): string => `Available commands:
• help - Show this help message
• man [command] - Show detailed manual for a command
• clear - Clear terminal
• whoami - Show current user
• date - Show current date/time
• theme - Change color theme
• theme list - List all available themes
• theme create [name] - Create a custom theme
• theme set [name] - Apply a custom theme
• align - Change text alignment
• exit - Logout from system

Or simply type any message to chat with the AI.`;
