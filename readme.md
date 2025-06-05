# HackMD Note Downloader

## Description
This command-line tool downloads all your notes from HackMD to your local machine. Each note is saved as a separate Markdown (`.md`) file.

## Prerequisites
- **Node.js:** v18 or later is recommended (due to yargs dependencies). You can download it from [nodejs.org](https://nodejs.org/).
- **HackMD API Token:** You need an API token from HackMD to use this tool. You can generate an API token from your HackMD settings page under the "API" section.

## Installation/Setup
This tool is designed to be run directly using `npx`, which is included with Node.js (npm v5.2+). No separate installation step is required.

To run the tool, use the following command in your terminal, replacing `YOUR_API_TOKEN` with your actual HackMD API token:
```bash
npx hackmd-downloader -t YOUR_API_TOKEN
```

### Running directly from GitHub

You can also run this tool directly from its GitHub repository without cloning or installing it locally:

`npx github:ropin13/hackmd-export -t YOUR_API_TOKEN`

Replace `YOUR_API_TOKEN` with your actual HackMD API token. The tool will be downloaded and executed by `npx`.

## Usage
Execute the script using `npx` and provide your HackMD API token using the `-t` or `--token` option:

```bash
npx hackmd-downloader --token YOUR_API_TOKEN
```
or
```bash
npx hackmd-downloader -t YOUR_API_TOKEN
```

Downloaded notes will be saved in a directory named `exported_notes/` created in the directory where you run the command.

## Project Structure
- `index.js`: The main command-line interface (CLI) script that parses arguments and orchestrates the note downloading process.
- `hackmd.js`: A module responsible for interacting with the HackMD API (fetching note lists, downloading note content) and saving notes to files.
- `package.json`: Contains project metadata, dependencies (like `axios` for HTTP requests and `yargs` for argument parsing), and defines the `hackmd-downloader` command.
- `exported_notes/`: This directory is automatically created when you run the script and is where all your downloaded HackMD notes will be stored as Markdown files.
- `.gitignore`: Specifies intentionally untracked files that Git should ignore (e.g., `node_modules/`).

## Error Handling
The script includes basic error handling for:
- API request failures (e.g., invalid token, network issues).
- File system operations (e.g., issues creating directories or writing files).
Messages will be logged to the console if errors occur.

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on the project repository.

## License
This project is released under the ISC License (as specified in `package.json`).
