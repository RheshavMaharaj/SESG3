import React, { Component } from "react";

import image1 from "./Assets/userplaceholder.png";

export default class User extends Component {
  render() {
    return (
      <div>
        <div class="container-fluid ">
          <h1 align="center">This is the user account screen</h1>
          <p align="center">
            Here user can view/edit their personal information and review books
            borrowed and history of brrowed books
          </p>
          <div class="row">
            <div class="col-8 bg-dark text-white">
              <img
                src={image1}
                alt="User photo"
                class="mr-5 mt-4 rounded-circle"
              ></img>

              <form>
                <div class="row">
                  <div class="col">
                    <label for="staticEmail" class="col-sm-2">
                      Email
                    </label>
                  </div>
                  <div class="col">
                    <label for="staticEmail" class="col-sm-2">
                      Email
                    </label>
                  </div>
                </div>

                <div class="row">
                  <label for="staticEmail" class="col-sm-2">
                    Email
                  </label>
                  <div class="col">
                    <label for="staticEmail" class="col-sm-2">
                      Email
                    </label>
                  </div>
                </div>
                <div class="row">
                  <label for="staticEmail" class="col-sm-2">
                    Email
                  </label>
                  <div class="col">
                    <label for="staticEmail" class="col-sm-2">
                      Email
                    </label>
                  </div>
                </div>

                <div class="row">
                  <label for="staticEmail" class="col-sm-2">
                    Email
                  </label>
                  <div class="col">
                    <label for="staticEmail" class="col-sm-2">
                      Email
                    </label>
                  </div>
                </div>
              </form>
            </div>

            <div class="col-4 bg-primary text-white">book information</div>
          </div>
        </div>
      </div>
    );
  }
}
