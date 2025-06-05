import axios from 'axios';
import fs from 'fs';
import path from 'path';

/**
 * Fetches the list of notes from the HackMD API.
 * @param {string} apiToken - The HackMD API token.
 * @returns {Promise<Array>} - A promise that resolves to an array of notes, or an empty array in case of an error.
 */
export async function getNotes(apiToken) {
  try {
    const response = await axios.get('https://api.hackmd.io/v1/notes', {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching notes from HackMD API:', error.message);
    if (error.response) {
      console.error('API Response Status:', error.response.status);
      console.error('API Response Data:', error.response.data);
    }
    return [];
  }
}

/**
 * Downloads the content of a specific note from the HackMD API.
 * @param {string} noteId - The ID of the note to download.
 * @param {string} apiToken - The HackMD API token.
 * @returns {Promise<string|null>} - A promise that resolves to the note content (markdown), or null in case of an error.
 */
export async function downloadNoteContent(noteId, apiToken) {
  try {
    const response = await axios.get(`https://api.hackmd.io/v1/notes/${noteId}`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    return response.data.content; // Assuming the content is in response.data.content
  } catch (error) {
    console.error(`Error fetching content for note ${noteId}:`, error.message);
    if (error.response) {
      console.error('API Response Status:', error.response.status);
      console.error('API Response Data:', error.response.data);
    }
    return null;
  }
}

/**
 * Saves note content to a file.
 * @param {string} noteTitle - The title of the note.
 * @param {string} noteContent - The content of the note (markdown).
 */
export async function saveNoteToFile(noteTitle, noteContent) {
  const outputDir = './exported_notes/';

  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Sanitize title: replace non-alphanumeric characters (except spaces, hyphens) with underscore
    // and remove any remaining characters that are problematic for filenames.
    const sanitizedTitle = noteTitle.replace(/[^\w\s-]/g, '_').replace(/[\s\/\\:]/g, '_');
    const filePath = path.join(outputDir, `${sanitizedTitle}.md`);

    fs.writeFileSync(filePath, noteContent);
    console.log(`Successfully saved note to ${filePath}`);
  } catch (error) {
    console.error(`Error saving note "${noteTitle}" to file:`, error.message);
  }
}
