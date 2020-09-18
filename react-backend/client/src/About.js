import React, {Component} from "react";

export default function About(){
  return(
<div>
     
      <h1 class="text-center">This is the user's about/help screen</h1>


   <div class="container" align="center">

   
      <h5> FAQs</h5>


      <div id="accordion">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Query 1
        </button>
      </h5>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">
        solution 1
          </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          query #2
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
      <div class="card-body">
        solution 2
          </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingThree">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          query #3
        </button>
      </h5>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
      <div class="card-body">
        solution 3
          </div>
    </div>
  </div>
</div>



<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
  Report New Query
</button>

<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Add new Query</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        
      <form>

<div class="row">
   <div class="col">
    <input type="text" class="form-control" placeholder="First name"></input>
   </div>
  <div class="col">
   <input type="text" class="form-control" placeholder="Last name"></input>
   </div>
</div>

 <div class="row">

   <div class="col">
     <label for="inputEmail4">Email</label>
     <input type="email" class="form-control" id="exampleInputEmail1" area-aria-describedby="emailHelp" placeholder="1234@website.com"></input>
   </div>
  <div class="col">
     <label for="inputtel1">Phone Number</label>
     <input type="tel" class="form-control" id="exampleInputNumber1" placeholder="123456789"></input>
   </div>



   </div>

   <div class="form-group">
    <label for="query area">Question space</label>
    <textarea class="form-control" id="query" rows="5" placeholder="enter your question here"></textarea>
  </div>
</form>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Submit</button>
      </div>
    </div>
  </div>
</div>



  

      </div>

     


 </div>
    
    
  )
}