#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { getNotes, downloadNoteContent, saveNoteToFile } from './hackmd.js';

async function main() {
  const argv = yargs(hideBin(process.argv))
    .usage('Usage: hackmd-downloader -t <apiToken>')
    .option('t', {
      alias: 'token',
      describe: 'HackMD API Token',
      type: 'string',
      demandOption: true,
    })
    .help()
    .alias('help', 'h')
    .argv;

  const apiToken = argv.token;

  if (!apiToken) {
    console.error('API token is required. Please provide it using -t or --token option.');
    process.exit(1);
  }

  console.log('Fetching notes from HackMD...');
  const notes = await getNotes(apiToken);

  if (!notes || notes.length === 0) {
    console.log('No notes found or failed to fetch notes. Please check your API token and permissions.');
    return;
  }

  console.log(`Found ${notes.length} notes. Starting download process...`);

  for (const note of notes) {
    // Assuming note objects have 'id' and 'title' properties.
    // This might need adjustment based on the actual API response structure.
    if (!note.id || typeof note.title === 'undefined') {
      console.warn('Skipping a note due to missing id or title:', note);
      continue;
    }

    console.log(`Downloading note: "${note.title}" (ID: ${note.id})`);
    const content = await downloadNoteContent(note.id, apiToken);

    if (content !== null) {
      await saveNoteToFile(note.title, content);
    } else {
      console.log(`Skipping save for note "${note.title}" due to download error.`);
    }
  }

  console.log('Finished downloading all notes.');
}

main().catch(error => {
  console.error('An unexpected error occurred:', error.message);
  process.exit(1);
});
