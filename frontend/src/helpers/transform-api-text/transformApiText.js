const formatText = (text) => {
    let formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Bold text
      .replace(/\*(.*?)\*/g, '<em>$1</em>')              // Italic text
      .replace(/\n/g, '<br>');                           // Line breaks
  
    return formattedText;
  };
  
  export default formatText;