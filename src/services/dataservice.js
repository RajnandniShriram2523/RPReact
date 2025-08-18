import axios from "axios";

class AddData {
    saveCategory(addcategory){
        let promise=axios.post("http://localhost:4000/addcategory",addcategory);
        return promise;
    }
    savebook(addbook){
        let promise=axios.post("http://localhost:4000/addbook",addbook);
        return promise;
    }
    savestudent(addstudent){
        let promise=axios.post("http://localhost:4000/adduser",addstudent);
        return promise;
    }
      saveviewCategory(page = 1, limit = 10) {
    return axios.get(`http://localhost:4000/viewcategory?page=${page}&limit=${limit}`);
  }
 saveviewBook(page = 1, limit = 10) {
    return axios.get(`http://localhost:4000/viewallbooks?page=${page}&limit=${limit}`);
  }
   saveviewStudent(page = 1, limit = 10) {
    return axios.get(`http://localhost:4000/viewstudent?page=${page}&limit=${limit}`);
  }
}
export default new AddData();



