export const getQuestions = async () => {
    
    const response = await fetch('https://api.example.com/questions'); 

    if (!response.ok) throw new Error('Failed to fetch questions');

    return await response.json();

  };