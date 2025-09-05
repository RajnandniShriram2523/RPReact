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






getCategoryById(id) {
  return axios.get(`http://localhost:4000/updatecategory`, { params: { category_id: id } });
}

savefinalUpdateCategory = (category_id, category_name, page = 1, limit = 5) => {
  return axios.post(`http://localhost:4000/finalupdatecategory?page=${page}&limit=${limit}`, {
    category_id,
    category_name
  })
};

getCategoryById(id) {
    return axios.get(`http://localhost:4000/category/${id}`);
  }

  // ✅ Update category by ID
updateCategory(id, data) {
    return axios.put(`http://localhost:4000/category/${id}`, data);
  }




  

getBookById(id) {
    return axios.get(`http://localhost:4000/book/${id}`);
  }

  // Update book by ID
  updateBook(id, data) {
    return axios.put(`http://localhost:4000/book/${id}`, data);
  }

  // Get all categories (for dropdown)
  getCategories() {
    return axios.get(`http://localhost:4000/categories`);
  }




  


getStudentById(id) {
    return axios.get(`http://localhost:4000/student/${id}`);
  }

  // Update student by ID
  updateStudent(id, data) {
    return axios.put(`http://localhost:4000/student/${id}`, data);
  }
















saveSearchCategory(category_name, page = 1, limit = 10) {
    return axios.get(`http://localhost:4000/categories/search`, { params: { category_name, page, limit } });
}


searchBookByName(search, page, limit) {
    return axios.get(`http://localhost:4000/searchbook`, {
      params: { book_title: search, page, limit }
    });

  } 
searchStudent(search, page = 1, limit = 6) {
    return axios.get(`http://localhost:4000/searchstudent`, {
      params: { search: search, page, limit },
    });
  }

getUserHistoryById = (student_id) => {
  console.log(student_id);
  
  return axios.get(`http://localhost:4000/myhistory/${student_id}`);
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


toggleStatus(issue_id) {
  return axios.put(`http://localhost:4000/issue-book/${issue_id}/toggle-status`);
}



searchIssuedBooksByStudentName(student_name) {
  return axios.get('http://localhost:4000/searchissuebookbystudentname?student_name=' + encodeURIComponent(student_name.trim()));
}


searchReturnedBooksByStudentName(student_name) {
  return axios.get('http://localhost:4000/returned-books/search?student_name=' + encodeURIComponent(student_name.trim()));
}

searchOnlyIssuedBooksByStudentName(student_name) {
  return axios.get('http://localhost:4000/search-only-issued-books?student_name=' + encodeURIComponent(student_name.trim()));
}







// viewUserAllBooks(page = 1, limit = 6, search = "", status = "") {
//     return axios.get("http://localhost:4000/userviewbook", {
//       params: { page, limit, search, status },
//     });
//   }

getuserIssuedBooks(studentId) {
  return axios.get(`http://localhost:4000/students/issued/${studentId}`)
    .then((res) => res.data);
}


getuserReturnedBooks(studentId) {
    return axios.get(`http://localhost:4000/students/returned/${studentId}`)
      .then((res) => res.data);
  }
}

export default new AddData();



