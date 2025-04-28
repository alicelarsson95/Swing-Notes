export function validateNotes(title, text) {
    if (!title || !text) {
      return "Title and text are required";
    }
  
    if (title.length > 50) {
      return "Title must be 50 characters or less";
    }
  
    if (text.length > 300) {
      return "Text must be 300 characters or less";
    }
  
    return null; 
  }

  export function validateUpdateNote(id, title, text) {
    if (!id || !title || !text) {
      return "Id, title, and text are required";
    }
    return null;
  }
  
  