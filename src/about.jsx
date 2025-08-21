import React from "react";
import "./about.css";
class About extends React.Component{
    
    render(){
    return<>
    
    {/* <h1>i am about page</h1> */}
         <div className="box">
  <div className="box1">
    <h2>Store all resource information in a single place</h2>
Whether it's a book, journal, newspaper, or magazine, just scan the ISBN barcode and enter details like the title, author, language, publisher’s name, and year of publication to add the resource to a central database.
  </div>
  <div className="box1">
    <h2>Streamline membership management</h2>
Need to enroll a new member? Just fill in their name, mobile number, and email address, then upload a picture. With our powerful reporting feature, librarians can easily manage member details, keep track of borrowed books, and filter data by specifics, like due dates or the number of visits.
  </div>
  {/* <div className="box1">
   <h2>Check readers in and out with ease</h2>
Check readers in with a card swipe and their logged time is automatically added to a report. Librarians can also see which readers checked in at a specific time or the entire history of an individual member's visits using our library management software.
  </div> */}
  <div className="box1">
    <h2>Process, borrow, and renew requests with one click</h2>
Members can use the app to request new books or extend due dates. Requests are recorded by type (new or renewal) in individual reports. Librarians can then approve or reject requests, based on the availability of the books.
  </div>
</div>
    </>
    }
}
export default About;