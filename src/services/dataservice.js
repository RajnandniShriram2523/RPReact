import axios from "axios";

class AddData {
  saveCategory(addcategory) {
    let promise = axios.post("http://localhost:4000/addcategory", addcategory);
    return promise;
  }
  savebook(addbook) {
    let promise = axios.post("http://localhost:4000/addbook", addbook);
    return promise;
  }
  savestudent(addstudent) {
    let promise = axios.post("http://localhost:4000/adduser", addstudent);
    return promise;
  }
  saveviewCategory(page = 1, limit = 10) {
    return axios.get(`http://localhost:4000/viewcategory?page=${page}&limit=${limit}`);
  }
  saveviewBook(page = 1, limit = 10) {
    return axios.get(`http://localhost:4000/viewallbooks?page=${page}&limit=${limit}`);
  }
  saveviewStudent(page = 1, limit = 6) {
    return axios.get(`http://localhost:4000/viewstudent?page=${page}&limit=${limit}`);
  }

  savedeletecategory(id) {
    return axios.get(`http://localhost:4000/deletecategory/${id}`);
  }
  savedeletebook(id, page = 1) {
    return axios.get(`http://localhost:4000/deletebooks/${id}?page=${page}`);
  }
  savedeletestudent(id, page = 1) {
    return axios.get(`http://localhost:4000/deletestudent/${id}?page=${page}`);
  }
  saveSearchCategory(category_name, page = 1, limit = 10) {
    return axios.get(`http://localhost:4000/categories/search`, { params: { category_name, page, limit } });
  }
  searchBookByName(book_title, page = 1, limit = 6) {
    return axios.get(`http://localhost:4000/searchbook`, { params: { book_title, page, limit }, });
  }
  searchStudent = (search = "", page = 1, limit = 5) => {
    return axios.get(`http://localhost:4000/searchstudent`, { params: { search, page, limit }, });
  };


saveIssuedBook(addissuedbook){
        let promise=axios.post("http://localhost:4000/addissuedbook",addissuedbook);
        return promise;
    }
// getAllStudents() {
//   return axios.get(`http://localhost:4000/viewstudent?page=1&limit=1000`);
// }

getIssuedBooks(page=1,limit=6) {
    return axios.get(`http://localhost:4000/viewissueallbooks?page=${page}&limit=${limit}`);
  }

  getOnlyIssuedBooks(page = 1, limit = 3) {
  return axios.get(`http://localhost:4000/viewissueallbooksissued?page=${page}&limit=${limit}&status=issued`);
}
 getReturnedBooks(page = 1, limit = 3) {
  return axios.get(`http://localhost:4000/viewissueallbooksreturned?page=${page}&limit=${limit}&status=returned`);
}
 getIssuedBooksByStudent(student_id,page = 1, limit = 3) {
  return axios.get(`http://localhost:4000/viewissuedbooksByUser?student_id=${student_id}&page=${page}&limit=${limit}`);
}

getstdBooksDataByEmail(student_email,page = 1, limit = 2) {
  return axios.get(`http://localhost:4000/viewissuedbooksByuseremail?student_email=${student_email}&page=${page}&limit=${limit}`);
}



}
export default new AddData();



