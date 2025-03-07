import axios from "axios";
interface DataxemphimProps {
  title: string,
  episode: number,
}
const Dataxemphim = async ({title,episode}: DataxemphimProps): Promise<any> => {
  console.log(episode,"episodexemfilmservices")
    try {
      const url = `${process.env.REACT_APP_API_URL}/product/${title}/${episode}`;
       console.log(title,episode,"xèmilmservices")
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  
  export {Dataxemphim}