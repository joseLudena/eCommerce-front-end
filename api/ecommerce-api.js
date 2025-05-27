import axios from "axios";
const URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts() {
   try {
      const response = await axios.get(`${URL}/product/all`);
      if (!response) throw new Error("Not find any products");
      return response.data;
   } catch (error) {
      console.log("Error", error);
      return error;
   }
}