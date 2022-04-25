import React from "react";
import "../App.css";

const Header = () => {
  return (
    <div>
      <br />
      <img
        alt="lanclogo"
        src="https://www.legalaidnc.org/sites/default/files/2020-07/lanc-logo-ogp_0.png"
        className="App-logo1"
      />
      <br />
      <br />

      <h1>Medical-Legal Partnership</h1>
      <h2>Referral Assessment Tool</h2>
      <br />
      <p>
        This tool will help you understand when to make a referral, and explain
        LANC MLP can do to assist your patients.
      </p>
      <p>
        It will also provide other resources to assist you and your patients.
      </p>
      <p>
        At the completion of the assessment, all results will be listed and
        exportable.
      </p>
      <p>
        Have thoughts about this tool? Please consider sharing your feedback
        with us{" "}
        <b>
          <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=0TWofYd6lUCJz3d-0I9d--BEFY5RmV1NlHbvq69LxF5UM0lGUVFVSVRGWUpGSFFJRTM0VkQ5WjY0MS4u">
            here.
          </a>
        </b>
      </p>
    </div>
  );
};

export default Header;
