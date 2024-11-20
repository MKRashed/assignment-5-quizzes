
import useAxios from "../../hooks/useAxios";

import axios from "axios";

export const getQuestions = async ( ) => {

    const { api } = useAxios();
    
    const response = await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/287e6049-9e59-49ea-bb41-9a0387dce648`); 

    if (!response.ok) throw new Error('Failed to fetch questions');

    return await response.json();

  };