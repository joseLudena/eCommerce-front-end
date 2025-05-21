import axios from "axios";
const URL = "http://localhost:8000";

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